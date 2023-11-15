import type { SelectProps, selectStyle } from '@supastack/ui-styles';

import { createContext } from '../../utils/create-context.ts';

type SelectContextValue = SelectProps & {
  value?: string;
  slots: ReturnType<typeof selectStyle>;
};

export const [SelectProvider, useSelect] = createContext<SelectContextValue>({
  name: 'SelectContext',
  strict: true,
});
