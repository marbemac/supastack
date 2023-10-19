import type { SlotProp, StyleProps } from '../types.ts';
import type { DropdownMenuSlots, DropdownMenuStyleProps } from './dropdown-menu.styles.ts';
import type { IconProps } from './icon.props.ts';

export interface DropdownMenuContentProps extends StyleProps, DropdownMenuStyleProps, SlotProp<DropdownMenuSlots> {}

export interface DropdownMenuItemProps<T> extends StyleProps {
  icon?: IconProps<T>['icon'];
  shortcut?: string;
}

export interface DropdownMenuCheckboxItemProps extends StyleProps {
  shortcut?: string;
  checked?: boolean | 'indeterminate';
  onCheckedChange?: (checked: boolean) => void;
}

export interface DropdownMenuRadioItemProps extends StyleProps {
  shortcut?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export interface DropdownMenuGroupProps {
  label?: string;
}

export interface DropdownMenuRadioGroupProps {
  label?: string;
}
