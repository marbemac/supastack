import type { SlotProp, StyleProps } from '../types.ts';
import type { CardSlots, CardStyleProps } from './card.styles.ts';

export type CardProps<T> = StyleProps & CardStyleProps & SlotProp<CardSlots>;
