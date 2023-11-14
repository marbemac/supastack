import type { SlotProp, StyleProps } from '../types.ts';
import type { ButtonGroupStyleProps, ButtonSlots, ButtonStyleProps } from './button.styles.ts';
import type { IconProps } from './icon.props.ts';
import type { StackProps } from './stack.props.ts';

export type ButtonProps<T> = StyleProps &
  ButtonStyleProps &
  SlotProp<ButtonSlots> & {
    /** If added, the button will show an icon before the button's label. */
    startIcon?: IconProps<T>['icon'];

    /** If added, the button will show an icon after the button's label. */
    endIcon?: IconProps<T>['icon'];

    /** The icon to show when `isLoading` is true. */
    loadingIcon?: IconProps<T>['icon'];

    /** The label to show in the button when `isLoading` is true. */
    loadingText?: string;

    /** The placement of the loader when `isLoading` is true. */
    loadingPlacement?: 'start' | 'end';
  };

export type ButtonGroupProps<T> = StyleProps &
  ButtonGroupStyleProps &
  Pick<ButtonProps<T>, 'size' | 'variant' | 'intent' | 'isDisabled'> & {
    spacing?: StackProps<T>['spacing'];
  };
