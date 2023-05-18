import { UseAppThemeOptions } from 'composables/useAppTheme';

/**
 * Configuration options for the app.
 */
const appConfig = {
  /**
   * The default app theme options.
   */
  appTheme: {
    hexSourceColor: '#ffffffff',
    isDarkModeEnabled: true,
  } as UseAppThemeOptions,
};

export default defineAppConfig(appConfig);
