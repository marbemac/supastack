import type { CardProps as BCardProps } from '@supastack/ui-styles';
import { cardStaticClass, cardStyle, splitPropsVariants } from '@supastack/ui-styles';
import { useMemo } from 'react';

import { polyRef } from '../../utils/forward-ref.ts';

export type CardProps = BCardProps<React.ReactNode> & {
  children: React.ReactNode;
};

export const Card = polyRef<'div', CardProps>((originalProps, ref) => {
  const [props, variantProps] = splitPropsVariants(originalProps, cardStyle.variantKeys);

  const { as: As = 'div', tw, UNSAFE_class, slotClasses, children, ...others } = props;

  /**
   * @TODO if button or link, it's interactive
   */
  const isInteractive = false;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const slots = useMemo(
    () => cardStyle({ ...variantProps, isInteractive }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...Object.values(variantProps), isInteractive],
  );

  const baseTw = slots.base({ class: [cardStaticClass('base'), tw, UNSAFE_class] });
  const innerTw = slots.inner({ class: [cardStaticClass('inner'), slotClasses?.inner] });

  return (
    <As ref={ref} className={baseTw} {...others}>
      <div className={innerTw}>{children}</div>
    </As>
  );
});
