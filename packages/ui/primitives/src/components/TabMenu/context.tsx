import type { TabMenuProps, tabMenuStyle } from '@supastack/ui-styles';

import { createContext } from '../../utils/create-context.ts';

type TabMenuContextValue = {
  slots: ReturnType<typeof tabMenuStyle>;
  slotClasses?: TabMenuProps['slotClasses'];
};

export const [TabMenuProvider, useTabMenu] = createContext<TabMenuContextValue>({
  name: 'TabMenuContext',
  strict: true,
});
