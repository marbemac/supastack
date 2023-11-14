import type { ButtonGroupProps } from '@supastack/ui-styles';

import { createContext } from '../../utils/create-context.ts';

type ButtonGroupContext = Pick<
  ButtonGroupProps<React.ReactElement>,
  'size' | 'variant' | 'intent' | 'isAttached' | 'isDisabled'
>;

export const [ButtonGroupProvider, useButtonGroupContext] = createContext<ButtonGroupContext>({
  name: 'ButtonGroupContext',
  strict: false,
});
