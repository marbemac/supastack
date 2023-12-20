'use client';

import type { ButtonGroupProps as BButtonGroupProps } from '@supastack/ui-styles';
import { buttonGroupStaticClass, buttonGroupStyle, splitPropsVariants } from '@supastack/ui-styles';
import { useMemo } from 'react';

import { HStack } from '../Stack/stack.tsx';
import { ButtonGroupProvider } from './button-group-context.ts';

export type ButtonGroupProps = BButtonGroupProps<React.ReactElement>;

export const ButtonGroup = (props: ButtonGroupProps) => {
  const [local, variantProps] = splitPropsVariants(props, buttonGroupStyle.variantKeys);

  const { UNSAFE_class, tw, spacing = 2, ...others } = local;

  const slots = useMemo(
    () => buttonGroupStyle(variantProps),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...Object.values(variantProps)],
  );

  const baseTw = slots.base({ class: [buttonGroupStaticClass('base'), tw, UNSAFE_class] });

  return (
    <ButtonGroupProvider value={others}>
      <HStack spacing={variantProps.isAttached ? undefined : spacing} UNSAFE_class={baseTw}>
        {props.children}
      </HStack>
    </ButtonGroupProvider>
  );
};
