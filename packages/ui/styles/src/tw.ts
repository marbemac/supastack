import type { Config } from 'tailwind-merge';
import { type ClassNameValue, extendTailwindMerge, twJoin as cx } from 'tailwind-merge';

export type TW_STR = 'TW_STR';

/**
 * cx that expects tailwind classes (eslint and vscode are configured to check / autocomplete this fn)
 */
const tx = cx as (...classLists: ClassNameValue[]) => TW_STR;

/**
 * Optionally customize the twMerge config. Use this everywhere!
 * Do not use the default twMerge from `tailwind-merge` directly.
 *
 * Named txMerge rather than twMerge to clarify.
 *
 * https://github.com/dcastil/tailwind-merge/blob/v1.14.0/docs/configuration.md#usage-with-custom-tailwind-config
 */
export const twMergeConfig: Partial<Config> = {
  // ↓ Add values to existing theme scale or create a new one
  // spacing: ['sm', 'md', 'lg'],
  theme: {},

  // // ↓ Add values to existing class groups or define new ones
  // classGroups: {
  //     foo: ['foo', 'foo-2', { 'bar-baz': ['', '1', '2'] }],
  //     bar: [{ qux: ['auto', (value) => Number(value) >= 1000] }],
  //     baz: ['baz-sm', 'baz-md', 'baz-lg'],
  // },
  classGroups: {
    shadow: [{ shadow: ['border'] }],
  },

  // // ↓ Here you can define additional conflicts across class groups
  // conflictingClassGroups: {
  //     foo: ['bar'],
  // },

  // // ↓ Define conflicts between postfix modifiers and class groups
  // conflictingClassGroupModifiers: {
  //     baz: ['bar'],
  // },
};
const txMerge = extendTailwindMerge(twMergeConfig);

export type { ClassNameValue };
export { cx, tx, txMerge };
