import type { DropdownMenuContentProps, dropdownMenuStyle } from '@supastack/ui-styles';
import { createContext, useContext } from 'react';

type DropdownMenuContextValue = DropdownMenuContentProps & {
  slots: ReturnType<typeof dropdownMenuStyle>;
};

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

export const DropdownMenuProvider = DropdownMenuContext.Provider;

export const useDropdownMenu = () => {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) {
    throw new Error('useDropdownMenu must be used within a `DropdownMenuProvider`');
  }

  return ctx;
};
