import type { BaseInsertQueryOpts, BaseSelectQueryOpts, BuildQueriesOpts } from '@supastack/db-model';
import type { Kysely } from 'kysely';

import { AccountId } from '../../ids.ts';
import type { AccountsDb, BaseNewAccount } from './schema.ts';
import { ACCOUNTS_KEY } from './schema.ts';

export type BaseAccountQueries = ReturnType<typeof baseAccountQueries>;

export const baseAccountQueries = <T extends AccountsDb>(opts: Opts<T>) => {
  const db = opts.db as unknown as Kysely<AccountsDb>;

  return {
    byProviderAccountId: accountByProviderAccountId({ db }),
    userByAccount: userByAccount({ db }),
    create: createAccount({ db }),
    updateByProviderAccountId: updateAccountByProviderAccountId({ db }),
    deleteByProviderAccountId: deleteAccountByProviderAccountId({ db }),
  };
};

type Opts<T extends AccountsDb> = BuildQueriesOpts<T>;
type SelectQueryOpts<T extends AccountsDb> = BaseSelectQueryOpts<T>;
type InsertQueryOpts<T extends AccountsDb> = BaseInsertQueryOpts<T>;

const accountByProviderAccountId = ({ db }: SelectQueryOpts<AccountsDb>) => {
  return (params: { provider: string; providerAccountId: string }) =>
    db
      .selectFrom(ACCOUNTS_KEY)
      .selectAll()
      .where('provider', '=', params.provider)
      .where('providerAccountId', '=', params.providerAccountId)
      .executeTakeFirst();
};

const userByAccount = ({ db }: SelectQueryOpts<AccountsDb>) => {
  return async (params: { provider: string; providerAccountId: string }) =>
    db
      .selectFrom(ACCOUNTS_KEY)
      .innerJoin('users', 'users.id', 'accounts.userId')
      .selectAll('users')
      .where('accounts.provider', '=', params.provider)
      .where('accounts.providerAccountId', '=', params.providerAccountId)
      .executeTakeFirst();
};

const createAccount = ({ db }: InsertQueryOpts<AccountsDb>) => {
  return (values: BaseNewAccount) => {
    return db
      .insertInto(ACCOUNTS_KEY)
      .values({
        id: AccountId.generate(),
        ...values,
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  };
};

const updateAccountByProviderAccountId = ({ db }: InsertQueryOpts<AccountsDb>) => {
  return (where: { provider: string; providerAccountId: string }, values: Partial<BaseNewAccount>) => {
    return db
      .updateTable(ACCOUNTS_KEY)
      .set(values)
      .where('provider', '=', where.provider)
      .where('providerAccountId', '=', where.providerAccountId)
      .executeTakeFirstOrThrow();
  };
};

const deleteAccountByProviderAccountId = ({ db }: InsertQueryOpts<AccountsDb>) => {
  return (where: { provider: string; providerAccountId: string }) => {
    return db
      .deleteFrom(ACCOUNTS_KEY)
      .where('provider', '=', where.provider)
      .where('providerAccountId', '=', where.providerAccountId)
      .executeTakeFirst();
  };
};
