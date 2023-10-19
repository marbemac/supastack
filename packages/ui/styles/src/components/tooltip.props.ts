import type { SlotProp, StyleProps } from '../types.ts';
import type { TooltipSlots, TooltipStyleProps } from './tooltip.styles.ts';

export interface TooltipProps<T> extends StyleProps, TooltipStyleProps, SlotProp<TooltipSlots> {
  content: T;
  children: T;
  multiline?: boolean;
}
