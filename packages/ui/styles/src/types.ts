import type { ClassNameValue } from './tw.ts';

export type TwProp = ClassNameValue;

export type StyleProps = {
  /**
   * Type-safe styling using tailwind classes.
   */
  tw?: TwProp;

  /**
   * Escape hatch if non-tailwind classes are needed (3rd party integration, etc).
   */
  UNSAFE_class?: ClassNameValue;
};

export type SlotProp<T extends string> = {
  /** CSS classes to be passed to the component slots. */
  slotClasses?: Omit<Partial<Record<T, string>>, 'base'>;
};

export type VariantSlots<V extends {}> = keyof V;
