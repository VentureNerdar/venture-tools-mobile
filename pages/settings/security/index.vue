<template>
  <VanCellGroup>
    <VanCell :title="h.translate('pin_number')" is-link to="/settings/security/pin" />
    <VanCell :title="h.translate('application_mask')">
      <template #right-icon>
        <VanSwitch v-model="settingStore.applicationMask" size="20px" @change="settingStore.setApplicationMask" />
      </template>
    </VanCell>
  </VanCellGroup>
</template>

<script lang="ts" setup>
import { useSettingStore } from '~/stores/useSettingStore'

definePageMeta({
  layout: "application",
  name: "Security",
})

const h = useHelpers()
const settingStore = useSettingStore()
</script>
