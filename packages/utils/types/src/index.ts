/**
 * Use this when you need a "relaxed" string union type to preserve autocomplete.
 *
 * @example
 * type KeyTraitName = 't1' | 't2' | 't3';
 * export type TraitName = StringWithAutocomplete<KeyTraitName>;
 */
export type StringWithAutocomplete<T> = T | (string & Record<never, never>);

/**
 * Anything we need from type-fest, re-export here.
 */
export type {
  CamelCasedProperties,
  ReadonlyDeep,
  SetOptional,
  SetRequired,
  Simplify,
  SnakeCasedProperties,
} from 'type-fest';
