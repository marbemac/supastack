import 'server-only';

import { generateThemesForCookie, type ThemeConfig } from '@supastack/ui-theme';
import { hashJson } from '@supastack/utils-ids';
import { unstable_cache } from 'next/cache';
import { cookies } from 'next/headers';
import { cache } from 'react';

export const getGlobalTheme = cache(() => {
  const cookieStore = cookies();

  const stored = cookieStore.get('theme');
  if (!stored?.value) {
    return null;
  }

  try {
    return JSON.parse(stored.value) as ThemeConfig;
  } catch (e) {
    console.warn('Error parsing theme cookie', stored.value, e);
  }

  return null;
});

export const getGeneratedTheme = (themeConfig: ThemeConfig | null) => {
  const themeConfigHash = themeConfig ? hashJson(themeConfig) : 'system';

  return unstable_cache(async () => generateThemesForCookie(themeConfig), [`theme`, themeConfigHash], {
    tags: ['theme'],
  })();
};
