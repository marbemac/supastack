import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import { twMergeConfig, tx } from '../tw.ts';
import type { VariantSlots } from '../types.ts';
import { makeStaticClass } from '../utils/make-static-class.ts';

export type DialogStyleProps = VariantProps<typeof dialogStyle>;
export type DialogSlots = VariantSlots<typeof dialogStyle.slots>;

export const dialogStaticClass = makeStaticClass<DialogSlots>('dialog');

export const dialogStyle = tv(
  {
    slots: {
      base: '',

      trigger: '',

      overlay: tx(
        'fixed inset-0 z-40',
        'after:absolute after:inset-0 after:bg-overlay after:saturate-50',
        'animate-overlay',
      ),

      content: tx(
        'fixed left-[50%] top-[50%] z-5 max-h-[85vh] max-w-2xl overflow-auto',
        'translate-x-[-50%] translate-y-[-50%]',
        'bg-panel shadow-lg outline-none',
        'animate-content',
        'rounded-xl p-6', // size
      ),

      title: '',

      description: tx('text-muted'),

      close: '',
    },

    variants: {},
  },
  {
    twMergeConfig,
  },
);
