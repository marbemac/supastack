import type { PolymorphicComponent } from '@supastack/ui-primitives';
import { ThemedInner } from '@supastack/ui-primitives/themed';
import type { StyleProps } from '@supastack/ui-styles';
import { type CustomTheme, generateTheme, type PrebuiltThemeIds } from '@supastack/ui-theme';
import { hashJson } from '@supastack/utils-ids';

type ThemedProps = StyleProps & { theme: PrebuiltThemeIds; customTheme?: CustomTheme; children: React.ReactNode };

export const Themed: PolymorphicComponent<'div', ThemedProps> = ({ theme, customTheme, children, ...others }) => {
  const generatedTheme = generateTheme(theme, customTheme);
  const themeHash = hashJson(generatedTheme.css);

  return (
    // @ts-expect-error ignore
    <ThemedInner themeHash={themeHash} generatedTheme={generatedTheme} {...others}>
      {children}
    </ThemedInner>
  );
};
