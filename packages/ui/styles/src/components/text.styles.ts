import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import { twMergeConfig, tx } from '../tw.ts';
import type { VariantSlots } from '../types.ts';
import { makeStaticClass } from '../utils/make-static-class.ts';

export const textStyle = tv(
  {
    slots: {
      base: '',
    },
    defaultVariants: {
      size: 3,
    },
    variants: {
      size: {
        1: tx('text-xs leading-1'),
        2: tx('text-sm leading-2'),
        3: tx('text-base leading-3'),
        4: tx('text-lg leading-4'),
        5: tx('text-xl leading-5'),
        6: tx('text-2xl leading-6'),
        7: tx('text-3xl leading-7'),
        8: tx('text-4xl leading-8'),
        9: tx('text-5xl leading-9'),
      },
      trim: {
        normal: tx('leading-trim-normal'),
        start: tx('leading-trim-start'),
        end: tx('leading-trim-end'),
        both: tx('leading-trim-both'),
      },
    },
  },
  {
    twMergeConfig,
  },
);

export type TextStyleProps = VariantProps<typeof textStyle>;
export type TextSlots = VariantSlots<typeof textStyle.slots>;

export const textStaticClass = makeStaticClass<TextSlots>('text');
