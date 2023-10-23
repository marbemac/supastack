'use server';

import 'server-only';

import type { ThemeConfig } from '@supastack/ui-theme';
import { cookies } from 'next/headers';

export const setThemeCookie = async (theme: ThemeConfig) => {
  cookies().set('theme', JSON.stringify(theme));
};
