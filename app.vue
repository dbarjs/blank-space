<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<style lang="scss">
:root {
  --system-ui: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

body {
  font-family: var(--system-ui);
  margin: 0;
  height: 100vh;
  width: 100%;
}

#__nuxt {
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
}
</style>