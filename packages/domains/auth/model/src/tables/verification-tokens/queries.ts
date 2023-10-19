import type { BaseInsertQueryOpts, BaseSelectQueryOpts, BuildQueriesOpts } from '@supastack/db-model';
import type { Kysely } from 'kysely';

import type { BaseNewVerificationToken, VerificationTokensDb } from './schema.ts';
import { VERIFICATION_TOKENS_KEY } from './schema.ts';

export type BaseVerificationTokenQueries = ReturnType<typeof baseVerificationTokenQueries>;

export const baseVerificationTokenQueries = <T extends VerificationTokensDb>(opts: Opts<T>) => {
  const db = opts.db as unknown as Kysely<VerificationTokensDb>;

  return {
    byIdentifierToken: verificationTokenByIdentifierToken({ db }),
    create: createVerificationToken({ db }),
    deleteByIdentifierToken: deleteByIdentifierToken({ db }),
  };
};

type Opts<T extends VerificationTokensDb> = BuildQueriesOpts<T>;
type SelectQueryOpts<T extends VerificationTokensDb> = BaseSelectQueryOpts<T>;
type InsertQueryOpts<T extends VerificationTokensDb> = BaseInsertQueryOpts<T>;

const verificationTokenByIdentifierToken = ({ db }: SelectQueryOpts<VerificationTokensDb>) => {
  return (params: { identifier: string; token: string }) =>
    db
      .selectFrom(VERIFICATION_TOKENS_KEY)
      .selectAll()
      .where('identifier', '=', params.identifier)
      .where('token', '=', params.token)
      .executeTakeFirst();
};

const createVerificationToken = ({ db }: InsertQueryOpts<VerificationTokensDb>) => {
  return (values: BaseNewVerificationToken) => {
    return db.insertInto(VERIFICATION_TOKENS_KEY).values(values).returningAll().executeTakeFirstOrThrow();
  };
};

const deleteByIdentifierToken = ({ db }: InsertQueryOpts<VerificationTokensDb>) => {
  return (where: { identifier: string; token: string }) => {
    return db
      .deleteFrom(VERIFICATION_TOKENS_KEY)
      .where('identifier', '=', where.identifier)
      .where('token', '=', where.token)
      .returningAll()
      .executeTakeFirst();
  };
};
