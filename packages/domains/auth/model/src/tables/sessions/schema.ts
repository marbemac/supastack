import type { DrizzleToKysely } from '@supastack/db-model';
import { timestampCol } from '@supastack/db-model';
import { type BaseUsersTableCols, type USERS_KEY } from '@supastack/user-model';
import type { BuildColumns } from 'drizzle-orm';
import { index, pgTable, text } from 'drizzle-orm/pg-core';

export const SESSIONS_KEY = 'sessions' as const;
export const SESSIONS_TABLE = 'sessions' as const;

export const baseSessionColumns = {
  sessionToken: text('session_token').primaryKey(),
  userId: text('user_id').notNull(),
  expires: timestampCol('expires').notNull(),
};

export const baseSessionConfig = (table: BuildColumns<typeof SESSIONS_TABLE, typeof baseSessionColumns, 'pg'>) => {
  return {
    userIdIdx: index('sessions_user_id_idx').on(table.userId),
  };
};

const baseSessions = pgTable(SESSIONS_TABLE, baseSessionColumns, baseSessionConfig);

export type BaseSessionsTableCols = DrizzleToKysely<typeof baseSessions>;
export type BaseNewSession = typeof baseSessions.$inferInsert;
export type BaseSession = typeof baseSessions.$inferSelect;
export type BaseSessionColNames = NonNullable<keyof BaseSession>;

/** The table we are defining + any other tables in the DB this table must be aware of (for queries, etc) */
export interface SessionsDb<
  T extends BaseSessionsTableCols = BaseSessionsTableCols,
  U extends BaseUsersTableCols = BaseUsersTableCols,
> {
  [SESSIONS_KEY]: T;
  [USERS_KEY]: U;
}
