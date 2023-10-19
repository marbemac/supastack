import type { SlotProp, StyleProps } from '../types.ts';
import type { DialogSlots, DialogStyleProps } from './dialog.styles.ts';

export interface DialogProps extends StyleProps, DialogStyleProps, SlotProp<DialogSlots> {}

export interface DialogTriggerProps extends StyleProps {}

export interface DialogContentProps extends StyleProps {}

export interface DialogTitleProps extends StyleProps {}

export interface DialogDescriptionProps extends StyleProps {}

export interface DialogCloseProps extends StyleProps {}
