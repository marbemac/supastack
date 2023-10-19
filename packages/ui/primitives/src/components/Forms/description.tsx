import { formStaticClass } from '@supastack/ui-styles';
import * as React from 'react';

import { BoxRef } from '../Box/index.ts';
import { useForm } from './context.tsx';
import { useFormField } from './field.tsx';

export const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    const { slots, slotClasses } = useForm();

    const descriptionTw = slots.itemDescription({
      class: [formStaticClass('itemDescription'), slotClasses?.itemDescription, className],
    });

    return <BoxRef ref={ref} id={formDescriptionId} {...props} tw={descriptionTw} />;
  },
);

FormDescription.displayName = 'FormDescription';
