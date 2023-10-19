'use client';

import * as BaseTooltip from '@radix-ui/react-tooltip';
import type { TooltipProps as BTooltipProps } from '@supastack/ui-styles';
import { splitPropsVariants, tooltipStaticClass, tooltipStyle } from '@supastack/ui-styles';
import { forwardRef, useMemo } from 'react';

import { Text } from '../Text/text.tsx';

type TooltipElement = React.ElementRef<typeof BaseTooltip.Content>;

export type TooltipProps = BTooltipProps<React.ReactNode> &
  Pick<BaseTooltip.TooltipProps, 'defaultOpen' | 'delayDuration'> &
  Pick<BaseTooltip.TooltipPortalProps, 'forceMount' | 'container'> &
  Pick<BaseTooltip.TooltipContentProps, 'side' | 'align'>;

export const Tooltip = forwardRef<TooltipElement, TooltipProps>((originalProps, ref) => {
  const [props, variantProps] = splitPropsVariants(originalProps, tooltipStyle.variantKeys);

  const {
    tw,
    UNSAFE_class,
    slotClasses,
    children,
    content,
    defaultOpen,
    delayDuration,
    forceMount,
    container,
    ...contentProps
  } = props;

  const rootProps = { defaultOpen, delayDuration };
  const portalProps = { forceMount, container };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const slots = useMemo(() => tooltipStyle(variantProps), [...Object.values(variantProps)]);

  const baseTw = slots.base({ class: [tooltipStaticClass('base'), tw, UNSAFE_class] });
  const textTw = slots.text({ class: [tooltipStaticClass('text'), slotClasses?.text] });
  const arrowTw = slots.arrow({ class: [tooltipStaticClass('arrow'), slotClasses?.arrow] });

  return (
    <BaseTooltip.Root {...rootProps}>
      <BaseTooltip.Trigger asChild>{children}</BaseTooltip.Trigger>
      <BaseTooltip.Portal {...portalProps}>
        <BaseTooltip.Content sideOffset={4} collisionPadding={10} {...contentProps} ref={ref} className={baseTw}>
          <Text as="p" tw={textTw}>
            {content}
          </Text>

          <BaseTooltip.Arrow className={arrowTw} />
        </BaseTooltip.Content>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
});

Tooltip.displayName = 'UI.Tooltip';
