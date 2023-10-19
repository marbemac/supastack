import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import type { StyleProps } from '@supastack/ui-styles';
import { useMemo } from 'react';

import { Box } from '../Box/index.ts';

type FaProps = StyleProps & {
  icon: IconDefinition;

  // Duotone Icons
  primaryColor?: string;
  secondaryColor?: string;
  primaryOpacity?: number | string;
  secondaryOpacity?: number | string;
  swapOpacity?: boolean;
};

export const FaSvg = ({ icon, primaryColor, secondaryColor, swapOpacity, UNSAFE_class, tw, ...rest }: FaProps) => {
  const primaryOpacity = rest.primaryOpacity === undefined ? 1 : rest.primaryOpacity;
  const secondaryOpacity = rest.secondaryOpacity === undefined ? 0.4 : rest.secondaryOpacity;

  const i = useMemo(() => icon.icon || ([0, 0, '', [], ''] as const), [icon]);

  return (
    <Box
      tw={tw}
      UNSAFE_class={UNSAFE_class}
      as="svg"
      viewBox={`0 0 ${i[0]} ${i[1]}`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      style={{ verticalAlign: '-0.125em' }}
    >
      {/* eslint-disable-next-line react/no-unknown-property */}
      {/* @ts-expect-error ignore, it is present in most recent react (the canary that nextjs compiles in) */}
      <g transform={`translate(${i[0] / 2} ${i[1] / 2})`} transformOrigin={`${i[0] / 4} 0`}>
        {typeof i[4] === 'string' ? (
          <path
            d={i[4] as string}
            fill={primaryColor || 'currentColor'}
            transform={`translate(${i[0] / -2} ${i[1] / -2})`}
          />
        ) : (
          <>
            <path
              d={i[4][0]}
              fill={secondaryColor || 'currentColor'}
              fillOpacity={swapOpacity != false ? primaryOpacity : secondaryOpacity}
              transform={`translate(${i[0] / -2} ${i[1] / -2})`}
            />
            <path
              d={i[4][1]}
              fill={primaryColor || 'currentColor'}
              fillOpacity={swapOpacity != false ? secondaryOpacity : primaryOpacity}
              transform={`translate(${i[0] / -2} ${i[1] / -2})`}
            />
          </>
        )}
      </g>
    </Box>
  );
};
