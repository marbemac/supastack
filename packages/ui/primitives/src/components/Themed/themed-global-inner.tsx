'use client';

import { DirectionProvider } from '@radix-ui/react-direction';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cssObjToString, type GeneratedTheme } from '@supastack/ui-theme';

import { GlobalThemeContext } from './theme-context.ts';

type ThemedGlobalInnerProps = {
  children: React.ReactNode;
  generatedTheme: GeneratedTheme;
  generatedDarkTheme?: GeneratedTheme;
};

export const ThemedGlobalInner = ({ children, generatedTheme, generatedDarkTheme }: ThemedGlobalInnerProps) => {
  const styles = cssObjToString({ ':root': generatedTheme.css });
  const darkStyles = generatedDarkTheme ? cssObjToString({ ':root': generatedDarkTheme.css }) : '';

  return (
    <TooltipPrimitive.Provider>
      <DirectionProvider dir="ltr">
        <GlobalThemeContext.Provider value={generatedTheme}>
          {children}

          <style jsx global>
            {`
              ${styles}

              @media (prefers-color-scheme: dark) {
                ${darkStyles}
              }
            `}
          </style>
        </GlobalThemeContext.Provider>
      </DirectionProvider>
    </TooltipPrimitive.Provider>
  );
};
