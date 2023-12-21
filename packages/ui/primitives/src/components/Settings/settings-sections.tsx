import {
  settingSectionsStaticClass,
  settingSectionsStyle,
  type SettingsSectionsProps as BSettingsSectionsProps,
  splitPropsVariants,
} from '@supastack/ui-styles';
import { useMemo } from 'react';

import { Heading } from '../Heading/index.ts';
import { VStack } from '../Stack/index.ts';

export type SettingsSectionsProps = BSettingsSectionsProps<React.ReactNode>;

export const SettingsSections = (props: SettingsSectionsProps) => {
  const [local, variantProps] = splitPropsVariants(props, settingSectionsStyle.variantKeys);

  const { UNSAFE_class, tw, title, children, ...others } = local;

  const slots = useMemo(
    () => settingSectionsStyle(variantProps),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...Object.values(variantProps)],
  );

  const baseTw = slots.base({ class: [settingSectionsStaticClass('base'), tw, UNSAFE_class] });

  return (
    <VStack spacing={10} {...others} tw={baseTw}>
      {title && (
        <Heading size={7} as="h1">
          {title}
        </Heading>
      )}

      {children}
    </VStack>
  );
};
