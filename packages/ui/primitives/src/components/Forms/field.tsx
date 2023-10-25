import type { TwProp } from '@supastack/ui-styles';
import { formStaticClass } from '@supastack/ui-styles';
import { createContext, forwardRef, useContext, useId } from 'react';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';

import { BoxRef } from '../Box/index.ts';
import { useForm } from './context.tsx';

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: ControllerProps<TFieldValues, TName>,
) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

export const FormItem = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { tw?: TwProp }>(
  ({ className, tw, ...props }, ref) => {
    const id = useId();

    const { slots, slotClasses } = useForm();

    const itemTw = slots.item({
      class: [formStaticClass('item'), tw, slotClasses?.item, className],
    });

    return (
      <FormItemContext.Provider value={{ id }}>
        <BoxRef ref={ref} {...props} tw={itemTw} />
      </FormItemContext.Provider>
    );
  },
);

FormItem.displayName = 'FormItem';
