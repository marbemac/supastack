import {
  settingSectionStaticClass,
  settingSectionStyle,
  type SettingsSectionProps as BSettingsSectionProps,
  splitPropsVariants,
} from '@supastack/ui-styles';
import { useMemo } from 'react';

import { Heading } from '../Heading/heading.tsx';
import { VStack } from '../Stack/stack.tsx';

export type SettingsSectionProps = BSettingsSectionProps<React.ReactNode>;

export const SettingsSection = (props: SettingsSectionProps) => {
  const [local, variantProps] = splitPropsVariants(props, settingSectionStyle.variantKeys);

  const { UNSAFE_class, tw, slotClasses, title, children, ...others } = local;

  const slots = useMemo(
    () => settingSectionStyle(variantProps),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...Object.values(variantProps)],
  );

  const baseTw = slots.base({ class: [settingSectionStaticClass('base'), tw, UNSAFE_class] });
  const titleTw = slots.title({ class: [settingSectionStaticClass('title'), slotClasses?.title] });
  const contentTw = slots.content({ class: [settingSectionStaticClass('content'), slotClasses?.content] });

  return (
    <VStack spacing={3} tw={baseTw} {...others}>
      <Heading size={5} as="h2" tw={titleTw}>
        {title}
      </Heading>

      <VStack divider tw={contentTw}>
        {children}
      </VStack>
    </VStack>
  );
};
