import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import { twMergeConfig, tx } from '../tw.ts';
import type { VariantSlots } from '../types.ts';
import { focusStyles } from '../utils/focus.ts';
import { makeStaticClass } from '../utils/make-static-class.ts';
import { formSizes } from '../utils/size.ts';

export const buttonStyle = tv(
  {
    slots: {
      base: tx(
        'group',
        'select-none appearance-none font-medium',
        'inline-flex items-center justify-center',
        'max-w-full cursor-pointer whitespace-nowrap',
        'transform-gpu motion-safe:transition',
        focusStyles,
      ),

      icon: tx('[display:inherit]'),

      text: tx('overflow-hidden'),
    },
    defaultVariants: {
      size: 'md',
      variant: 'solid',
      intent: 'neutral',
      fullWidth: false,
      isDisabled: false,
      isLoading: false,
      isInteractive: false,
      isInGroup: false,
    },
    variants: {
      variant: {
        solid: {},
        soft: {},
        outline: tx('shadow-border'),
        ghost: {},
        inverted: {},
      },
      intent: {
        neutral: {},
        primary: {},
        danger: {},
      },
      size: {
        sm: formSizes.sm,
        md: formSizes.md,
        lg: formSizes.lg,
      },
      fullWidth: {
        true: tx('w-full'),
      },
      isDisabled: {
        true: tx('opacity-50'),
      },
      isLoading: {
        true: tx('opacity-80'),
      },
      isInteractive: {
        true: {},
        false: tx('pointer-events-none select-none'),
      },
      isInGroup: {
        true: tx('[&:not(:first-child):not(:last-child)]:rounded-none'),
      },
      isIconOnly: {
        true: tx('gap-0 p-0'),
        false: tx('[&>svg]:max-w-[2em]'),
      },
    },
    compoundVariants: [
      // outline / intent
      {
        variant: 'outline',
        intent: 'neutral',
        class: tx('text-neutral shadow-neutral-line-1'),
      },
      {
        variant: 'outline',
        intent: 'primary',
        class: tx('text-primary shadow-primary-line-1'),
      },
      {
        variant: 'outline',
        intent: 'danger',
        class: tx('text-danger shadow-danger-line-1'),
      },

      // outline / intent / isInteractive
      {
        variant: 'outline',
        intent: 'neutral',
        isInteractive: true,
        class: tx('hover:bg-neutral-soft-1-a hover:shadow-neutral-line-2 active:bg-neutral-soft-2-a'),
      },
      {
        variant: 'outline',
        intent: 'primary',
        isInteractive: true,
        class: tx('hover:bg-primary-soft-1-a hover:shadow-primary-line-2 active:bg-primary-soft-2-a'),
      },
      {
        variant: 'outline',
        intent: 'danger',
        isInteractive: true,
        class: tx('hover:bg-danger-soft-1-a hover:shadow-danger-line-2 active:bg-danger-soft-2-a'),
      },

      // solid / intent
      {
        variant: 'solid',
        intent: 'neutral',
        class: tx('bg-neutral-1-a text-on-neutral'),
      },
      {
        variant: 'solid',
        intent: 'primary',
        class: tx('bg-primary-1-a text-on-primary'),
      },
      {
        variant: 'solid',
        intent: 'danger',
        class: tx('bg-danger-1-a text-on-danger'),
      },

      // solid / intent / isInteractive
      {
        variant: 'solid',
        intent: 'neutral',
        isInteractive: true,
        class: tx('hover:bg-neutral-2-a active:bg-neutral-3-a'),
      },
      {
        variant: 'solid',
        intent: 'primary',
        isInteractive: true,
        class: tx('hover:bg-primary-2-a active:bg-primary-3-a'),
      },
      {
        variant: 'solid',
        intent: 'danger',
        isInteractive: true,
        class: tx('hover:bg-danger-2-a active:bg-danger-3-a'),
      },

      // soft / intent
      {
        variant: 'soft',
        intent: 'neutral',
        class: tx('bg-neutral-soft-1-a text-neutral'),
      },
      {
        variant: 'soft',
        intent: 'primary',
        class: tx('bg-primary-soft-1-a text-primary'),
      },
      {
        variant: 'soft',
        intent: 'danger',
        class: tx('bg-danger-soft-1-a text-danger'),
      },

      // soft / intent / isInteractive
      {
        variant: 'soft',
        intent: 'neutral',
        isInteractive: true,
        class: tx('hover:bg-neutral-soft-2-a active:bg-neutral-soft-3-a'),
      },
      {
        variant: 'soft',
        intent: 'primary',
        isInteractive: true,
        class: tx('hover:bg-primary-soft-2-a active:bg-primary-soft-3-a'),
      },
      {
        variant: 'soft',
        intent: 'danger',
        isInteractive: true,
        class: tx('hover:bg-danger-soft-2-a active:bg-danger-soft-3-a'),
      },

      // ghost / intent
      {
        variant: 'ghost',
        intent: 'neutral',
        class: tx('text-neutral'),
      },
      {
        variant: 'ghost',
        intent: 'primary',
        class: tx('text-primary'),
      },
      {
        variant: 'ghost',
        intent: 'danger',
        class: tx('text-danger'),
      },

      // ghost / intent / isInteractive
      {
        variant: 'ghost',
        intent: 'neutral',
        isInteractive: true,
        class: tx('hover:bg-neutral-soft-1-a active:bg-neutral-soft-2-a'),
      },
      {
        variant: 'ghost',
        intent: 'primary',
        isInteractive: true,
        class: tx('hover:bg-primary-soft-1-a active:bg-primary-soft-2-a'),
      },
      {
        variant: 'ghost',
        intent: 'danger',
        isInteractive: true,
        class: tx('hover:bg-danger-soft-1-a active:bg-danger-soft-2-a'),
      },
    ],
  },
  {
    twMergeConfig,
  },
);

export type ButtonStyleProps = VariantProps<typeof buttonStyle>;
export type ButtonSlots = VariantSlots<typeof buttonStyle.slots>;

export const buttonStaticClass = makeStaticClass<ButtonSlots>('button');

// export const buttonGroupStyle = tv(
//   {
//     base: 'inline-flex items-center justify-center h-auto',
//     variants: {
//       fullWidth: {
//         true: 'w-full',
//       },
//     },
//     defaultVariants: {
//       fullWidth: false,
//     },
//   },
//   {
//     twMergeConfig,
//   },
// );

// export type ButtonGroupStyleProps = VariantProps<typeof buttonGroupStyle>;
