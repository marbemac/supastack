import { CamelCasePlugin, Kysely } from 'kysely';
import { PostgresJSDialect } from 'kysely-postgres-js';
import postgres from 'postgres';

import type { InitClientFn, InitClientOpts, PgClient } from './types.ts';

let client: PgClient<any>;

export const initClient: InitClientFn = <DB>({ uri, max, debug, reuse }: InitClientOpts): PgClient<DB> => {
  if (client && reuse) {
    return client as PgClient<DB>;
  }

  const db = new Kysely<DB>({
    plugins: [new CamelCasePlugin()],
    log: debug ? ['query', 'error'] : ['error'],
    dialect: new PostgresJSDialect({
      postgres,
      connectionString: uri,
      options: {
        max,
      },
    }),
  });

  client = { db };

  return client as PgClient<DB>;
};
