'use client';

import * as BaseTabs from '@radix-ui/react-tabs';
import type {
  TabsContentProps as BTabsContentProps,
  TabsListProps as BTabsListProps,
  TabsProps as BTabsProps,
  TabsTriggerProps as BTabsTriggerProps,
} from '@supastack/ui-styles';
import { splitPropsVariants, tabsStaticClass, tabsStyle } from '@supastack/ui-styles';
import * as React from 'react';
import { useMemo } from 'react';

import { TabsProvider, useTabs } from './context.tsx';

type TabsRootElement = React.ElementRef<typeof BaseTabs.Root>;
type TabsRootProps = React.ComponentPropsWithoutRef<typeof BaseTabs.Root> & BTabsProps;

const TabsRoot = React.forwardRef<TabsRootElement, TabsRootProps>((originalProps, forwardedRef) => {
  const [props, variantProps] = splitPropsVariants(originalProps, tabsStyle.variantKeys);

  const { className, tw, slotClasses, UNSAFE_class, ...rootProps } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const slots = useMemo(() => tabsStyle(variantProps), [...Object.values(variantProps)]);
  const baseTw = slots.base({ class: [tabsStaticClass('base'), tw, UNSAFE_class, className] });

  return (
    <TabsProvider value={{ slots, slotClasses }}>
      <BaseTabs.Root {...rootProps} ref={forwardedRef} className={baseTw} />
    </TabsProvider>
  );
});
TabsRoot.displayName = 'TabsRoot';

type TabsListElement = React.ElementRef<typeof BaseTabs.List>;
type TabsListProps = React.ComponentPropsWithoutRef<typeof BaseTabs.List> & BTabsListProps;

const TabsList = React.forwardRef<TabsListElement, TabsListProps>(
  ({ tw, UNSAFE_class, className, ...props }, forwardedRef) => {
    const { slots, slotClasses } = useTabs();

    const listTw = slots.list({ class: [tabsStaticClass('list'), tw, UNSAFE_class, className, slotClasses?.list] });

    return <BaseTabs.List {...props} ref={forwardedRef} className={listTw} />;
  },
);

TabsList.displayName = 'TabsList';

type TabsTriggerElement = React.ElementRef<typeof BaseTabs.Trigger>;
type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof BaseTabs.Trigger> & BTabsTriggerProps;

const TabsTrigger = React.forwardRef<TabsTriggerElement, TabsTriggerProps>((props, forwardedRef) => {
  const { className, children, tw, UNSAFE_class, ...triggerProps } = props;
  const { slots, slotClasses } = useTabs();

  const triggerTw = slots.trigger({
    class: [tabsStaticClass('trigger'), tw, UNSAFE_class, className, slotClasses?.trigger],
  });
  const triggerInnerTw = slots.triggerInner({ class: [tabsStaticClass('triggerInner'), slotClasses?.triggerInner] });
  const triggerInnerHiddenTw = slots.triggerInnerHidden({
    class: [tabsStaticClass('triggerInnerHidden'), slotClasses?.triggerInnerHidden],
  });

  return (
    <BaseTabs.Trigger {...triggerProps} ref={forwardedRef} className={triggerTw}>
      <span className={triggerInnerTw}>{children}</span>
      <span className={triggerInnerHiddenTw}>{children}</span>
    </BaseTabs.Trigger>
  );
});

TabsTrigger.displayName = 'TabsTrigger';

type TabsContentElement = React.ElementRef<typeof BaseTabs.Content>;
type TabsContentProps = React.ComponentPropsWithoutRef<typeof BaseTabs.Content> & BTabsContentProps;

const TabsContent = React.forwardRef<TabsContentElement, TabsContentProps>(
  ({ tw, UNSAFE_class, className, ...props }, forwardedRef) => {
    const { slots, slotClasses } = useTabs();

    const contentTw = slots.content({
      class: [tabsStaticClass('content'), tw, UNSAFE_class, className, slotClasses?.content],
    });

    return <BaseTabs.Content {...props} ref={forwardedRef} className={contentTw} />;
  },
);

TabsContent.displayName = 'TabsContent';

export { TabsContent, TabsList, TabsRoot, TabsTrigger };
