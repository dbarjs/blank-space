import { Theme, argbFromHex, themeFromSourceColor } from '@material/material-color-utilities';
import defu from 'defu';
import { ComputedRef, computed } from 'vue';

export interface ThemeOptions {
  hexSourceColor?: string;
  isDarkModeEnabled?: boolean;
  brightnessSuffix?: boolean;
  paletteTones?: number[];
}

export interface UseAppThemeOptions extends Partial<ThemeOptions> {
  hexSourceColor: string;
  isDarkModeEnabled: boolean;
}

export interface UseAppThemeReturn {
  theme: ComputedRef<Theme | undefined>;
  toggleThemeMode: () => void;
  themeOptions: ComputedRef<ThemeOptions>;
}

const defaultOptions: UseAppThemeOptions = {
  hexSourceColor: '#FFFFFFFF',
  isDarkModeEnabled: true,
};

export function useAppTheme(options: UseAppThemeOptions): UseAppThemeReturn {
  const mergedOptions = defu(options, defaultOptions);
  
  const { hexSourceColor, isDarkModeEnabled } = useRouteThemeOptions()

  if (!hexSourceColor.value) {
    hexSourceColor.value = mergedOptions.hexSourceColor;
  }

  if (!isDarkModeEnabled.value) {
    isDarkModeEnabled.value = mergedOptions.isDarkModeEnabled;
  }

  const theme = computed<Theme | undefined>(() => {
    if (!hexSourceColor.value) {
      return;
    }

    const argSourceColor = argbFromHex(hexSourceColor.value);
    const theme = themeFromSourceColor(argSourceColor);

    return theme;
  });

  const themeOptions = computed<ThemeOptions>(() => {
    return {
      ...mergedOptions,
      hexSourceColor: hexSourceColor.value,
      isDarkModeEnabled: isDarkModeEnabled.value,
    };
  });

  const toggleThemeMode = () => {
    // Toggle between the light and dark theme
    // based on the themeOptions.isDarkModeEnabled flag
    // For example:
    // themeOptions.isDarkModeEnabled = !themeOptions.isDarkModeEnabled;
  };

  return {
    theme,
    toggleThemeMode,
    themeOptions,
  };
}
