<template>
  <div>
    communication platforms
    {{ currentPlatform }}
  </div>
</template>

<script lang="ts" setup>
import { useCommunicationPlatformStore } from "~/stores/useCommunicationPlatformStore"
definePageMeta({
  layout: "application",
  name: "Communication Platforms",
})

onMounted(async () => {
  await useCommunicationPlatformStore().loadFromSecureStorage()
})

const route = useRoute()

const currentPlatform = computed(() => {
  return "platform" in route.query
    ? useCommunicationPlatformStore().communicationPlatforms.find(
        (x: any) => x.id === parseInt(route.query.platform as string)
      )
    : null
})
</script>
