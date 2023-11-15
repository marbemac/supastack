import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import { twMergeConfig, tx } from '../tw.ts';
import type { VariantSlots } from '../types.ts';
import { makeStaticClass } from '../utils/make-static-class.ts';
import { formSizes, formSpacing } from '../utils/size.ts';
import { baseMenuStyle } from './bases/menu.styles.ts';

export type SelectStyleProps = VariantProps<typeof selectStyle>;
export type SelectSlots = VariantSlots<typeof baseMenuStyle.slots & typeof selectStyle.slots>;

export const selectStaticClass = makeStaticClass<SelectSlots>('select');

export const selectStyle = tv(
  {
    extend: baseMenuStyle,
    slots: {
      base: baseMenuStyle.slots.base,
      baseViewport: baseMenuStyle.slots.baseViewport,

      item: baseMenuStyle.slots.item,

      itemIndicator: tx(baseMenuStyle.slots.itemIndicator, 'w-4'),
      itemContent: baseMenuStyle.slots.itemContent,
      itemIcon: baseMenuStyle.slots.itemIcon,

      label: baseMenuStyle.slots.label,
      separator: baseMenuStyle.slots.separator,
    },
    defaultVariants: {
      size: 'md',
    },
    variants: {
      size: {
        sm: {
          base: tx('p-1'),
          item: formSizes.sm,
          label: tx(formSpacing.sm, 'py-1 text-xs'),
          separator: tx('mx-1 my-1.5'),
        },
        md: {
          item: formSizes.md,
        },
      },
    },
  },
  {
    twMergeConfig,
  },
);
