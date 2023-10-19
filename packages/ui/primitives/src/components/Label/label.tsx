'use client';

import * as BaseLabel from '@radix-ui/react-label';
import type { LabelProps as BLabelProps } from '@supastack/ui-styles';
import { labelStaticClass, labelStyle, splitPropsVariants } from '@supastack/ui-styles';
import { useMemo } from 'react';

import type { HTMLProps } from '../../types.ts';
import { forwardRef } from '../../utils/forward-ref.ts';

export type LabelRef = React.ElementRef<typeof BaseLabel.Root>;
export type LabelProps = BLabelProps & HTMLProps<'label'>;

export const Label = forwardRef<LabelRef, LabelProps>((props, ref) => {
  const [local, variantProps] = splitPropsVariants(props, labelStyle.variantKeys);

  const { UNSAFE_class, tw, ...others } = local;

  const slots = useMemo(
    () => labelStyle(variantProps),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...Object.values(variantProps)],
  );

  const baseTw = slots.base({ class: [labelStaticClass('base'), tw, UNSAFE_class] });

  return <BaseLabel.Root {...others} className={baseTw} ref={ref} />;
});
