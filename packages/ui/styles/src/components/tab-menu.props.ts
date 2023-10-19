import type { SlotProp, StyleProps } from '../types.ts';
import type { TabMenuSlots, TabMenuStyleProps } from './tab-menu.styles.ts';

/**
 * Tab menu
 */

export interface TabMenuProps extends StyleProps, TabMenuStyleProps, SlotProp<TabMenuSlots> {}

export interface TabMenuTriggerProps extends StyleProps {}
