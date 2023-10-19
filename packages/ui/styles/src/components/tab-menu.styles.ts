import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import { twMergeConfig } from '../tw.ts';
import type { VariantSlots } from '../types.ts';
import { makeStaticClass } from '../utils/make-static-class.ts';
import { baseTabsStyle } from './bases/tabs.styles.ts';

export type TabMenuStyleProps = VariantProps<typeof tabMenuStyle>;
export type TabMenuSlots = VariantSlots<Exclude<typeof baseTabsStyle.slots, 'base'> & typeof tabMenuStyle.slots>;

export const tabMenuStaticClass = makeStaticClass<TabMenuSlots>('tab-menu');

export const tabMenuStyle = tv(
  {
    extend: baseTabsStyle,

    slots: {},

    variants: {},
  },
  {
    twMergeConfig,
  },
);
