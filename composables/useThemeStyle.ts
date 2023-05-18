import type { Scheme, Theme } from "@material/material-color-utilities";
import { hexFromArgb } from "@material/material-color-utilities";
import { defu } from "defu";
import type { CSSProperties, ShallowRef, ComputedRef } from "vue";
import { computed } from "vue";
import { ThemeOptions } from './useAppTheme';

type RefPaletteProperty = `--md-ref-palette-${string}-${string}`;
type SystemColorProperty = `--md-sys-color-${string}`;

type UseThemeStyleOptions = ShallowRef<ThemeOptions>;

/**
 * Return type of the useThemeStyle composable.
 */
interface UseThemeStyleReturn {
  style: ShallowRef<CSSProperties | undefined>;
}

/**
 * Composable for generating theme-based CSS styles.
 *
 * @param theme - The computed theme object.
 * @param options - Options for customizing the theme styles.
 * @returns An object containing the computed `style` property representing the generated CSS styles.
 */
export function useThemeStyle(
  theme: ComputedRef<Theme | undefined>,
  options?: UseThemeStyleOptions
): UseThemeStyleReturn {
  const {
    brightnessSuffix,
    isDarkModeEnabled,
    paletteTones,
  } = defu(options?.value, {
    isDarkModeEnabled: true,
  });

  /**
   * Computed property representing the generated CSS styles based on the provided theme.
   */
  const style = computed<CSSProperties | undefined>(() => {
    if (!theme.value) {
      return;
    }

    const { schemes, palettes } = theme.value;

    const properties: CSSProperties = {};

    const scheme = isDarkModeEnabled ? schemes.dark : schemes.light;

    setSchemeProperties(properties, scheme);

    if (brightnessSuffix) {
      setSchemeProperties(properties, schemes.dark, "-dark");
      setSchemeProperties(properties, schemes.light, "-light");
    }

    if (!paletteTones) {
      return properties;
    }

    const tones: number[] = paletteTones ?? [];

    for (const [key, palette] of Object.entries(palettes)) {
      const paletteKey = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

      for (const tone of tones) {
        const propertyKey: RefPaletteProperty = `--md-ref-palette-${paletteKey}-${paletteKey}${tone}`;
        const color = hexFromArgb(palette.tone(tone));

        properties[propertyKey] = color;
      }
    }

    return properties;
  });

  /**
   * Set the CSS properties for a given scheme.
   *
   * @param properties - The CSS properties object to update.
   * @param scheme - The scheme object containing the color values.
   * @param suffix - The suffix to append to the property key.
   */
  function setSchemeProperties(
    properties: CSSProperties,
    scheme: Scheme,
    suffix: string = ""
  ) {
    for (const [key, value] of Object.entries(scheme.toJSON())) {
      const token: string = key
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .toLowerCase();
      const color: string = hexFromArgb(value);
      const propertyKey: SystemColorProperty = `--md-sys-color-${token}${suffix}`;

      properties[propertyKey] = color;
    }
  }

  return {
    style,
  };
}
