import type { ServerResponse } from 'node:http';
import type { IncomingMessage } from 'node:http';
import { createServer as createServerHTTP } from 'node:http';
import type { Http2ServerRequest, Http2ServerResponse } from 'node:http2';
import { Readable } from 'node:stream';

import type { Server as ConnectServer } from 'connect';
import connect from 'connect';
import { splitCookiesString } from 'set-cookie-parser';

import { writeReadableStreamToWritable } from './stream.ts';
import type { FetchCallback, Options, ServerType } from './types.ts';

export const createAdaptorServer = (options: Options): ServerType => {
  const fetchCallback = options.fetch;
  const connnectApp = options.connectApp;

  const requestListener = getRequestListener(fetchCallback, connnectApp);

  const createServer: any = options.createServer || createServerHTTP;

  const server: ServerType = createServer(options.serverOptions || {}, requestListener);

  return server;
};

export const serve = (options: Options): ServerType => {
  const server = createAdaptorServer(options);
  server.listen(options.port || 3000, options.hostname || '0.0.0.0');
  return server;
};

const getRequestListener = (fetchCallback: FetchCallback, connectApp?: ConnectServer) => {
  const app = connectApp || connect();

  app.use(async (incoming: IncomingMessage | Http2ServerRequest, outgoing: ServerResponse | Http2ServerResponse) => {
    const method = incoming.method || 'GET';
    const url = `http://${incoming.headers.host}${incoming.url}`;

    const headerRecord: Record<string, string> = {};
    const len = incoming.rawHeaders.length;
    for (let i = 0; i < len; i++) {
      if (i % 2 === 0) {
        const key = incoming.rawHeaders[i];
        const val = incoming.rawHeaders[i + 1];
        if (key !== void 0 && val !== void 0) {
          headerRecord[key] = val;
        }
      }
    }

    const init = {
      method: method,
      headers: headerRecord,
    } as RequestInit;

    if (!(method === 'GET' || method === 'HEAD')) {
      // lazy-consume request body
      init.body = Readable.toWeb(incoming) as ReadableStream<Uint8Array>;
      // node 18 fetch needs half duplex mode when request body is stream
      (init as any).duplex = 'half';
    }

    let res: Response;

    try {
      res = (await fetchCallback(new Request(url.toString(), init as any), incoming)) as Response;
    } catch (e: unknown) {
      res = new Response(null, { status: 500 });
      if (e instanceof Error) {
        // timeout error emits 504 timeout
        if (e.name === 'TimeoutError' || e.constructor.name === 'TimeoutError') {
          res = new Response(null, { status: 504 });
        }
      }
    }

    const contentType = res.headers.get('content-type') || '';
    // nginx buffering variant
    const buffering = res.headers.get('x-accel-buffering') || '';
    const contentEncoding = res.headers.get('content-encoding');
    const contentLength = res.headers.get('content-length');
    const transferEncoding = res.headers.get('transfer-encoding');

    const cookieVals = [];
    for (const [k, v] of res.headers) {
      if (k === 'set-cookie') {
        cookieVals.push(res.headers.get(k));
      } else {
        outgoing.setHeader(k, v);
      }
    }

    // This makes sure that when translating from fetch -> node, if multiple set-cookie values are present, they are preserved
    // in a way that node understands (as an array).
    let parsedCookieVals: string[] = [];
    if (cookieVals.length) {
      parsedCookieVals = parsedCookieVals.concat(...cookieVals.map(c => splitCookiesString(c as any)));

      parsedCookieVals = [...new Set(parsedCookieVals)];
      if (parsedCookieVals.length) {
        outgoing.setHeader('set-cookie', parsedCookieVals);
      }
    }

    outgoing.statusCode = res.status;

    if (res.body) {
      try {
        /**
         * If content-encoding is set, we assume that the response should be not decoded.
         * Else if transfer-encoding is set, we assume that the response should be streamed.
         * Else if content-length is set, we assume that the response content has been taken care of.
         * Else if x-accel-buffering is set to no, we assume that the response should be streamed.
         * Else if content-type is not application/json nor text/* but can be text/event-stream,
         * we assume that the response should be streamed.
         */
        if (
          contentEncoding ||
          transferEncoding ||
          contentLength ||
          /^no$/i.test(buffering) ||
          !/^(application\/json\b|text\/(?!event-stream\b))/i.test(contentType)
        ) {
          // await pipeline(Readable.fromWeb(res.body as NodeReadableStream), outgoing);
          await writeReadableStreamToWritable(res.body as ReadableStream, outgoing);
        } else {
          const text = await res.text();
          outgoing.setHeader('Content-Length', Buffer.byteLength(text));
          outgoing.end(text);
        }
      } catch (e: unknown) {
        const err = (e instanceof Error ? e : new Error('unknown error', { cause: e })) as Error & {
          code: string;
        };
        if (err.code === 'ERR_STREAM_PREMATURE_CLOSE') {
          console.info('The user aborted a request.');
        } else {
          console.error(e);
          outgoing.destroy(err);
        }
      }
    } else {
      outgoing.end();
    }
  });

  return app;
};
