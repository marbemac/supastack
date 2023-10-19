import path from 'node:path';

import { preset } from '@supastack/ui-styles/tailwind';
import type { Config } from 'tailwindcss';

export default {
  presets: [preset()],

  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './.storybook/preview.tsx',

    path.join(path.dirname(require.resolve('@supastack/ui-styles')), '**/*.ts'),
  ],
} satisfies Config;
