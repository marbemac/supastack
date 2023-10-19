import type { SlotProp, StyleProps } from '../types.ts';
import type { FormSlots, FormStyleProps } from './form.styles.ts';

export interface FormProps extends StyleProps, FormStyleProps, SlotProp<FormSlots> {}
