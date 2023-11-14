import type { DropdownMenuContentProps, dropdownMenuStyle } from '@supastack/ui-styles';

import { createContext } from '../../utils/create-context.ts';

type DropdownMenuContextValue = DropdownMenuContentProps & {
  slots: ReturnType<typeof dropdownMenuStyle>;
};

export const [DropdownMenuProvider, useDropdownMenu] = createContext<DropdownMenuContextValue>({
  name: 'DropdownMenuContext',
  strict: true,
});
