<template>
  <VanCellGroup>
    <VanCell is-link title="Profile" to="/settings/profile" />
    <VanCell is-link title="Security" to="/settings/security" />
  </VanCellGroup>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "application",
});
</script>
