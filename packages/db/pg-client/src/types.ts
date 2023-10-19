import type { Kysely } from 'kysely';

export interface InitClientOpts {
  uri: string;

  debug?: boolean;

  /**
   * Max connections, for the clients that support it.
   */
  max?: number;

  /**
   * Re-use existing client, if one was created previously.
   * Only applicable in the edge client, and usually you will not want this.
   */
  reuse?: boolean;
}

export interface PgClient<T> {
  db: Kysely<T>;
}

export type InitClientFn = <T>(opts: InitClientOpts) => PgClient<T>;
