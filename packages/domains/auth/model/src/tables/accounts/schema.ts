import type { DrizzleToKysely } from '@supastack/db-model';
import { idCol, timestampCol } from '@supastack/db-model';
import type { BaseUsersTableCols, USERS_KEY } from '@supastack/user-model';
import type { TUserId } from '@supastack/user-model/ids';
import type { SetOptional } from '@supastack/utils-types';
import type { BuildColumns } from 'drizzle-orm';
import { index, integer, pgTable, text } from 'drizzle-orm/pg-core';

import type { TAccountId } from '../../ids.ts';

export const ACCOUNTS_KEY = 'accounts' as const;
export const ACCOUNTS_TABLE = 'accounts' as const;

/**
 * Pulled from https://github.com/nextauthjs/next-auth/blob/a7b6a29773055cfc03e449b5d38a02e8ebb9bfd2/packages/core/src/providers/index.ts#L13
 */
type ProviderType = 'oidc' | 'oauth' | 'email' | 'credentials';

export const baseAccountColumns = {
  id: idCol<TAccountId>()('id').primaryKey(),
  userId: idCol<TUserId>()('user_id').notNull(),
  type: text('type').$type<ProviderType>().notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refreshToken: text('refresh_token'),
  accessToken: text('access_token'),
  expiresAt: integer('expires_at'),
  tokenType: text('token_type'),
  scope: text('scope'),
  idToken: text('id_token'),
  sessionState: text('session_state'),
  createdAt: timestampCol('created_at').defaultNow().notNull(),
};

export const baseAccountConfig = (table: BuildColumns<typeof ACCOUNTS_TABLE, typeof baseAccountColumns, 'pg'>) => {
  return {
    userIdIdx: index('accounts_user_id_idx').on(table.userId),
    providerProviderAccountIdIdx: index('accounts_provider_provider_account_id_idx').on(
      table.provider,
      table.providerAccountId,
    ),
  };
};

const baseAccounts = pgTable(ACCOUNTS_TABLE, baseAccountColumns, baseAccountConfig);

export type BaseAccountsTableCols = DrizzleToKysely<typeof baseAccounts>;
export type BaseNewAccount = SetOptional<typeof baseAccounts.$inferInsert, 'id'>;
export type BaseAccount = typeof baseAccounts.$inferSelect;
export type BaseAccountColNames = NonNullable<keyof BaseAccount>;

/** The table we are defining + any other tables in the DB this table must be aware of (for queries, etc) */
export interface AccountsDb<
  T extends BaseAccountsTableCols = BaseAccountsTableCols,
  U extends BaseUsersTableCols = BaseUsersTableCols,
> {
  [ACCOUNTS_KEY]: T;
  [USERS_KEY]: U;
}
