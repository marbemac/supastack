import type { StyleProps } from '@supastack/ui-styles';

import { Heading } from '../Heading/heading.tsx';
import { VStack } from '../Stack/stack.tsx';

export type SettingsSectionProps = StyleProps & {
  title: string;

  isDangerZone?: boolean;

  // Should be a list of SettingsRow components
  children: React.ReactNode;
};

export const SettingsSection = ({ title, isDangerZone, children, ...rest }: SettingsSectionProps) => {
  return (
    <VStack spacing={3} {...rest}>
      <Heading size={5} as="h2" tw={isDangerZone ? 'text-danger' : undefined}>
        {title}
      </Heading>

      <VStack divider tw={['-mx-2 rounded-lg p-1', isDangerZone && 'border border-danger-line-1']}>
        {children}
      </VStack>
    </VStack>
  );
};
