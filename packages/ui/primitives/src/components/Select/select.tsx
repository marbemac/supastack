'use client';

import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { ScrollAreaViewport } from '@radix-ui/react-scroll-area';
import * as SelectPrimitive from '@radix-ui/react-select';
import type {
  SelectContentProps as BSelectContentProps,
  SelectGroupProps as BSelectGroupProps,
  SelectItemProps as BSelectItemProps,
  SelectProps as BSelectProps,
} from '@supastack/ui-styles';
import { selectStaticClass, selectStyle } from '@supastack/ui-styles';
import { forwardRef, useMemo } from 'react';

import { polyRef } from '../../utils/forward-ref.ts';
import { Box } from '../Box/index.ts';
import type { ButtonProps } from '../Button/index.ts';
import { Button } from '../Button/index.ts';
import type { IconProps } from '../Icon/index.ts';
import { Icon } from '../Icon/index.ts';
import { ScrollArea } from '../ScrollArea/index.ts';
import { VStack } from '../Stack/index.ts';
import { SelectProvider, useSelect } from './context.tsx';

/**
 * ---
 * Root
 * ---
 */

export type SelectRootProps = Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
  'asChild' | 'defaultValue' | 'onValueChange'
> &
  BSelectProps & {
    // Controlled only
    onValueChange(value: string): void;
  };

const SelectRoot: React.FC<SelectRootProps> = props => {
  const { children, slotClasses, size, inset, value, ...rootProps } = props;

  const slots = useMemo(() => selectStyle({ size, inset }), [size, inset]);
  const contextVal = useMemo(
    () => ({ slots, slotClasses, size, inset, value }),
    [slots, slotClasses, size, inset, value],
  );

  return (
    <SelectPrimitive.Root {...rootProps} value={value}>
      <SelectProvider value={contextVal}>{children}</SelectProvider>
    </SelectPrimitive.Root>
  );
};
SelectRoot.displayName = SelectPrimitive.Root.displayName;

/**
 * ---
 * Trigger
 * ---
 */

type SelectTriggerElement = React.ElementRef<typeof SelectPrimitive.Trigger>;
type SelectTriggerProps = Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>, 'asChild'> &
  Pick<ButtonProps, 'variant' | 'intent'>;
const SelectTrigger = forwardRef<SelectTriggerElement, SelectTriggerProps>((props, forwardedRef) => {
  const { placeholder, variant, intent, ...triggerProps } = props;

  const { size } = useSelect();

  return (
    <SelectPrimitive.Trigger asChild>
      <Button
        size={size}
        {...triggerProps}
        variant={variant}
        intent={intent}
        ref={forwardedRef}
        endIcon={
          <SelectPrimitive.Icon asChild>
            <Icon icon={faChevronDown} tw="text-[0.9em]" />
          </SelectPrimitive.Icon>
        }
      >
        <SelectPrimitive.Value placeholder={placeholder} />
      </Button>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

/**
 * ---
 * Content
 * ---
 */

type SelectContentElement = React.ElementRef<typeof SelectPrimitive.Content>;
type SelectContentProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> &
  BSelectContentProps & {
    container?: React.ComponentProps<typeof SelectPrimitive.Portal>['container'];
  };
const SelectContent = forwardRef<SelectContentElement, SelectContentProps>((props, forwardedRef) => {
  const { className, children, container, tw, UNSAFE_class, ...contentProps } = props;

  const { slots, slotClasses } = useSelect();

  const baseTw = slots.base({ class: [selectStaticClass('base'), tw, UNSAFE_class, className] });
  const viewportTw = slots.baseViewport({
    class: [selectStaticClass('baseViewport'), slotClasses?.baseViewport],
  });

  return (
    <SelectPrimitive.Portal container={container}>
      <SelectPrimitive.Content sideOffset={6} {...contentProps} ref={forwardedRef} className={baseTw}>
        <ScrollArea type="auto" skipViewport>
          <SelectPrimitive.Viewport asChild>
            <VStack as={ScrollAreaViewport} UNSAFE_class={viewportTw} divider={<SelectSeparator />}>
              {children}
            </VStack>
          </SelectPrimitive.Viewport>
        </ScrollArea>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = SelectPrimitive.Content.displayName;

/**
 * ---
 * Group
 * ---
 */

type SelectGroupProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group> & BSelectGroupProps;

const SelectGroup = forwardRef<React.ElementRef<typeof SelectPrimitive.Group>, SelectGroupProps>(
  ({ label, children, ...props }, ref) => (
    <SelectPrimitive.Group ref={ref} {...props}>
      {label ? <SelectLabel>{label}</SelectLabel> : null}
      {children}
    </SelectPrimitive.Group>
  ),
);
SelectGroup.displayName = SelectPrimitive.Group.displayName;

/**
 * ---
 * Item
 * ---
 */

type SelectItemProps = Omit<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>, 'asChild'> & BSelectItemProps;

const SelectItem = polyRef<'div', SelectItemProps>(({ className, children, value: itemValue, ...props }, ref) => {
  const { slots, slotClasses, value } = useSelect();

  const isSelected = value === itemValue;
  const baseTw = slots.item({ class: [selectStaticClass('item'), className] });
  const indicatorTw = slots.itemIndicator({
    class: [selectStaticClass('itemIndicator'), slotClasses?.itemIndicator],
  });
  const contentTw = slots.itemContent({
    class: [selectStaticClass('itemContent'), slotClasses?.itemContent],
  });

  return (
    <SelectPrimitive.Item {...props} value={itemValue} className={baseTw} ref={ref}>
      <Box aria-hidden tw={indicatorTw}>
        {isSelected ? <Icon icon={faCheck} tw="text-[0.9em]" fw /> : null}
      </Box>

      <Box tw={contentTw}>
        <SelectPrimitive.ItemText className={contentTw}>{children}</SelectPrimitive.ItemText>
      </Box>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = SelectPrimitive.Item.displayName;

/**
 * ---
 * Label
 * ---
 */

const SelectLabel = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => {
  const { slots, slotClasses } = useSelect();

  const baseTw = slots.label({ class: [selectStaticClass('label'), className, slotClasses?.label] });

  return <SelectPrimitive.Label ref={ref} className={baseTw} {...props} />;
});
SelectLabel.displayName = SelectPrimitive.Label.displayName;

/**
 * ---
 * Separator
 * ---
 */

const SelectSeparator = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => {
  const { slots, slotClasses } = useSelect();

  const baseTw = slots.separator({ class: [selectStaticClass('separator'), className, slotClasses?.separator] });

  return <SelectPrimitive.Separator ref={ref} className={baseTw} {...props} />;
});
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

/**
 * ---
 * Icon
 * ---
 */

const SelectIcon = ({ ...props }: IconProps) => {
  const { slots, slotClasses } = useSelect();

  const baseTw = slots.itemIcon({ class: [selectStaticClass('itemIcon'), slotClasses?.itemIcon] });

  return (
    <Box aria-hidden tw={baseTw}>
      <Icon {...props} fw />
    </Box>
  );
};
SelectIcon.displayName = 'SelectIcon';

export { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectRoot, SelectSeparator, SelectTrigger };
