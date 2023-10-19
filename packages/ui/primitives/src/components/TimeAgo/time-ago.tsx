'use client';

import type { TimeAgoProps as BTimeAgoProps } from '@supastack/ui-styles';
import { cx } from '@supastack/ui-styles';
import { dayjs } from '@supastack/utils-dates';
import { useEffect, useState } from 'react';

import type { PolymorphicComponent } from '../../utils/forward-ref.ts';

export type TimeAgoProps = BTimeAgoProps;

export const TimeAgo: PolymorphicComponent<'time', TimeAgoProps> = props => {
  const { as: As = 'time', date, live = true, tw, UNSAFE_class, ...others } = props;

  const [d, setD] = useState(dayjs(date));
  const [time, setTime] = useState(d.fromNow());
  const [period, setPeriod] = useState(5);

  useEffect(() => {
    setD(dayjs(date));
  }, [date]);

  useEffect(() => {
    if (live) {
      const interval = setInterval(() => {
        setTime(d.fromNow());

        const diff = Math.abs(d.diff(Date.now(), 'seconds'));
        if (diff > 60 * 60) {
          setPeriod(60 * 5);
        } else if (diff > 60) {
          setPeriod(60);
        } else if (diff > 20) {
          setPeriod(10);
        }
      }, period * 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [d, live, period]);

  let dateTime: string | undefined = undefined;
  if (As === 'time') {
    dateTime = d.toISOString();
  }

  return (
    <As {...others} dateTime={dateTime} className={cx(tw, UNSAFE_class)}>
      {time}
    </As>
  );
};
