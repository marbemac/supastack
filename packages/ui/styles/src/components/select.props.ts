import type { SlotProp, StyleProps } from '../types.ts';
import type { SelectSlots, SelectStyleProps } from './select.styles.ts';

export type SelectProps = SelectStyleProps & SlotProp<SelectSlots>;

export type SelectTriggerProps = StyleProps & {
  placeholder?: string;
};

export type SelectContentProps = StyleProps & {};

export type SelectItemProps = {};

export type SelectGroupProps = {
  label?: string;
};
