'use client';

import * as BaseAccordion from '@radix-ui/react-accordion';
import type {
  AccordionContentProps as BAccordionContentProps,
  AccordionItemProps as BAccordionItemProps,
  AccordionProps as BAccordionProps,
  AccordionTriggerProps as BAccordionTriggerProps,
} from '@supastack/ui-styles';
import { accordionStaticClass, accordionStyle, splitPropsVariants, tx } from '@supastack/ui-styles';
import * as React from 'react';

import { Icon } from '../Icon/index.ts';
import { AccordionProvider, useAccordion } from './context.tsx';

const Accordion = React.forwardRef<
  React.ElementRef<typeof BaseAccordion.Root>,
  React.ComponentPropsWithoutRef<typeof BaseAccordion.Root> & BAccordionProps
>((originalProps, forwardedRef) => {
  const [props, variantProps] = splitPropsVariants(originalProps, accordionStyle.variantKeys);

  const { className, tw, slotClasses, UNSAFE_class, type, ...rootProps } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const slots = React.useMemo(() => accordionStyle(variantProps), [...Object.values(variantProps)]);
  const baseTw = slots.base({ class: [accordionStaticClass('base'), tw, UNSAFE_class, className] });

  return (
    <AccordionProvider value={{ slots, slotClasses }}>
      {/* @ts-expect-error ignore */}
      <BaseAccordion.Root {...rootProps} ref={forwardedRef} className={baseTw} />
    </AccordionProvider>
  );
});
Accordion.displayName = BaseAccordion.Root.displayName;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof BaseAccordion.Item>,
  Omit<React.ComponentPropsWithoutRef<typeof BaseAccordion.Item>, 'asChild'> & BAccordionItemProps
>((props, ref) => {
  const { className, tw, UNSAFE_class, ...itemProps } = props;
  const { slots, slotClasses } = useAccordion();

  const itemTw = slots.item({
    class: [accordionStaticClass('item'), slotClasses?.item, UNSAFE_class, className, tw],
  });

  return <BaseAccordion.Item ref={ref} className={itemTw} {...itemProps} />;
});
AccordionItem.displayName = BaseAccordion.Item.displayName;

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof BaseAccordion.Trigger>,
  Omit<React.ComponentPropsWithoutRef<typeof BaseAccordion.Trigger>, 'asChild'> & BAccordionTriggerProps
>((props, ref) => {
  const { className, tw, UNSAFE_class, children, ...triggerProps } = props;
  const { slots, slotClasses } = useAccordion();

  const triggerTw = slots.trigger({
    class: [accordionStaticClass('trigger'), slotClasses?.trigger, UNSAFE_class, className, tw],
  });
  const iconTw = slots.triggerIcon({
    class: [accordionStaticClass('triggerIcon'), slotClasses?.triggerIcon],
  });

  return (
    <BaseAccordion.Header className={tx('flex')}>
      <BaseAccordion.Trigger ref={ref} className={triggerTw} {...triggerProps}>
        {children}

        <Icon icon="chevron-down" tw={iconTw} />
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
});
AccordionTrigger.displayName = BaseAccordion.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof BaseAccordion.Content>,
  Omit<React.ComponentPropsWithoutRef<typeof BaseAccordion.Content>, 'asChild'> & BAccordionContentProps
>((props, ref) => {
  const { className, tw, UNSAFE_class, style, ...contentProps } = props;
  const { slots, slotClasses } = useAccordion();

  const contentTw = slots.content({
    class: [accordionStaticClass('content'), slotClasses?.content, UNSAFE_class, className, tw],
  });

  return (
    <BaseAccordion.Content
      ref={ref}
      className={contentTw}
      style={{
        // @ts-expect-error assigning a css variable is fine but typings complain
        '--content-height': 'var(--radix-accordion-content-height)',
        ...style,
      }}
      {...contentProps}
    />
  );
});
AccordionContent.displayName = BaseAccordion.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
