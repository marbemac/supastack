import { CamelCasePlugin, Kysely } from 'kysely';
import { NeonDialect } from 'kysely-neon';

import type { InitClientFn, InitClientOpts, PgClient } from '../types.ts';

let client: PgClient<any>;

export const initClient: InitClientFn = <DB>({ uri, debug, reuse }: InitClientOpts): PgClient<DB> => {
  if (client && reuse) {
    return client as PgClient<DB>;
  }

  const isDev = uri.includes('localhost');

  const db = new Kysely<DB>({
    plugins: [new CamelCasePlugin()],
    log: debug ? ['query', 'error'] : ['error'],
    dialect: new NeonDialect({
      connectionString: uri,

      /**
       * When we're not working with neon cloud db (local dev, for example), use our own websocket proxy
       * See `pg-ws-proxy` service in docker-compose.yml
       */
      wsProxy: isDev ? host => `${host}:5345/v1` : undefined,
      useSecureWebSocket: isDev ? false : undefined,
      pipelineTLS: isDev ? false : undefined,
      pipelineConnect: isDev ? false : undefined,
    }),
  });

  client = { db };

  return client as PgClient<DB>;
};
