<template>
  <VanCellGroup>
    <VanCell
      :title="h.translate('pin_number')"
      is-link
      to="/settings/security/pin"
    />
    <van-cell
      center
      title="Enable biometric login"
    >
      <template #right-icon>
        <VanSwitch
          v-model="settingStore.isUsingBiometric"
          @change="toggleBiometric"
        />
      </template>
    </van-cell>
  </VanCellGroup>
</template>

<script lang="ts" setup>
import { useSettingStore } from "~/stores/useSettingStore"

definePageMeta({
  layout: "application",
  name: "Security",
})
const settingStore = useSettingStore()

onMounted(async () => {
  await settingStore.loadFromSecureStorage()
})

const h = useHelpers()
const toggleBiometric = async (value: boolean) => {
  await settingStore.toggleBiometric(value)
}
</script>
