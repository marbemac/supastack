import type { StackProps as BStackProps } from '@supastack/ui-styles';
import { splitPropsVariants, stackStaticClass, stackStyle } from '@supastack/ui-styles';
import React, { useMemo } from 'react';

import { polyRef } from '../../utils/forward-ref.ts';
import { Box } from '../Box/index.ts';

export type StackProps = BStackProps<React.ReactNode> & {
  children: React.ReactNode;
};

/**
 * `Stack` makes it easy to stack elements together and apply a space between them.
 */
export const Stack = polyRef<'div', StackProps>((props, ref) => {
  const [local, variantProps] = splitPropsVariants(props, stackStyle.variantKeys);

  const { as: As = 'div', children, UNSAFE_class, slotClasses, divider, tw, ...others } = local;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const slots = useMemo(() => stackStyle(variantProps), [...Object.values(variantProps)]);

  const baseTw = slots.base({ class: [stackStaticClass('base'), tw, UNSAFE_class] });
  const dividerTw = slots.divider({ class: [stackStaticClass('divider'), slotClasses?.divider] });

  let clones = children;
  const hasDivider = !!divider;
  const childrenWithoutNulls = React.Children.toArray(children).filter(Boolean);
  if (childrenWithoutNulls && hasDivider) {
    const childCount = childrenWithoutNulls.length;
    clones = React.Children.map(childrenWithoutNulls, (child, index) => {
      const isLast = index + 1 === childCount;

      const clonedDivider =
        typeof divider === 'boolean' ? (
          <Box key="d" tw={dividerTw} />
        ) : (
          React.cloneElement(divider as any, { key: 'd' })
        );

      const _divider = isLast ? null : clonedDivider;

      return <React.Fragment key={index}>{[child, _divider]}</React.Fragment>;
    });
  }

  return (
    <As {...others} ref={ref} className={baseTw}>
      {clones}
    </As>
  );
});

export type FixedDirectionStackProps = Omit<StackProps, 'dir'>;

/**
 * `HStack` arranges its children in a horizontal line.
 */
export const HStack = polyRef<'div', FixedDirectionStackProps>((props, ref) => {
  return <Stack {...props} ref={ref} dir="horizontal" />;
});

/**
 * `VStack` arranges its children in a vertical line.
 */
export const VStack = polyRef<'div', FixedDirectionStackProps>((props, ref) => {
  return <Stack {...props} ref={ref} dir="vertical" />;
});
