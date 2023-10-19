import type { DialogProps, dialogStyle } from '@supastack/ui-styles';
import { createContext, useContext } from 'react';

type DialogContextValue = Pick<DialogProps, 'slotClasses'> & {
  slots: ReturnType<typeof dialogStyle>;
};

const DialogContext = createContext<DialogContextValue | null>(null);

export const DialogProvider = DialogContext.Provider;

export const useDialog = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error('useDialog must be used within a `DialogProvider`');
  }

  return ctx;
};
