<template>
  <div
    v-if="!authUser"
    class="wrapper"
  >
    <div class="title">Venture Tools</div>

    <div class="subtitle">Welcome to Venture Tools</div>

    <VanButton
      type="primary"
      block
      @click="router.push('/login')"
      >LOGIN</VanButton
    >

    <VanDivider>OR</VanDivider>

    <VanButton
      type="primary"
      block
      @click="router.push('/register')"
      >REGISTER</VanButton
    >
  </div>
</template>

<script setup lang="ts">
import { useSettingStore } from "~/stores/useSettingStore"
import { useAuthStore } from "~/stores/useAuthStore"

const authStore = useAuthStore()
const settingStore = useSettingStore()
const pinNumber = settingStore.pinNumber
const applicationMask = settingStore.applicationMask

onMounted(async () => {
  await settingStore.loadFromSecureStorage()
  await authStore.loadFromSecureStorage()
})

const authUser = authStore.authUser
const router = useRouter()

// Check if user is logged in
if (authUser) {
  // Check if mask option is set
  if (applicationMask) {
    navigateTo("/mask")
  } else {
    // No mask option
    // Check if pin is set
    if (pinNumber) {
      navigateTo("/pin")
    } else {
      // No pin
      navigateTo("/splash")
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 24px;
  font-weight: bold;
  color: #17badf;
  text-align: center;
  margin: 20px 0;
  text-transform: uppercase;
}

.wrapper {
  padding: 20px;
}

.subtitle {
  font-size: 16px;
  text-align: center;
  margin-bottom: 30px;
}
</style>
