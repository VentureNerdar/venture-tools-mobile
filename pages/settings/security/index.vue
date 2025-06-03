<template>
  <VanCellGroup>
    <VanCell :title="h.translate('pin_number')" is-link to="/settings/security/pin" />
  </VanCellGroup>
</template>

<script lang="ts" setup>

definePageMeta({
  layout: "application",
  name: "Security",
})

const h = useHelpers()
</script>
