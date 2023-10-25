import { formStaticClass } from '@supastack/ui-styles';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

import { Box } from '../Box/index.ts';
import type { InputProps } from '../Input/index.ts';
import { Input } from '../Input/index.ts';
import { useForm } from './context.tsx';
import { FormControl } from './control.tsx';
import { FormDescription } from './description.tsx';
import { FormError } from './error.tsx';
import { FormField, FormItem } from './field.tsx';
import { FormLabel } from './label.tsx';

type FormInputFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & {
  label?: string;
  description?: string;
  inputProps?: InputProps;
  isRequired?: boolean;
  hidden?: boolean;
};

export const FormInputField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  description,
  inputProps,
  isRequired,
  hidden,
  ...others
}: FormInputFieldProps<TFieldValues, TName>) => {
  const { slots, slotClasses } = useForm();

  const itemTopTw = slots.itemTop({
    class: [formStaticClass('itemTop'), slotClasses?.itemTop],
  });

  return (
    <FormField
      {...others}
      render={({ field }) => (
        <FormItem tw={[hidden && 'hidden']}>
          <Box tw={itemTopTw}>
            {label && (
              <FormLabel>
                {label}
                {isRequired ? '*' : ''}
              </FormLabel>
            )}
            <FormError />
          </Box>

          <FormControl>
            <Input hidden={hidden} {...inputProps} {...field} />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
};
