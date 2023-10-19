import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import { twMergeConfig } from '../tw.ts';
import type { VariantSlots } from '../types.ts';
import { makeStaticClass } from '../utils/make-static-class.ts';
import { baseMenuStyle } from './bases/menu.styles.ts';

export type DropdownMenuStyleProps = VariantProps<typeof dropdownMenuStyle>;
export type DropdownMenuSlots = VariantSlots<typeof baseMenuStyle.slots & typeof dropdownMenuStyle.slots>;

export const dropdownMenuStaticClass = makeStaticClass<DropdownMenuSlots>('drp-menu');

export const dropdownMenuStyle = tv(
  {
    extend: baseMenuStyle,
    slots: {},
    variants: {},
  },
  {
    twMergeConfig,
  },
);
