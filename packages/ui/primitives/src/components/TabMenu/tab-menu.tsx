'use client';

import type { TabMenuProps as BTabMenuProps, TabMenuTriggerProps as BTabMenuTriggerProps } from '@supastack/ui-styles';
import { splitPropsVariants, tabMenuStaticClass, tabMenuStyle } from '@supastack/ui-styles';
import * as React from 'react';

import { polyRef } from '../../index.ts';
import { TabMenuProvider, useTabMenu } from './context.tsx';

type TabMenuElement = React.ElementRef<'div'>;
type TabMenuProps = BTabMenuProps & {
  children: React.ReactNode;
};

const TabMenu = React.forwardRef<TabMenuElement, TabMenuProps>((originalProps, forwardedRef) => {
  const [props, variantProps] = splitPropsVariants(originalProps, tabMenuStyle.variantKeys);

  const { tw, slotClasses, UNSAFE_class, ...rootProps } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const slots = React.useMemo(() => tabMenuStyle(variantProps), [...Object.values(variantProps)]);
  const listTw = slots.list({ class: [tabMenuStaticClass('list'), tw, UNSAFE_class] });

  return (
    <TabMenuProvider value={{ slots, slotClasses }}>
      <div {...rootProps} ref={forwardedRef} className={listTw} />
    </TabMenuProvider>
  );
});

TabMenu.displayName = 'TabMenu';

type TabMenuTriggerProps = BTabMenuTriggerProps & {
  children: React.ReactNode;
};

const TabMenuTrigger = polyRef<'div', TabMenuTriggerProps>((props, forwardedRef) => {
  const { as: As = 'div', children, tw, UNSAFE_class, ...triggerProps } = props;
  const { slots, slotClasses } = useTabMenu();

  const triggerTw = slots.trigger({
    class: [tabMenuStaticClass('trigger'), tw, UNSAFE_class, slotClasses?.trigger],
  });
  const triggerInnerTw = slots.triggerInner({ class: [tabMenuStaticClass('triggerInner'), slotClasses?.triggerInner] });
  const triggerInnerHiddenTw = slots.triggerInnerHidden({
    class: [tabMenuStaticClass('triggerInnerHidden'), slotClasses?.triggerInnerHidden],
  });

  return (
    <As tabIndex={0} {...triggerProps} ref={forwardedRef} className={triggerTw}>
      <span className={triggerInnerTw}>{children}</span>
      <span className={triggerInnerHiddenTw}>{children}</span>
    </As>
  );
});

TabMenuTrigger.displayName = 'TabMenuTrigger';

export { TabMenu, TabMenuTrigger };
