import type { TabMenuProps, tabMenuStyle } from '@supastack/ui-styles';
import { createContext, useContext } from 'react';

type TabMenuContextValue = {
  slots: ReturnType<typeof tabMenuStyle>;
  slotClasses?: TabMenuProps['slotClasses'];
};

const TabMenuContext = createContext<TabMenuContextValue | null>(null);

export const TabMenuProvider = TabMenuContext.Provider;

export const useTabMenu = () => {
  const ctx = useContext(TabMenuContext);
  if (!ctx) {
    throw new Error('useTabMenu must be used within a `TabMenuProvider`');
  }

  return ctx;
};
