import type { IconDefinition, IconLookup, IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { IconProps as BIconProps } from '@supastack/ui-styles';
import { iconStaticClass, iconStyle, splitPropsVariants } from '@supastack/ui-styles';
import { useMemo } from 'react';

import { Box } from '../Box/index.ts';
import { initLibrary } from './standard-library.ts';
import { FaSvg } from './svg-icon.tsx';

export type IconProps = BIconProps<React.ReactElement>;

export const DEFAULT_STYLE: IconPrefix = 'fas';

const IS_ELEMENT = '__ELEMENT__' as const;

export const Icon = (originalProps: IconProps) => {
  initLibrary();

  const [props, variantProps] = splitPropsVariants(originalProps, iconStyle.variantKeys);

  const { icon, UNSAFE_class, tw, ...rest } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const slots = useMemo(() => iconStyle(variantProps), [...Object.values(variantProps)]);

  const baseTw = slots.base({ class: [iconStaticClass('base'), tw, UNSAFE_class] });

  const iconProp = useMemo(() => normalizeIconArgs(icon, DEFAULT_STYLE), [icon]);
  const isComponentIcon = iconProp === IS_ELEMENT;
  const iconDefinition = isIconDefinition(iconProp)
    ? (iconProp as IconDefinition)
    : findIconDefinition(iconProp as any);

  if (iconDefinition) {
    return <FaSvg tw={baseTw} icon={iconDefinition} {...rest} />;
  }

  if (isComponentIcon) {
    return icon as React.ReactNode;
  }

  return (
    <Box
      tw={baseTw}
      UNSAFE_class={iconFACX({ ...(iconProp as any), ...variantProps })}
      as="i"
      role="img"
      aria-hidden
      {...rest}
    />
  );
};

type IconFACXProps = {
  prefix: IconPrefix;
  iconName: IconName;
  fw?: boolean;
  spin?: boolean;
  pulse?: boolean;
  ping?: boolean;
  bounce?: boolean;
};

const iconFACX = (props: IconFACXProps) => {
  return [
    props.prefix,
    `fa-${props.iconName}`,
    props.fw && 'fa-fw',
    props.spin && 'fa-spin',
    props.pulse && 'fa-pulse',
    props.ping && 'fa-ping',
    props.bounce && 'fa-bounce',
  ];
};

export function isIconDefinition(prop?: unknown): prop is IconDefinition {
  if (prop && typeof prop === 'object' && Object.prototype.hasOwnProperty.call(prop, 'icon')) return true;
  return false;
}

export function isIconProp(prop?: unknown): prop is IconProps['icon'] {
  if ((prop && typeof prop === 'string') || Array.isArray(prop)) return true;
  if (prop && typeof prop === 'object' && Object.prototype.hasOwnProperty.call(prop, 'iconName')) return true;
  return false;
}

// Adapted from https://github.com/FortAwesome/react-fontawesome/blob/master/src/utils/normalize-icon-args.js
// Adds defaultPrefix and adjusts to fix some typings issues
function normalizeIconArgs(
  icon: IconProps['icon'],
  defaultPrefix: IconPrefix = 'fas',
): IconLookup | IconDefinition | null | typeof IS_ELEMENT {
  // if the icon is null, there's nothing to do
  if (icon === null) {
    return null;
  }

  if (Array.isArray(icon)) {
    // use the first item as prefix, second as icon name
    return { prefix: icon[0], iconName: icon[1] };
  }

  // if the icon is an object and has a prefix and an icon name, return it
  // @ts-expect-error ignore
  if (typeof icon === 'object' && icon.iconName) {
    // @ts-expect-error ignore
    return icon;
  }

  // if it's a string, use it as the icon name
  if (typeof icon === 'string') {
    return { prefix: defaultPrefix, iconName: icon };
  }

  return IS_ELEMENT;
}
