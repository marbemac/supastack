import basePlugin from 'tailwindcss/plugin';

import { fontTokens } from '../tokens/fonts.ts';
import { createCssVariableFactory, createTokenProcessor } from '../tokens/helpers.ts';
import { radiusTokens } from '../tokens/radius.ts';
import { spaceTokens } from '../tokens/space.ts';
import { typographyTokens, typographyUtilities } from '../tokens/typography.ts';
import { tx } from '../tw.ts';
import { generateTheme } from './theme.ts';

export type PluginOptions = {
  prefix?: string;
};

export const plugin = basePlugin.withOptions(
  (options: PluginOptions = {}) => {
    const t = createCssVariableFactory(options.prefix || 'm');
    const tokenProcessor = createTokenProcessor(t);

    return ({ addBase, addUtilities, addVariant }) => {
      addBase({
        ':root': {
          ...tokenProcessor(spaceTokens).variables,
          ...tokenProcessor(radiusTokens).variables,
          ...tokenProcessor(typographyTokens).variables,
          ...tokenProcessor(fontTokens).variables,
        },
      });

      addUtilities(typographyUtilities(t));

      /**
       * New variants
       */

      // https://larsmagnus.co/blog/focus-visible-within-the-missing-pseudo-class
      addVariant('focus-visible-within', '&:has(:focus-visible)');

      addUtilities({
        /**
         * Resets
         */

        '.reset-a': {
          'text-decoration': 'none',
          color: 'inherit',
          outline: 'none',
        },

        '.reset-button': {
          appearance: 'none',
          'background-color': 'transparent',
          border: 'none',
          'font-size': 'inherit',
          'font-family': 'inherit',
          'line-height': 'inherit',
          'letter-spacing': 'inherit',
          color: 'inherit',
          outline: 'none',
          padding: '0',
          margin: '0',
        },

        /**
         * Animations
         */

        '.animate-popper': {
          "&[data-state='open']": {
            "&[data-side='top']": {
              [`@apply ${tx('motion-safe:animate-slide-up-fade-in')}`]: {},
            },
            "&[data-side='bottom']": {
              [`@apply ${tx('motion-safe:animate-slide-down-fade-in')}`]: {},
            },
            "&[data-side='left']": {
              [`@apply ${tx('motion-safe:animate-slide-left-fade-in')}`]: {},
            },
            "&[data-side='right']": {
              [`@apply ${tx('motion-safe:animate-slide-right-fade-in')}`]: {},
            },
          },

          "&[data-state='closed']": {
            'animation-duration': '100ms !important',

            "&[data-side='top']": {
              [`@apply ${tx('motion-safe:animate-slide-down-fade-out')}`]: {},
            },
            "&[data-side='bottom']": {
              [`@apply ${tx('motion-safe:animate-slide-up-fade-out')}`]: {},
            },
            "&[data-side='left']": {
              [`@apply ${tx('motion-safe:animate-slide-right-fade-out')}`]: {},
            },
            "&[data-side='right']": {
              [`@apply ${tx('motion-safe:animate-slide-left-fade-out')}`]: {},
            },
          },
        },

        '.animate-delayed-open': {
          "&[data-state='delayed-open']": {
            "&[data-side='top']": {
              [`@apply ${tx('motion-safe:animate-slide-up-fade-in')}`]: {},
            },
            "&[data-side='bottom']": {
              [`@apply ${tx('motion-safe:animate-slide-down-fade-in')}`]: {},
            },
            "&[data-side='left']": {
              [`@apply ${tx('motion-safe:animate-slide-left-fade-in')}`]: {},
            },
            "&[data-side='right']": {
              [`@apply ${tx('motion-safe:animate-slide-right-fade-in')}`]: {},
            },
          },
        },

        '.animate-overlay': {
          "&[data-state='open']::after": {
            [`@apply ${tx('motion-safe:animate-overlay-show')}`]: {},
          },
        },

        '.animate-content': {
          "&[data-state='open']": {
            [`@apply ${tx('motion-safe:animate-content-show')}`]: {},
          },
        },
      });
    };
  },
  options => {
    return {
      theme: generateTheme(options),
    };
  },
);
