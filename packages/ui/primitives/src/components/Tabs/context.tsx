import type { TabsProps, tabsStyle } from '@supastack/ui-styles';
import { createContext, useContext } from 'react';

type TabsContextValue = {
  slots: ReturnType<typeof tabsStyle>;
  slotClasses?: TabsProps['slotClasses'];
};

const TabsContext = createContext<TabsContextValue | null>(null);

export const TabsProvider = TabsContext.Provider;

export const useTabs = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error('useTabs must be used within a `TabsProvider`');
  }

  return ctx;
};
