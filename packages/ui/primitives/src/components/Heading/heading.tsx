import type { HeadingProps as BHeadingProps } from '@supastack/ui-styles';
import { headingStaticClass, headingStyle, splitPropsVariants } from '@supastack/ui-styles';
import { useMemo } from 'react';

import { polyRef } from '../../utils/forward-ref.ts';

export type HeadingProps = BHeadingProps;

export const Heading = polyRef<'h1', HeadingProps>((originalProps, ref) => {
  const [props, variantProps] = splitPropsVariants(originalProps, headingStyle.variantKeys);

  const { as: As = 'h1', tw, UNSAFE_class, ...others } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const slots = useMemo(() => headingStyle(variantProps), [...Object.values(variantProps)]);

  const baseTw = slots.base({ class: [headingStaticClass('base'), tw, UNSAFE_class] });

  return <As {...others} ref={ref} className={baseTw} />;
});
