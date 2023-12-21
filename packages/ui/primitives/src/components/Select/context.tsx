import type { SelectProps, selectStyle } from '@supastack/ui-styles';

import { createContext } from '../../utils/create-context.ts';

type SelectContextValue = Pick<SelectProps<React.ReactNode>, 'slotClasses' | 'size' | 'inset' | 'value'> & {
  value?: string;
  slots: ReturnType<typeof selectStyle>;
};

export const [SelectProvider, useSelect] = createContext<SelectContextValue>({
  name: 'SelectContext',
  strict: true,
});
