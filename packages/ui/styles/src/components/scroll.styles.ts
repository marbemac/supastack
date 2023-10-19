import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import { twMergeConfig, tx } from '../tw.ts';
import type { VariantSlots } from '../types.ts';
import { makeStaticClass } from '../utils/make-static-class.ts';

/**
 * scroll-area
 */

export type ScrollAreaStyleProps = VariantProps<typeof scrollAreaStyle>;
export type ScrollAreaSlots = VariantSlots<typeof scrollAreaStyle.slots>;

export const scrollAreaStaticClass = makeStaticClass<ScrollAreaSlots>('sa');

export const scrollAreaStyle = tv(
  {
    slots: {
      base: tx('flex h-full w-full flex-col overflow-hidden'),
      viewport: tx('h-full w-full overscroll-x-contain'),
    },
    defaultVariants: {},
    variants: {},
  },
  {
    twMergeConfig,
  },
);

/**
 * scrollbar
 */

export type ScrollbarStyleProps = VariantProps<typeof scrollbarStyle>;
export type ScrollbarSlots = VariantSlots<typeof scrollbarStyle.slots>;

export const scrollbarStaticClass = makeStaticClass<ScrollbarSlots>('scrollbar');

export const scrollbarStyle = tv(
  {
    slots: {
      base: tx(
        'touch-none flex select-none rounded bg-neutral-soft-2',
        'motion-safe:data-[state=hidden]:animate-fade-out motion-safe:data-[state=visible]:animate-fade-in',
      ),
      thumb: tx(
        'rounded-inherit bg-neutral-soft-2-a transition-colors duration-100 hover:bg-neutral-1/40',
        'relative',
        `before:content-['_']`,
        'before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[20px] before:w-full before:min-w-[20px] before:-translate-x-1/2 before:-translate-y-1/2',
      ),
    },
    variants: {
      orientation: {
        vertical: tx('w-1 flex-col'),
        horizontal: tx('h-1 flex-row'),
      },
    },
  },
  {
    twMergeConfig,
  },
);
