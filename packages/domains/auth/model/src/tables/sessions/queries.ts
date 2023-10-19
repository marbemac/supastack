import type { BaseInsertQueryOpts, BaseSelectQueryOpts, BuildQueriesOpts } from '@supastack/db-model';
import type { Kysely } from 'kysely';

import type { BaseNewSession, SessionsDb } from './schema.ts';
import { SESSIONS_KEY } from './schema.ts';

export type BaseSessionQueries = ReturnType<typeof baseSessionQueries>;

export const baseSessionQueries = <T extends SessionsDb>(opts: Opts<T>) => {
  const db = opts.db as unknown as Kysely<SessionsDb>;

  return {
    byToken: sessionByToken({ db }),
    sessionByTokenWithUser: sessionByTokenWithUser({ db }),
    create: createSession({ db }),
    updateByToken: updateSessionByToken({ db }),
    deleteByToken: deleteSessionByToken({ db }),
  };
};

type Opts<T extends SessionsDb> = BuildQueriesOpts<T>;
type SelectQueryOpts<T extends SessionsDb> = BaseSelectQueryOpts<T>;
type InsertQueryOpts<T extends SessionsDb> = BaseInsertQueryOpts<T>;

const sessionByToken = ({ db }: SelectQueryOpts<SessionsDb>) => {
  return (params: { token: string }) =>
    db.selectFrom(SESSIONS_KEY).selectAll().where('sessionToken', '=', params.token).executeTakeFirst();
};

const createSession = ({ db }: InsertQueryOpts<SessionsDb>) => {
  return (values: BaseNewSession) => {
    return db.insertInto(SESSIONS_KEY).values(values).returningAll().executeTakeFirstOrThrow();
  };
};

const sessionByTokenWithUser = ({ db }: SelectQueryOpts<SessionsDb>) => {
  return async (params: { token: string }) =>
    db
      .selectFrom(SESSIONS_KEY)
      .innerJoin('users', 'users.id', 'sessions.userId')
      .selectAll('users')
      .select([
        'sessions.userId as sessionUserId',
        'sessions.sessionToken as sessionToken',
        'sessions.expires as sessionExpires',
      ])
      .where('sessions.sessionToken', '=', params.token)
      .executeTakeFirst();
};

const updateSessionByToken = ({ db }: InsertQueryOpts<SessionsDb>) => {
  return (where: { token: string }, values: Partial<BaseNewSession>) => {
    return db
      .updateTable(SESSIONS_KEY)
      .set(values)
      .where('sessionToken', '=', where.token)
      .returningAll()
      .executeTakeFirstOrThrow();
  };
};

const deleteSessionByToken = ({ db }: InsertQueryOpts<SessionsDb>) => {
  return (where: { token: string }) => {
    return db.deleteFrom(SESSIONS_KEY).where('sessionToken', '=', where.token).executeTakeFirst();
  };
};
