import type { SlotProp, StyleProps } from '../types.ts';
import type { AvatarSlots, AvatarStyleProps } from './avatar.styles.ts';

export interface AvatarProps<T> extends StyleProps, AvatarStyleProps, SlotProp<AvatarSlots> {
  fallback: T;
}
