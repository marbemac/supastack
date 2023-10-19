'use client';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import type { ScrollAreaProps, ScrollbarProps } from '@supastack/ui-styles';
import { scrollAreaStaticClass, scrollAreaStyle, scrollbarStaticClass, scrollbarStyle } from '@supastack/ui-styles';
import * as React from 'react';

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & ScrollAreaProps
>(({ className, children, tw, slotClasses, ...props }, ref) => {
  const slots = React.useMemo(() => scrollAreaStyle(), []);
  const baseTw = slots.base({ class: [scrollAreaStaticClass('base'), tw, className] });
  const viewportTw = slots.viewport({ class: [scrollAreaStaticClass('viewport'), slotClasses?.viewport] });

  return (
    <ScrollAreaPrimitive.Root ref={ref} className={baseTw} {...props}>
      <ScrollAreaPrimitive.Viewport className={viewportTw}>{children}</ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & ScrollbarProps
>(({ className, orientation = 'vertical', tw, slotClasses, ...props }, ref) => {
  const slots = React.useMemo(() => scrollbarStyle({ orientation }), [orientation]);
  const baseTw = slots.base({ class: [scrollbarStaticClass('base'), tw, className] });
  const thumbTw = slots.thumb({ class: [scrollbarStaticClass('thumb'), slotClasses?.thumb] });

  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar ref={ref} orientation={orientation} className={baseTw} {...props}>
      <ScrollAreaPrimitive.ScrollAreaThumb className={thumbTw} />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
});
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
