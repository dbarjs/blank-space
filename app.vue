<template>
  <div>
    <input v-model="spaceName" type="text">
  </div>
</template>

<script lang="ts" setup>
const {query} = useRoute();
const router = useRouter();


const spaceName = computed<string>({
  get() {
    return query['spaceName']
  },
  set(value: string) {
    router.replace({
      query: {
        spaceName: value
      }
    })
  }
})

</script>