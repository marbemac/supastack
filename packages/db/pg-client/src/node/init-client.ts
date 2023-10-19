import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import * as pg from 'pg';

import type { InitClientFn, InitClientOpts, PgClient } from '../types.ts';

let client: PgClient<any>;

export const initClient: InitClientFn = <DB>({ uri, max, debug }: InitClientOpts): PgClient<DB> => {
  if (client) {
    return client as PgClient<DB>;
  }

  // @ts-expect-error f-ing node import shit.
  const Pool = pg.default.Pool;

  const db = new Kysely<DB>({
    plugins: [new CamelCasePlugin()],
    log: debug ? ['query', 'error'] : ['error'],
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: uri,
        max,
      }),
    }),
  });

  client = { db };

  return client as PgClient<DB>;
};
