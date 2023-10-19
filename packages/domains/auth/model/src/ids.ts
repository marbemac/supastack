import { Id } from '@supastack/utils-ids';

export const AccountId = Id.dbIdFactory('acct');
export type AccountNamespace = (typeof AccountId)['namespace'];
export type TAccountId = ReturnType<(typeof AccountId)['generate']>;
