import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import { twMergeConfig, tx } from '../tw.ts';
import type { VariantSlots } from '../types.ts';
import { focusStyles } from '../utils/focus.ts';
import { makeStaticClass } from '../utils/make-static-class.ts';
import { baseTabsStyle } from './bases/tabs.styles.ts';

export type TabsStyleProps = VariantProps<typeof tabsStyle>;
export type TabsSlots = VariantSlots<typeof baseTabsStyle.slots & typeof tabsStyle.slots>;

export const tabsStaticClass = makeStaticClass<TabsSlots>('tabs');

export const tabsStyle = tv(
  {
    extend: baseTabsStyle,

    slots: {
      content: tx(focusStyles),
    },

    variants: {},
  },
  {
    twMergeConfig,
  },
);
