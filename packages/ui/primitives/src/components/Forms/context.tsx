import type { FormProps, formStyle } from '@supastack/ui-styles';

import { createContext } from '../../utils/create-context.ts';

type FormContextValue = Pick<FormProps, 'slotClasses'> & {
  slots: ReturnType<typeof formStyle>;
};

export const [FormProvider, useForm] = createContext<FormContextValue>({
  name: 'FormContext',
  strict: true,
});
