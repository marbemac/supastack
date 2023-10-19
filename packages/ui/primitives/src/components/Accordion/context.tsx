import type { AccordionProps, accordionStyle } from '@supastack/ui-styles';
import { createContext, useContext } from 'react';

type AccordionContextValue = Pick<AccordionProps, 'slotClasses'> & {
  slots: ReturnType<typeof accordionStyle>;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

export const AccordionProvider = AccordionContext.Provider;

export const useAccordion = () => {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error('useAccordion must be used within a `AccordionProvider`');
  }

  return ctx;
};
