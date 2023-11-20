'use client';

import { faCheck, faChevronRight, faCircle } from '@fortawesome/free-solid-svg-icons';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import type {
  DropdownMenuCheckboxItemProps as BDropdownMenuCheckboxItemProps,
  DropdownMenuContentProps as BDropdownMenuContentProps,
  DropdownMenuGroupProps as BDropdownMenuGroupProps,
  DropdownMenuItemProps as BDropdownMenuItemProps,
  DropdownMenuRadioGroupProps as BDropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps as BDropdownMenuRadioItemProps,
} from '@supastack/ui-styles';
import { dropdownMenuStaticClass, dropdownMenuStyle } from '@supastack/ui-styles';
import * as React from 'react';

import { polyRef } from '../../utils/forward-ref.ts';
import { Box } from '../Box/index.ts';
import type { IconProps } from '../Icon/index.ts';
import { Icon } from '../Icon/index.ts';
import { ScrollArea } from '../ScrollArea/index.ts';
import { VStack } from '../Stack/index.ts';
import { DropdownGroupProvider, DropdownMenuProvider, useDropdownGroup, useDropdownMenu } from './context.tsx';

/**
 * ---
 * Root
 * ---
 */

const DropdownMenuRoot = DropdownMenuPrimitive.Root;

/**
 * ---
 * Trigger
 * ---
 */

type DropdownMenuTriggerElement = React.ElementRef<typeof DropdownMenuPrimitive.Trigger>;
type DropdownMenuTriggerProps = Omit<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>, 'asChild'>;
const DropdownMenuTrigger = React.forwardRef<DropdownMenuTriggerElement, DropdownMenuTriggerProps>(
  (props, forwardedRef) => <DropdownMenuPrimitive.Trigger {...props} ref={forwardedRef} asChild />,
);
DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

/**
 * ---
 * Content
 * ---
 */

type DropdownMenuContentElement = React.ElementRef<typeof DropdownMenuPrimitive.Content>;
type DropdownMenuContentProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> &
  BDropdownMenuContentProps & {
    container?: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>['container'];
  };
const DropdownMenuContent = React.forwardRef<DropdownMenuContentElement, DropdownMenuContentProps>(
  (props, forwardedRef) => {
    const { className, children, container, forceMount, inset, tw, slotClasses, ...contentProps } = props;

    const slots = React.useMemo(() => dropdownMenuStyle({ inset }), [inset]);
    const baseTw = slots.base({ class: [dropdownMenuStaticClass('base'), tw, className] });
    const viewportTw = slots.baseViewport({
      class: [dropdownMenuStaticClass('baseViewport'), slotClasses?.baseViewport],
    });

    return (
      <DropdownMenuPrimitive.Portal container={container} forceMount={forceMount}>
        <DropdownMenuPrimitive.Content
          align="start"
          sideOffset={6}
          collisionPadding={10}
          loop
          {...contentProps}
          ref={forwardedRef}
          className={baseTw}
        >
          <ScrollArea type="auto">
            <DropdownMenuProvider
              value={React.useMemo(() => ({ inset, slots, slotClasses }), [inset, slots, slotClasses])}
            >
              <VStack UNSAFE_class={viewportTw} divider={<DropdownMenuSeparator />}>
                {children}
              </VStack>
            </DropdownMenuProvider>
          </ScrollArea>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    );
  },
);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

/**
 * ---
 * Submenu
 * ---
 */

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

/**
 * ---
 * Submenu trigger
 * ---
 */

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  Omit<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>, 'asChild'>
>(({ className, children, ...props }, ref) => {
  const { slots, slotClasses } = useDropdownMenu();

  const baseTw = slots.subtrigger({ class: [dropdownMenuStaticClass('subtrigger'), className] });
  const contentTw = slots.itemContent({ class: [dropdownMenuStaticClass('itemContent'), slotClasses?.itemContent] });
  const iconTw = slots.subtriggerIcon({
    class: [dropdownMenuStaticClass('subtriggerIcon'), slotClasses?.subtriggerIcon],
  });

  return (
    <DropdownMenuPrimitive.SubTrigger ref={ref} className={baseTw} {...props}>
      <Box tw={contentTw}>{children}</Box>
      <Icon tw={iconTw} icon={faChevronRight} />
    </DropdownMenuPrimitive.SubTrigger>
  );
});
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

/**
 * ---
 * Submenu content
 * ---
 */

