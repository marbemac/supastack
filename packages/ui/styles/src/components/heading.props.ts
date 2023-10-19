import type { SlotProp, StyleProps } from '../types.ts';
import type { HeadingSlots, HeadingStyleProps } from './heading.styles.ts';

export interface HeadingProps extends StyleProps, HeadingStyleProps, SlotProp<HeadingSlots> {}
