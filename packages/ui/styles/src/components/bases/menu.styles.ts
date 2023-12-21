import { tv } from 'tailwind-variants';

import { twMergeConfig, tx } from '../../tw.ts';

const baseContent = tx(
  'flex flex-col overflow-hidden',
  'rounded-lg p-1.5 text-base',
  'bg-neutral-surface shadow',
  'animate-popper',
  'max-h-[var(--radix-dropdown-menu-content-available-height)]',
  'origin-[var(--radix-dropdown-menu-content-transform-origin)]',

  // .ui-scrollbar must match scrollbarStaticClass('base')
  `[&:has(.ui-scrollbar[data-orientation=vertical])]:[--viewport-padding:10px]`,
);

const baseContentViewport = tx('overflow-auto pr-[var(--viewport-padding)]');

const baseItem = tx(
  'flex cursor-default select-none items-center rounded outline-none',
  'px-2 py-1',
  'focus:bg-primary-1 focus:text-on-primary',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
);

export const baseMenuStyle = tv(
  {
    slots: {
      base: baseContent,
      baseViewport: baseContentViewport,

      subContent: baseContent,
      subContentViewport: baseContentViewport,

      item: baseItem,
      checkboxItem: baseItem,
      radioItem: baseItem,

      itemIndicator: tx('flex w-6 items-center'),
      itemContent: tx('pr-6'),
      itemIcon: tx('flex w-6 items-center text-[0.9em] leading-none'),

      subtrigger: baseItem,
      subtriggerIcon: tx('ml-auto text-sm opacity-75'),

      label: tx('select-none px-2 py-1.5 text-sm font-light text-muted'),
      separator: tx('mx-1.5 my-2 h-px bg-neutral-line-1-a'),
      shortcut: tx('ml-auto text-xs tracking-widest opacity-60'),
    },

    variants: {
      inset: {
        true: {
          item: tx('pl-8'),
          label: tx('pl-8'),
        },
      },
    },
  },
  {
    twMergeConfig,
  },
);
