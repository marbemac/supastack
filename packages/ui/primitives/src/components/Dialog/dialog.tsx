'use client';

import * as BaseDialog from '@radix-ui/react-dialog';
import type {
  DialogCloseProps as BDialogCloseProps,
  DialogContentProps as BDialogContentProps,
  DialogDescriptionProps as BDialogDescriptionProps,
  DialogProps as BDialogProps,
  DialogTitleProps as BDialogTitleProps,
  DialogTriggerProps as BDialogTriggerProps,
} from '@supastack/ui-styles';
import { dialogStaticClass, dialogStyle, splitPropsVariants } from '@supastack/ui-styles';
import * as React from 'react';

import { BoxRef } from '../Box/index.ts';
import type { HeadingProps } from '../Heading/index.ts';
import { Heading } from '../Heading/index.ts';
import type { TextProps } from '../Text/index.ts';
import type { Text } from '../Text/index.ts';
import { DialogProvider, useDialog } from './context.tsx';

type DialogProps = Omit<React.ComponentPropsWithoutRef<typeof BaseDialog.Root>, 'modal' | 'asChild'> & BDialogProps;

const Dialog = React.forwardRef<React.ElementRef<typeof BaseDialog.Root>, DialogProps>(
  (originalProps, forwardedRef) => {
    const [props, variantProps] = splitPropsVariants(originalProps, dialogStyle.variantKeys);

    const { tw, slotClasses, UNSAFE_class, ...rootProps } = props;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const slots = React.useMemo(() => dialogStyle(variantProps), [...Object.values(variantProps)]);
    const baseTw = slots.base({ class: [dialogStaticClass('base'), tw, UNSAFE_class] });

    return (
      <DialogProvider value={{ slots, slotClasses }}>
        {/* @ts-expect-error ignore */}
        <BaseDialog.Root {...rootProps} ref={forwardedRef} className={baseTw} modal />
      </DialogProvider>
    );
  },
);
Dialog.displayName = BaseDialog.Root.displayName;

type DialogTriggerProps = Omit<React.ComponentPropsWithoutRef<typeof BaseDialog.Trigger>, 'asChild'> &
  BDialogTriggerProps;

const DialogTrigger = React.forwardRef<React.ElementRef<typeof BaseDialog.Trigger>, DialogTriggerProps>(
  (props, ref) => {
    const { className, tw, UNSAFE_class, ...triggerProps } = props;
    const { slots, slotClasses } = useDialog();

    const triggerTw = slots.trigger({
      class: [dialogStaticClass('trigger'), slotClasses?.trigger, UNSAFE_class, className, tw],
    });

    return <BaseDialog.Trigger ref={ref} className={triggerTw} asChild {...triggerProps} />;
  },
);
DialogTrigger.displayName = BaseDialog.Trigger.displayName;

type DialogContentProps = Omit<React.ComponentPropsWithoutRef<typeof BaseDialog.Content>, 'asChild'> &
  BDialogContentProps & {
    container?: React.ComponentProps<typeof BaseDialog.Portal>['container'];
  };

const DialogContent = React.forwardRef<React.ElementRef<typeof BaseDialog.Content>, DialogContentProps>(
  (props, ref) => {
    const { className, tw, UNSAFE_class, forceMount, container, ...contentProps } = props;
    const { slots, slotClasses } = useDialog();

    const contentTw = slots.content({
      class: [dialogStaticClass('content'), slotClasses?.content, UNSAFE_class, className, tw],
    });
    const overlayTw = slots.overlay({
      class: [dialogStaticClass('overlay'), slotClasses?.overlay],
    });

    return (
      <BaseDialog.Portal container={container} forceMount={forceMount}>
        <BaseDialog.Overlay className={overlayTw}>
          <BaseDialog.Content {...contentProps} ref={ref} className={contentTw} />
        </BaseDialog.Overlay>
      </BaseDialog.Portal>
    );
  },
);
DialogContent.displayName = BaseDialog.Content.displayName;

type DialogTitleElement = HTMLHeadingElement;
type DialogTitleProps = React.ComponentPropsWithoutRef<'h1'> & HeadingProps & BDialogTitleProps;

const DialogTitle = React.forwardRef<DialogTitleElement, DialogTitleProps>((props, ref) => {
  const { className, tw, UNSAFE_class, ...rest } = props;
  const { slots, slotClasses } = useDialog();

  const titleTw = slots.title({
    class: [dialogStaticClass('title'), slotClasses?.title, UNSAFE_class, className, tw],
  });

  return (
    <BaseDialog.Title asChild>
      <Heading size={5} trim="start" {...rest} className={titleTw} ref={ref} />
    </BaseDialog.Title>
  );
});
DialogTitle.displayName = BaseDialog.Title.displayName;

type DialogDescriptionElement = HTMLParagraphElement;
type DialogDescriptionProps = React.ComponentPropsWithoutRef<'p'> & TextProps & BDialogDescriptionProps;

const DialogDescription = React.forwardRef<DialogDescriptionElement, DialogDescriptionProps>((props, ref) => {
  const { tw, UNSAFE_class, ...rest } = props;
  const { slots, slotClasses } = useDialog();

  const descriptionTw = slots.description({
    class: [dialogStaticClass('description'), slotClasses?.description, UNSAFE_class, tw],
  });

  return (
    <BaseDialog.Description asChild>
      <BoxRef {...rest} UNSAFE_class={descriptionTw} ref={ref} />
    </BaseDialog.Description>
  );
});
DialogDescription.displayName = BaseDialog.Description.displayName;

type DialogCloseElement = React.ElementRef<typeof BaseDialog.Close>;
type DialogCloseProps = React.ComponentPropsWithoutRef<typeof Text> & BDialogCloseProps;

const DialogClose = React.forwardRef<DialogCloseElement, DialogCloseProps>((props, ref) => {
  const { tw, UNSAFE_class, ...rest } = props;
  const { slots, slotClasses } = useDialog();

  const closeTw = slots.close({
    class: [dialogStaticClass('close'), slotClasses?.close, UNSAFE_class, tw],
  });

  return <BaseDialog.Close {...rest} asChild ref={ref} className={closeTw} />;
});
DialogClose.displayName = BaseDialog.Close.displayName;

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger };

export type {
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
};
