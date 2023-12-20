import type { SlotProp, StyleProps } from '../types.ts';
import type { SelectSlots, SelectStyleProps } from './select.styles.ts';

export type SelectProps<T> = SelectStyleProps &
  SlotProp<SelectSlots> & {
    children?: T;
    value: string;
    onValueChange(value: string): void;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?(open: boolean): void;
    autoComplete?: string;
    disabled?: boolean;
  };

export type SelectTriggerProps = StyleProps & {
  placeholder?: string;
};

export type SelectContentProps = StyleProps & {};

export type SelectItemProps = {};

export type SelectGroupProps = {
  label?: string;
};
