<template>
  <div :class="$style.field">
    <input v-model="spaceName" type="text" placeholder="Hi!">
  </div>
</template>

<script lang="ts" setup>
const { spaceName: spaceNameQuery } = useRouteThemeOptions();

const spaceName = ref<string>(spaceNameQuery.value);
const pageTitle = computed<string>(() => spaceName.value || 'Blank Space')

watch(spaceName, (value) => {
  spaceNameQuery.value = value;
}, {
  immediate: true
});

useHead({
  title: pageTitle
})
</script>

<style module lang="scss">
.field {
  align-items: center;
  color: var(--md-sys-color-on-background);
  display: flex;
  height: 100%;
  width: 100%;

  input {
    -webkit-appearance: none;
    outline: none;
    color: inherit;
    background: 0;
    border: 0;
    font-family: var(--system-ui);
    font-size: 3rem;
    text-align: center;
    width: 100%;
  }
}
</style>