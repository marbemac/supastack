import { type DrizzleToKysely, idCol } from '@supastack/db-model';
import { type BaseUsersTableCols, type USERS_KEY } from '@supastack/user-model';
import type { TUserId } from '@supastack/user-model/ids';
import type { BuildColumns } from 'drizzle-orm';
import { bigint, index, pgTable, text } from 'drizzle-orm/pg-core';

export const VERIFICATION_TOKENS_KEY = 'verificationTokens' as const;
export const VERIFICATION_TOKENS_TABLE = 'verification_tokens' as const;

export const baseVerificationTokenCols = {
  token: text('token').primaryKey(),
  userId: idCol<TUserId>()('user_id').notNull(),
  expires: bigint('expires', { mode: 'number' }).notNull(),
  purpose: text('purpose', { enum: ['magic-link'] }).notNull(),
};

export const baseVerificationTokenConfig = (
  table: BuildColumns<typeof VERIFICATION_TOKENS_TABLE, typeof baseVerificationTokenCols, 'pg'>,
) => {
  return {
    userIdIdx: index('verification_tokens_user_id_idx').on(table.userId),
  };
};

const baseVerificationTokens = pgTable(
  VERIFICATION_TOKENS_TABLE,
  baseVerificationTokenCols,
  baseVerificationTokenConfig,
);

export type VerificationTokenPurpose = BaseVerificationTokensTableCols['purpose']['__select__'];

export type BaseVerificationTokensTableCols = DrizzleToKysely<typeof baseVerificationTokens>;
export type BaseNewVerificationToken = typeof baseVerificationTokens.$inferInsert;
export type BaseVerificationToken = typeof baseVerificationTokens.$inferSelect;
export type BaseVerificationTokenColNames = NonNullable<keyof BaseVerificationToken>;

/** The table we are defining + any other tables in the DB this table must be aware of (for queries, etc) */
export interface VerificationTokensDb<
  T extends BaseVerificationTokensTableCols = BaseVerificationTokensTableCols,
  U extends BaseUsersTableCols = BaseUsersTableCols,
> {
  [VERIFICATION_TOKENS_KEY]: T;
  [USERS_KEY]: U;
}
