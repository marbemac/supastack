import { Id } from '@supastack/utils-ids';

export const OrgId = Id.dbIdFactory('org');
export type OrgNamespace = (typeof OrgId)['namespace'];
export type TOrgId = ReturnType<(typeof OrgId)['generate']>;
