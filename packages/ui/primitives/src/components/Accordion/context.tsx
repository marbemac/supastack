import type { AccordionProps, accordionStyle } from '@supastack/ui-styles';

import { createContext } from '../../utils/create-context.ts';

type AccordionContextValue = Pick<AccordionProps, 'slotClasses'> & {
  slots: ReturnType<typeof accordionStyle>;
};

export const [AccordionProvider, useAccordion] = createContext<AccordionContextValue>({
  name: 'AccordionContext',
  strict: true,
});
