'use client';

import { cx } from '@supastack/ui-styles';
import { cssObjToString, type GeneratedTheme } from '@supastack/ui-theme';

import type { PolymorphicComponent } from '../../utils/forward-ref.ts';
import { Box, type BoxProps } from '../Box/index.ts';
import { Style } from './style.tsx';
import { ThemeContext } from './theme-context.ts';

type ThemedInnerProps = BoxProps & {
  children: React.ReactNode;
  themeHash: string;
  generatedTheme: GeneratedTheme;
};

export const ThemedInner: PolymorphicComponent<'div', ThemedInnerProps> = ({
  children,
  themeHash,
  generatedTheme,
  UNSAFE_class,
  ...others
}) => {
  const themeClassName = `theme-${themeHash}`;
  const styles = cssObjToString({ [`.${themeClassName}`]: generatedTheme.css });

  return (
    <ThemeContext.Provider value={generatedTheme}>
      {/* @ts-expect-error ignore */}
      <Box UNSAFE_class={cx(themeClassName, UNSAFE_class)} {...others}>
        {children}

        <Style>
          {`
            ${styles}
          `}
        </Style>
      </Box>
    </ThemeContext.Provider>
  );
};
