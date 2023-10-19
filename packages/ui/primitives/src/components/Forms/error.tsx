import { formStaticClass } from '@supastack/ui-styles';
import * as React from 'react';

import { BoxRef } from '../Box/index.ts';
import { useForm } from './context.tsx';
import { useFormField } from './field.tsx';

export const FormError = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    const { slots, slotClasses } = useForm();

    const errorTw = slots.itemError({
      class: [formStaticClass('itemError'), slotClasses?.itemError, className],
    });

    if (!body) {
      return null;
    }

    return (
      <BoxRef ref={ref} id={formMessageId} {...props} tw={errorTw}>
        {body}
      </BoxRef>
    );
  },
);
FormError.displayName = 'FormError';
