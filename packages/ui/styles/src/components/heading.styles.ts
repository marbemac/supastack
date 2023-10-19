import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import { twMergeConfig, tx } from '../tw.ts';
import type { VariantSlots } from '../types.ts';
import { makeStaticClass } from '../utils/make-static-class.ts';

export const headingStyle = tv(
  {
    slots: {
      base: tx('font-bold'),
    },
    defaultVariants: {
      size: 6,
    },
    variants: {
      size: {
        1: tx('text-sm leading-2'),
        2: tx('text-base leading-2'),
        3: tx('text-lg leading-3'),
        4: tx('text-xl leading-4'),
        5: tx('text-2xl leading-5'),
        6: tx('text-3xl leading-6'),
        7: tx('text-4xl leading-7'),
        8: tx('text-5xl leading-8'),
        9: tx('text-7xl leading-9'),
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

export type HeadingStyleProps = VariantProps<typeof headingStyle>;
export type HeadingSlots = VariantSlots<typeof headingStyle.slots>;

export const headingStaticClass = makeStaticClass<HeadingSlots>('heading');
