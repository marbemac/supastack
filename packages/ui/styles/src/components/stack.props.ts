import type { SlotProp, StyleProps } from '../types.ts';
import type { StackSlots, StackStyleProps } from './stack.styles.ts';

export type StackProps<T> = StackRootProps<T>;

type StackRootProps<T> = {
  divider?: boolean | T;
} & StyleProps &
  StackStyleProps &
  SlotProp<StackSlots>;
