<template>
  <div :class="$style.layout" :style="style" >
    <slot />
  </div>
</template>

<script setup lang="ts">
const { appTheme } = useAppConfig();

const { theme, themeOptions } = useAppTheme(appTheme);
const { style } = useThemeStyle(theme, themeOptions);  
</script>

<style module lang="scss">
.layout {
  align-items: center;
  background-color: var(--md-sys-color-background);
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
}
</style>