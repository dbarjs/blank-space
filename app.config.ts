import { UseAppThemeOptions } from 'composables/useAppTheme';

const appTheme: UseAppThemeOptions = {
  hexSourceColor: '#ffffffff',
  isDarkModeEnabled: true,
}

export default defineAppConfig({
  appTheme
})