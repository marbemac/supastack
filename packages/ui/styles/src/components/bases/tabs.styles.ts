import { tv } from 'tailwind-variants';

import { twMergeConfig, tx } from '../../tw.ts';
import { focusStyles } from '../../utils/focus.ts';

const triggerInnerSharedTx = tx('flex items-center justify-center', 'rounded px-2 py-1');

export const baseTabsStyle = tv(
  {
    slots: {
      base: tx(''),

      list: tx('flex overflow-x-auto whitespace-nowrap', 'h-10'),

      trigger: tx(
        'group relative flex shrink-0 select-none items-center justify-center outline-none',
        'px-2 text-base',
        'text-muted',
        'hover:text-fg data-[state=active]:text-fg',
        'data-[state=active]:before:h-[2px]',
        'data-[state=active]:before:absolute',
        'data-[state=active]:before:bottom-0',
        'data-[state=active]:before:inset-x-0',
        'data-[state=active]:before:bg-primary-1-a',
      ),

      triggerInner: tx(
        triggerInnerSharedTx,
        'absolute',
        'group-hover:bg-neutral-soft-1',
        'group-focus-visible:shadow-[0_0_0_2px] group-focus-visible:shadow-primary-1-a',
        'group-data-[state=active]:font-medium',
        'group-data-[state=active]:tracking-[-0.01em]',
      ),

      /**
       * Separate hidden from inner so that there is no horizontal shifting on screen
       * as user changes active tab and amount of bold text changes
       */
      triggerInnerHidden: tx(triggerInnerSharedTx, 'invisible font-medium'),

      content: tx(focusStyles),
    },

    variants: {
      inset: {
        true: {
          list: tx('-mx-4'),
        },
      },
    },
  },
  {
    twMergeConfig,
  },
);
