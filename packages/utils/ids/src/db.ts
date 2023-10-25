import { createId, init } from '@paralleldrive/cuid2';
import { custom } from 'valibot';

export type CUID2 = string;

export const generateDbId = () => {
  return createId() as CUID2;
};

export type DbId<NS extends string = string> = `${NS}_${CUID2}`;

// https://github.com/paralleldrive/cuid2#parameterized-length
// sqrt(36^(12-1)*26)
// With length of 12, 50% chance of collision after 1,849,909,268 IDs
// Can reduce this for entities where we know the cardinality is low (e.g. customer records... we're not going ot have a billion companies)
export function dbIdFactory<NS extends string>(namespace: NS, idLength = 12) {
  const createDbId = init({ length: idLength });
  const validator = custom<DbId<NS>>(val => {
    return typeof val === 'string' && isDbIdNamespace(val, namespace);
  }, 'Invalid ID');

  return {
    namespace,
    generate: (): DbId<NS> => create(namespace, createDbId),
    isNamespace: (id: DbId, throwIfNotMatch = false) => isDbIdNamespace(id, namespace, throwIfNotMatch),
    validator,
    isValid: (input: unknown): input is DbId<NS> => !!validator(input as any).issues?.length,
  };
}

export function isDbIdValid(id: DbId): boolean {
  try {
    split(id);
    return true;
  } catch {
    return false;
  }
}

export function getDbIdNamespace<NS extends string>(id: DbId<NS>): NS {
  const [namespace] = split(id);
  return namespace as NS;
}

export function isDbIdNamespace<NS extends string>(id: DbId, namespace: NS, throwIfNotMatch = false): id is DbId<NS> {
  const isMatch = getDbIdNamespace(id) === namespace;

  if (!isMatch && throwIfNotMatch) {
    throw new TypeError(`Expected ID to have namespace "${namespace}" but received ${getDbIdNamespace(id)}`);
  }

  return isMatch;
}

/** Internal */

function split<NS extends string>(id: DbId<NS>): [NS, CUID2] {
  const [namespace, cuid2String] = id.split('_');

  validateNamespace(namespace, true);

  return [namespace as NS, cuid2String || ''];
}

function validateNamespace(namespace?: string, throwIfNotValid = false): boolean {
  const isValid = !namespace ? false : /^[a-z]{1,10}$/.test(namespace);

  if (!isValid && throwIfNotValid) {
    throw new TypeError(
      `ID namespace must be underscore letters a-z and have length between 1 and 10. Received: "${namespace}"`,
    );
  }

  return isValid;
}

function create<NS extends string>(namespace: NS, createDbId: () => string): DbId<NS> {
  validateNamespace(namespace, true);

  const cuid2 = createDbId();
  return `${namespace}_${cuid2}`;
}
