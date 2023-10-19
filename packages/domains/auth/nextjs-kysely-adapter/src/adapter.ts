import type { Adapter, AdapterAccount } from '@auth/core/adapters';
import type {
  BaseAccount,
  BaseAccountQueries,
  BaseNewSession,
  BaseSessionQueries,
  BaseVerificationTokenQueries,
} from '@supastack/auth-model';
import { ACCOUNTS_KEY, SESSIONS_KEY, VERIFICATION_TOKENS_KEY } from '@supastack/auth-model';
import type { BaseUser, BaseUserQueries } from '@supastack/user-model';
import { USERS_KEY } from '@supastack/user-model';

export interface AuthDbAdapterOpts {
  /**
   * Just the specific queries from the SDK that we need for the db adapter
   */
  queries: {
    [ACCOUNTS_KEY]: Pick<BaseAccountQueries, 'userByAccount' | 'create'>;
    [SESSIONS_KEY]: Pick<BaseSessionQueries, 'sessionByTokenWithUser' | 'create' | 'updateByToken' | 'deleteByToken'>;
    [USERS_KEY]: Pick<BaseUserQueries, 'create' | 'byId' | 'byEmail' | 'updateById'>;
    [VERIFICATION_TOKENS_KEY]: Pick<BaseVerificationTokenQueries, 'create' | 'deleteByIdentifierToken'>;
  };
}

/**
 * A custom adapter to leverage our type-safe db queries
 *
 * https://authjs.dev/guides/adapters/creating-a-database-adapter
 */
export function KyselyAdapter({ queries }: AuthDbAdapterOpts): Adapter {
  return {
    createUser: data => queries[USERS_KEY].create(data),

    getUser: async id => (await queries[USERS_KEY].byId({ id: id as BaseUser['id'] })) || null,

    getUserByEmail: async email => (await queries[USERS_KEY].byEmail({ email })) || null,

    getUserByAccount: async params => (await queries[ACCOUNTS_KEY].userByAccount(params)) || null,

    updateUser: ({ id, ...data }) => queries[USERS_KEY].updateById({ id: id as BaseUser['id'] }, data),

    // @ts-expect-error intentionally not implmementing here
    deleteUser: () => {
      // NOOP... this won't be as simple as one db query. And is currently "unimplemented"
      // https://authjs.dev/guides/adapters/creating-a-database-adapter#unimplemented-methods
    },

    linkAccount: async ({ userId, ...data }) => {
      const { scope, ...props } = await queries[ACCOUNTS_KEY].create({
        userId: userId as BaseAccount['userId'],
        ...data,
      });

      const account: AdapterAccount = {
        // @ts-expect-error bad typing on their part...
        scope,
        ...props,
      };

      return account;
    },

    // @ts-expect-error typings for these link/unlink methods are wonk
    // unlinkAccount is "unimplemented" ATM anyways
    // https://authjs.dev/guides/adapters/creating-a-database-adapter#unimplemented-methods
    unlinkAccount: params => queries[ACCOUNTS_KEY].deleteByProviderAccountId(params),

    createSession: ({ userId, ...data }) =>
      queries[SESSIONS_KEY].create({ userId: userId as BaseNewSession['userId'], ...data }),

    getSessionAndUser: async token => {
      const userAndSession = await queries[SESSIONS_KEY].sessionByTokenWithUser({ token });
      if (!userAndSession) return null;

      const { sessionExpires, sessionToken, sessionUserId, ...user } = userAndSession;
      return { session: { expires: sessionExpires, sessionToken: sessionToken, userId: sessionUserId }, user };
    },

    updateSession: ({ userId, ...data }) =>
      queries[SESSIONS_KEY].updateByToken(
        { token: data.sessionToken },
        { userId: userId as BaseNewSession['userId'] | undefined, ...data },
      ),

    deleteSession: async token => {
      await queries[SESSIONS_KEY].deleteByToken({ token });
    },

    createVerificationToken: data => queries[VERIFICATION_TOKENS_KEY].create(data),

    useVerificationToken: async params =>
      (await queries[VERIFICATION_TOKENS_KEY].deleteByIdentifierToken(params)) || null,
  };
}
