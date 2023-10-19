import type { SlotProp, StyleProps } from '../types.ts';
import type { TabsSlots, TabsStyleProps } from './tabs.styles.ts';

export interface TabsProps extends StyleProps, TabsStyleProps, SlotProp<TabsSlots> {}

export interface TabsListProps extends StyleProps {}

export interface TabsTriggerProps extends StyleProps {}

export interface TabsContentProps extends StyleProps {}
