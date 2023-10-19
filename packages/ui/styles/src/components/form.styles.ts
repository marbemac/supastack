import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import { twMergeConfig, tx } from '../tw.ts';
import type { VariantSlots } from '../types.ts';
import { makeStaticClass } from '../utils/make-static-class.ts';

export type FormStyleProps = VariantProps<typeof formStyle>;
export type FormSlots = VariantSlots<typeof formStyle.slots>;

export const formStaticClass = makeStaticClass<FormSlots>('form');

export const formStyle = tv(
  {
    slots: {
      base: tx('space-y-6'),
      item: tx('w-full space-y-2'),
      itemTop: tx('flex items-center justify-between gap-4'),
      itemDescription: tx('text-sm text-muted'),
      itemError: tx('text-sm text-danger'),

      nestedContainer: tx('space-y-6'),
    },

    variants: {},
  },
  {
    twMergeConfig,
  },
);
