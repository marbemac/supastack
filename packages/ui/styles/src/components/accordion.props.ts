import type { SlotProp, StyleProps } from '../types.ts';
import type { AccordionSlots, AccordionStyleProps } from './accordion.styles.ts';

export interface AccordionProps extends StyleProps, AccordionStyleProps, SlotProp<AccordionSlots> {}

export interface AccordionItemProps extends StyleProps {}

export interface AccordionTriggerProps extends StyleProps {}

export interface AccordionContentProps extends StyleProps {}
