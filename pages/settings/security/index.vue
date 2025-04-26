<template>
  <VanCellGroup>
    <VanCell title="PIN Number" is-link to="/settings/security/pin" />
    <VanCell title="Application Mask">
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
});

const d = reactive({
  mask: false,
});
</script>
