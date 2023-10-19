import { type FormProps as BFormProps, formStaticClass, formStyle, splitPropsVariants } from '@supastack/ui-styles';
import { useMemo } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { FormProvider as HookFormProvider } from 'react-hook-form';

import { BoxRef } from '../Box/index.ts';
import { FormProvider } from './context.tsx';

export type FormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
> = BFormProps &
  React.HTMLAttributes<HTMLFormElement> & {
    methods: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
  };

export const Form = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>(
  originalProps: FormProps<TFieldValues, TContext, TTransformedValues>,
) => {
  const [props, variantProps] = splitPropsVariants(originalProps, formStyle.variantKeys);

  const { tw, slotClasses, UNSAFE_class, methods, ...rootProps } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const slots = useMemo(() => formStyle(variantProps), [...Object.values(variantProps)]);
  const baseTw = slots.base({ class: [formStaticClass('base'), tw, UNSAFE_class] });

  return (
    <FormProvider value={{ slots, slotClasses }}>
      <HookFormProvider {...methods}>
        <BoxRef as="form" tw={baseTw} {...rootProps} />
      </HookFormProvider>
    </FormProvider>
  );
};

// export const Form = FormProvider;
