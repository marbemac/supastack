import type { SlotProp, StyleProps } from '../types.ts';
import type { DropdownMenuSlots, DropdownMenuStyleProps } from './dropdown-menu.styles.ts';
import type { IconProps } from './icon.props.ts';

export type DropdownMenuContentProps = {} & StyleProps & DropdownMenuStyleProps & SlotProp<DropdownMenuSlots>;

export type DropdownMenuItemProps<T> = {
  icon?: IconProps<T>['icon'];
  shortcut?: string;
  preventCloseOnSelect?: boolean;
} & StyleProps;

export type DropdownMenuCheckboxItemProps = {
  shortcut?: string;
  checked?: boolean | 'indeterminate';
  onCheckedChange?: (checked: boolean) => void;
} & StyleProps;

export type DropdownMenuRadioItemProps = {
  shortcut?: string;
  value?: string;
  onValueChange?: (value: string) => void;
} & StyleProps;

export type DropdownMenuGroupProps = {
  label?: string;
  preventCloseOnSelect?: boolean;
};

export type DropdownMenuRadioGroupProps = {
  label?: string;
  preventCloseOnSelect?: boolean;
};
