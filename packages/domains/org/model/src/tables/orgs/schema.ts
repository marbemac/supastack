import type { DrizzleToKysely } from '@supastack/db-model';
import { idCol, timestampCol } from '@supastack/db-model';
import type { SetOptional } from '@supastack/utils-types';
import type { BuildColumns } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';

import type { TOrgId } from '../../ids.ts';

export const ORGS_KEY = 'orgs' as const;
export const ORGS_TABLE = 'orgs' as const;

export const baseOrgColumns = {
  id: idCol<TOrgId>()('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  createdAt: timestampCol('created_at').notNull().defaultNow(),
  updatedAt: timestampCol('updated_at').defaultNow(),
};

export const baseOrgConfig = (table: BuildColumns<typeof ORGS_TABLE, typeof baseOrgColumns, 'pg'>) => {
  return {};
};

const baseOrgs = pgTable(ORGS_TABLE, baseOrgColumns, baseOrgConfig);

export type BaseOrgsTableCols = DrizzleToKysely<typeof baseOrgs>;
export type BaseNewOrg = SetOptional<typeof baseOrgs.$inferInsert, 'id'>;
export type BaseOrg = typeof baseOrgs.$inferSelect;
export type BaseOrgColNames = NonNullable<keyof BaseOrg>;

/** The table we are defining + any other tables in the DB this table must be aware of (for queries, etc) */
export interface OrgsDb<T extends BaseOrgsTableCols = BaseOrgsTableCols> {
  [ORGS_KEY]: T;
}
