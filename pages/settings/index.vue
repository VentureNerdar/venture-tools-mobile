<template>
  <VanCellGroup>
    <VanCell is-link :title="h.translate('profile')" to="/settings/profile" />
    <VanCell is-link :title="h.translate('security')" to="/settings/security" />
  </VanCellGroup>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "application",
})
const h = useHelpers()
</script>
