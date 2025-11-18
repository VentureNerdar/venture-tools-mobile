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
import { useAuthStore } from "~/stores/useAuthStore"
import { useSettingStore } from "~/stores/useSettingStore"
import { RoutePaths } from "~/types/index.d"

definePageMeta({
  layout: "application",
  name: "Security",
})
const settingStore = useSettingStore()
const authStore = useAuthStore()
let authUser = authStore.authUser

const consume = await useConsumeApi(RoutePaths.USERS_LOGIN_UPDATE)

onMounted(async () => {
  await settingStore.loadFromSecureStorage()
  await authStore.loadFromSecureStorage()
  console.log("Security page auth user", authStore.authUser)
  if (authUser?.first_time_login) {
    const response = await consume.save({})
    if (response) {
      await secureSet("authUser", JSON.stringify(response))
    }
    showNotify({
      type: "warning",
      message: "Please setup your security features",
      duration: 6000,
    })
    await authStore.loadFromSecureStorage()
    authUser = authStore.authUser
  }
})

const h = useHelpers()
const toggleBiometric = async (value: boolean) => {
  await settingStore.toggleBiometric(value)
}
</script>
