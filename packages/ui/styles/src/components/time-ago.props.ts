import type { StyleProps } from '../types.ts';

export interface TimeAgoProps extends TimeAgoRootProps {}

interface TimeAgoRootProps extends StyleProps {
  /**
   * A date in the past or the future.
   */
  date: string | number | Date;

  /**
   * Whether or not the component should update itself over time.
   *
   * @default true
   */
  live?: boolean;
}
