import type { FormProps, formStyle } from '@supastack/ui-styles';
import { createContext, useContext } from 'react';

type FormContextValue = Pick<FormProps, 'slotClasses'> & {
  slots: ReturnType<typeof formStyle>;
};

const FormContext = createContext<FormContextValue | null>(null);

export const FormProvider = FormContext.Provider;

export const useForm = () => {
  const ctx = useContext(FormContext);
  if (!ctx) {
    throw new Error('useForm must be used within a `FormProvider`');
  }

  return ctx;
};
