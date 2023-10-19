import type { SlotProp, StyleProps } from '../types.ts';
import type { TextSlots, TextStyleProps } from './text.styles.ts';

export interface TextProps extends StyleProps, TextStyleProps, SlotProp<TextSlots> {}
