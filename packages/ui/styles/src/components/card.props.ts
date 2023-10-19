import type { SlotProp, StyleProps } from '../types.ts';
import type { CardSlots, CardStyleProps } from './card.styles.ts';

export interface CardProps<T> extends StyleProps, CardStyleProps, SlotProp<CardSlots> {}
