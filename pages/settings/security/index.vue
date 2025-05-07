<template>
  <VanCellGroup>
    <VanCell :title="h.translate('pin_number')" is-link to="/settings/security/pin" />
    <VanCell :title="h.translate('application_mask')">
      <template #right-icon>
        <VanSwitch v-model="d.mask" size="20px" />
      </template>
    </VanCell>
  </VanCellGroup>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "application",
  name: "Security",
})

const d = reactive({
  mask: false,
})
const h = useHelpers()
</script>
