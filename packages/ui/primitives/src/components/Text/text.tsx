import type { TextProps as BTextProps } from '@supastack/ui-styles';
import { splitPropsVariants, textStaticClass, textStyle } from '@supastack/ui-styles';
import { useMemo } from 'react';
import type { OnlyAs } from 'react-polymorphed';

import { polyRef } from '../../utils/forward-ref.ts';

export type TextProps = BTextProps;

export const Text = polyRef<'span', TextProps, OnlyAs<'p' | 'div' | 'span'>>((originalProps, ref) => {
  const [props, variantProps] = splitPropsVariants(originalProps, textStyle.variantKeys);

  const { as: As = 'span', tw, UNSAFE_class, ...others } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const slots = useMemo(() => textStyle(variantProps), [...Object.values(variantProps)]);

  const baseTw = slots.base({ class: [textStaticClass('base'), tw, UNSAFE_class] });

  return <As {...others} ref={ref} className={baseTw} />;
});
