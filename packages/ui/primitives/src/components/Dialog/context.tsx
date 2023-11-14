import type { DialogProps, dialogStyle } from '@supastack/ui-styles';

import { createContext } from '../../utils/create-context.ts';

type DialogContextValue = Pick<DialogProps, 'slotClasses'> & {
  slots: ReturnType<typeof dialogStyle>;
};

export const [DialogProvider, useDialog] = createContext<DialogContextValue>({
  name: 'DialogContext',
  strict: true,
});
