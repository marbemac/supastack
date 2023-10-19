'use client';

import * as BaseAvatar from '@radix-ui/react-avatar';
import type { AvatarProps as BAvatarProps } from '@supastack/ui-styles';
import { avatarStaticClass, avatarStyle, splitPropsVariants } from '@supastack/ui-styles';
import { useMemo } from 'react';

import type { HTMLProps } from '../../types.ts';
import { forwardRef } from '../../utils/forward-ref.ts';

type BaseAvatarProps = HTMLProps<typeof BaseAvatar.Image>;
type BaseAvatarElement = React.ElementRef<typeof BaseAvatar.Image>;

export type AvatarProps = BAvatarProps<React.ReactNode> & BaseAvatarProps;

export const Avatar = forwardRef<BaseAvatarElement, AvatarProps>((originalProps, ref) => {
  const [props, variantProps] = splitPropsVariants(originalProps, avatarStyle.variantKeys);

  const { tw, UNSAFE_class, slotClasses, fallback, src, ...others } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const slots = useMemo(() => avatarStyle(variantProps), [...Object.values(variantProps)]);

  const baseTw = slots.base({ class: [avatarStaticClass('base'), tw, UNSAFE_class] });
  const imageTw = slots.image({ class: [avatarStaticClass('image'), slotClasses?.image] });
  const fallbackTw = slots.fallback({ class: [avatarStaticClass('fallback'), slotClasses?.fallback] });

  const singleLetter = variantProps.size === 'sm';
  const fallbackElem = typeof fallback === 'string' ? initials(fallback, singleLetter) : fallback;

  return (
    <BaseAvatar.Root className={baseTw}>
      {src ? <BaseAvatar.Image ref={ref} className={imageTw} src={src} {...others} /> : null}

      {fallbackElem ? (
        <BaseAvatar.Fallback className={fallbackTw} delayMs={src ? 600 : 0}>
          {fallbackElem}
        </BaseAvatar.Fallback>
      ) : null}
    </BaseAvatar.Root>
  );
});

function initials(name: string, single?: boolean) {
  const [first, second] = name.split(' ');

  // should not happen
  if (!first) return '!';

  if (single) {
    return first.charAt(0);
  }

  if (!second) {
    return first.slice(0, 2);
  }

  return `${first.charAt(0)}${second.charAt(0)}`;
}
