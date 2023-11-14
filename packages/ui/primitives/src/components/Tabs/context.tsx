import type { TabsProps, tabsStyle } from '@supastack/ui-styles';

import { createContext } from '../../utils/create-context.ts';

type TabsContextValue = {
  slots: ReturnType<typeof tabsStyle>;
  slotClasses?: TabsProps['slotClasses'];
};

export const [TabsProvider, useTabs] = createContext<TabsContextValue>({
  name: 'TabsContext',
  strict: true,
});
