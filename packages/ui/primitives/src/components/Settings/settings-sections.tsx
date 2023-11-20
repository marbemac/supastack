import type { StyleProps } from '@supastack/ui-styles';

import { VStack } from '../Stack/stack.tsx';

export type SettingsSectionsProps = StyleProps & {
  // Should be a list of SettingsSections components
  children: React.ReactNode;
};

export const SettingsSections = (props: SettingsSectionsProps) => {
  return <VStack spacing={10} {...props} />;
};
