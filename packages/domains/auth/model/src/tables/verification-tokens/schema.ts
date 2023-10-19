import type { DrizzleToKysely } from '@supastack/db-model';
import { timestampCol } from '@supastack/db-model';
import type { BuildColumns } from 'drizzle-orm';
import { pgTable, primaryKey, text } from 'drizzle-orm/pg-core';

export const VERIFICATION_TOKENS_KEY = 'verificationTokens' as const;
export const VERIFICATION_TOKENS_TABLE = 'verification_tokens' as const;

export const baseVerificationTokenColumns = {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: timestampCol('expires').notNull(),
};

export const baseVerificationTokenConfig = (
  table: BuildColumns<typeof VERIFICATION_TOKENS_TABLE, typeof baseVerificationTokenColumns, 'pg'>,
) => {
  return {
    compoundKey: primaryKey(table.identifier, table.token),
  };
};

const baseVerificationTokens = pgTable(
  VERIFICATION_TOKENS_TABLE,
  baseVerificationTokenColumns,
  baseVerificationTokenConfig,
);

export type BaseVerificationTokenTableCols = DrizzleToKysely<typeof baseVerificationTokens>;
export type BaseNewVerificationToken = typeof baseVerificationTokens.$inferInsert;
export type BaseVerificationToken = typeof baseVerificationTokens.$inferSelect;
export type BaseVerificationTokenColNames = NonNullable<keyof BaseVerificationToken>;

/** The table we are defining + any other tables in the DB this table must be aware of (for queries, etc) */
export interface VerificationTokensDb<T extends BaseVerificationTokenTableCols = BaseVerificationTokenTableCols> {
  [VERIFICATION_TOKENS_KEY]: T;
}
