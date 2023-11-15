'use client';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import type { ScrollAreaProps, ScrollbarProps } from '@supastack/ui-styles';
import { scrollAreaStaticClass, scrollAreaStyle, scrollbarStaticClass, scrollbarStyle } from '@supastack/ui-styles';
import * as React from 'react';

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> &
    ScrollAreaProps & {
      // set to true if caller is handling rendering ScrollViewport (see Select for example use case)
      skipViewport?: boolean;
    }
>(({ className, children, tw, skipViewport, ...props }, ref) => {
  const slots = React.useMemo(() => scrollAreaStyle(), []);
  const baseTw = slots.base({ class: [scrollAreaStaticClass('base'), tw, className] });

  return (
    <ScrollAreaPrimitive.Root ref={ref} className={baseTw} {...props}>
      {skipViewport ? children : <ScrollViewport>{children}</ScrollViewport>}
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollViewport = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Viewport>
>(({ className, children, ...props }, ref) => {
  const slots = React.useMemo(() => scrollAreaStyle(), []);
  const viewportTw = slots.viewport({ class: [scrollAreaStaticClass('viewport'), className] });

  return (
    <ScrollAreaPrimitive.Viewport className={viewportTw} ref={ref} {...props}>
      {children}
    </ScrollAreaPrimitive.Viewport>
  );
});
ScrollViewport.displayName = ScrollAreaPrimitive.Viewport.displayName;

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

export { ScrollArea, ScrollBar, ScrollViewport };
