import type { SlotProp, StyleProps } from '../types.ts';
import type { ScrollAreaSlots, ScrollAreaStyleProps, ScrollbarSlots, ScrollbarStyleProps } from './scroll.styles.ts';

export interface ScrollAreaProps extends StyleProps, ScrollAreaStyleProps, SlotProp<ScrollAreaSlots> {}

export interface ScrollbarProps extends StyleProps, ScrollbarStyleProps, SlotProp<ScrollbarSlots> {}