type DropdownMenuSubContentElement = React.ElementRef<typeof DropdownMenuPrimitive.SubContent>;
type DropdownMenuSubContentProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> &
  BDropdownMenuContentProps & {
    container?: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>['container'];
  };
const DropdownMenuSubContent = React.forwardRef<DropdownMenuSubContentElement, DropdownMenuSubContentProps>(
  ({ className, inset, children, container, forceMount, tw, slotClasses, ...contentProps }, forwardedRef) => {
    const slots = React.useMemo(() => dropdownMenuStyle({ inset }), [inset]);
    const baseTw = slots.subContent({ class: [dropdownMenuStaticClass('subContent'), tw, className] });
    const viewportTw = slots.subContentViewport({
      class: [dropdownMenuStaticClass('subContentViewport'), slotClasses?.subContentViewport],
    });

    return (
      <DropdownMenuPrimitive.Portal container={container} forceMount={forceMount}>
        <DropdownMenuPrimitive.SubContent
          sideOffset={4}
          alignOffset={-5}
          collisionPadding={10}
          loop
          {...contentProps}
          ref={forwardedRef}
          className={baseTw}
        >
          <ScrollArea type="auto">
            <DropdownMenuProvider value={React.useMemo(() => ({ inset, slots }), [inset, slots])}>
              <VStack UNSAFE_class={viewportTw} divider={<DropdownMenuSeparator />}>
                {children}
              </VStack>
            </DropdownMenuProvider>
          </ScrollArea>
        </DropdownMenuPrimitive.SubContent>
      </DropdownMenuPrimitive.Portal>
    );
  },
);
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

/**
 * ---
 * Item
 * ---
 */

type DropdownMenuItemProps = Omit<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>, 'asChild'> &
  BDropdownMenuItemProps<React.ReactElement>;

const DropdownMenuItem = polyRef<'div', DropdownMenuItemProps>(
  ({ className, icon, shortcut, children, tw, as: As = 'div', preventCloseOnSelect, onSelect, ...props }, ref) => {
    const { slots, slotClasses } = useDropdownMenu();

    const baseTw = slots.item({ class: [dropdownMenuStaticClass('item'), tw, className] });
    const contentTw = slots.itemContent({ class: [dropdownMenuStaticClass('itemContent'), slotClasses?.itemContent] });

    const handleSelect = React.useCallback(
      (evt: Event) => {
        if (preventCloseOnSelect) evt.preventDefault();
        if (onSelect) onSelect(evt);
      },
      [onSelect, preventCloseOnSelect],
    );

    return (
      <DropdownMenuPrimitive.Item ref={ref} asChild onSelect={handleSelect} {...props}>
        <As className={baseTw}>
          {icon ? <DropdownMenuIcon icon={icon} /> : null}
          <div className={contentTw}>{children}</div>
          {shortcut ? <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut> : null}
        </As>
      </DropdownMenuPrimitive.Item>
    );
  },
);
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

/**
 * ---
 * Checkbox item
 * ---
 */

type DropdownMenuCheckboxItemProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> &
  BDropdownMenuCheckboxItemProps;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(({ className, children, checked, shortcut, tw, onSelect, ...props }, ref) => {
  const { slots, slotClasses } = useDropdownMenu();
  const { preventCloseOnSelect } = useDropdownGroup();

  const baseTw = slots.checkboxItem({ class: [dropdownMenuStaticClass('checkboxItem'), tw, className] });
  const contentTw = slots.itemContent({ class: [dropdownMenuStaticClass('itemContent'), slotClasses?.itemContent] });
  const indicatorTw = slots.itemIndicator({
    class: [dropdownMenuStaticClass('itemIndicator'), slotClasses?.itemIndicator],
  });

  const handleSelect = React.useCallback(
    (evt: Event) => {
      if (preventCloseOnSelect) evt.preventDefault();
      if (onSelect) onSelect(evt);
    },
    [onSelect, preventCloseOnSelect],
  );

  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={baseTw}
      checked={checked}
      onSelect={handleSelect}
      {...props}
    >
      <Box tw={indicatorTw}>
        <DropdownMenuPrimitive.ItemIndicator>
          <Icon icon={faCheck} tw="text-[0.9em]" fw />
        </DropdownMenuPrimitive.ItemIndicator>
      </Box>

      <Box tw={contentTw}>{children}</Box>

      {shortcut ? <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut> : null}
    </DropdownMenuPrimitive.CheckboxItem>
  );
});
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

/**
 * ---
 * Radio item
 * ---
 */

type DropdownMenuRadioItemProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> &
  BDropdownMenuRadioItemProps;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  DropdownMenuRadioItemProps
>(({ className, children, tw, onSelect, ...props }, ref) => {
  const { slots, slotClasses } = useDropdownMenu();
  const { preventCloseOnSelect } = useDropdownGroup();

  const baseTw = slots.radioItem({ class: [dropdownMenuStaticClass('radioItem'), tw, className] });
  const contentTw = slots.itemContent({ class: [dropdownMenuStaticClass('itemContent'), slotClasses?.itemContent] });
  const indicatorTw = slots.itemIndicator({
    class: [dropdownMenuStaticClass('itemIndicator'), slotClasses?.itemIndicator],
  });

  const handleSelect = React.useCallback(
    (evt: Event) => {
      if (preventCloseOnSelect) evt.preventDefault();
      if (onSelect) onSelect(evt);
    },
    [onSelect, preventCloseOnSelect],
  );

  return (
    <DropdownMenuPrimitive.RadioItem ref={ref} className={baseTw} onSelect={handleSelect} {...props}>
      <Box tw={indicatorTw}>
        <DropdownMenuPrimitive.ItemIndicator>
          <Icon icon={faCircle} tw="ml-1 h-1.5 w-1.5" fw />
        </DropdownMenuPrimitive.ItemIndicator>
      </Box>

      <Box tw={contentTw}>{children}</Box>
    </DropdownMenuPrimitive.RadioItem>
  );
});
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

/**
 * ---
 * Label
 * ---
 */

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => {
  const { slots, slotClasses } = useDropdownMenu();

  const baseTw = slots.label({ class: [dropdownMenuStaticClass('label'), className, slotClasses?.label] });

  return <DropdownMenuPrimitive.Label ref={ref} className={baseTw} {...props} />;
});
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

/**
 * ---
 * Separator
 * ---
 */

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => {
  const { slots, slotClasses } = useDropdownMenu();

  const baseTw = slots.separator({ class: [dropdownMenuStaticClass('separator'), className, slotClasses?.separator] });

  return <DropdownMenuPrimitive.Separator ref={ref} className={baseTw} {...props} />;
});
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

/**
 * ---
 * Group
 * ---
 */

type DropdownMenuGroupProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group> &
  BDropdownMenuGroupProps;

const DropdownMenuGroup = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Group>,
  DropdownMenuGroupProps
>(({ label, children, preventCloseOnSelect, ...props }, ref) => (
  <DropdownGroupProvider value={{ preventCloseOnSelect }}>
    <DropdownMenuPrimitive.Group ref={ref} {...props}>
      {label ? <DropdownMenuLabel>{label}</DropdownMenuLabel> : null}
      {children}
    </DropdownMenuPrimitive.Group>
  </DropdownGroupProvider>
));
DropdownMenuGroup.displayName = DropdownMenuPrimitive.Group.displayName;

/**
 * ---
 * Radio group
 * ---
 */

type DropdownMenuRadioGroupProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioGroup> &
  BDropdownMenuRadioGroupProps;

const DropdownMenuRadioGroup = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioGroup>,
  DropdownMenuRadioGroupProps
>(({ label, children, preventCloseOnSelect, ...props }, ref) => (
  <DropdownGroupProvider value={{ preventCloseOnSelect }}>
    <DropdownMenuPrimitive.RadioGroup ref={ref} {...props}>
      {label ? <DropdownMenuLabel>{label}</DropdownMenuLabel> : null}
      {children}
    </DropdownMenuPrimitive.RadioGroup>
  </DropdownGroupProvider>
));
DropdownMenuRadioGroup.displayName = DropdownMenuPrimitive.RadioGroup.displayName;

/**
 * ---
 * Icon
 * ---
 */

const DropdownMenuIcon = ({ ...props }: IconProps) => {
  const { slots, slotClasses } = useDropdownMenu();

  const baseTw = slots.itemIcon({ class: [dropdownMenuStaticClass('itemIcon'), slotClasses?.itemIcon] });

  return (
    <Box tw={baseTw}>
      <Icon {...props} fw />
    </Box>
  );
};
DropdownMenuIcon.displayName = 'DropdownMenuIcon';

/**
 * ---
 * Shortcut
 * ---
 */

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  const { slots, slotClasses } = useDropdownMenu();

  const baseTw = slots.shortcut({ class: [dropdownMenuStaticClass('shortcut'), className, slotClasses?.shortcut] });

  return <span className={baseTw} {...props} />;
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
