import type { createServer, IncomingMessage, Server, ServerOptions as HttpServerOptions } from 'node:http';
import type {
  createSecureServer as createSecureHttp2Server,
  createServer as createHttp2Server,
  Http2SecureServer,
  Http2Server,
  Http2ServerRequest,
  SecureServerOptions as SecureHttp2ServerOptions,
  ServerOptions as Http2ServerOptions,
} from 'node:http2';
import type { createServer as createHttpsServer, ServerOptions as HttpsServerOptions } from 'node:https';

import type { Server as ConnectServer } from 'connect';

export type FetchCallback = (
  request: Request,
  originalReq: IncomingMessage | Http2ServerRequest,
) => Promise<unknown> | unknown;

export type NextHandlerOption = {
  fetch: FetchCallback;
};

export type ServerType = Server | Http2Server | Http2SecureServer;

type createHttpOptions = {
  serverOptions?: HttpServerOptions;
  createServer?: typeof createServer;
};

type createHttpsOptions = {
  serverOptions?: HttpsServerOptions;
  createServer?: typeof createHttpsServer;
};

type createHttp2Options = {
  serverOptions?: Http2ServerOptions;
  createServer?: typeof createHttp2Server;
};

type createSecureHttp2Options = {
  serverOptions?: SecureHttp2ServerOptions;
  createServer?: typeof createSecureHttp2Server;
};

type ServerOptions = createHttpOptions | createHttpsOptions | createHttp2Options | createSecureHttp2Options;

export type Options = {
  fetch: FetchCallback;
  port?: number;
  hostname?: string;
  connectApp?: ConnectServer;
} & ServerOptions;
