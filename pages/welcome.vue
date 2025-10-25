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
  <!-- <div
    v-else
    class="spinner-wrapper"
  >
    <VanLoading
      color="#17badf"
      type="spinner"
      size="32px"
      class="spinner"
    />
    <p class="mt-4 text-blue-400 text-base">Getting ready...</p>
  </div> -->
</template>

<script setup lang="ts">
import { useSettingStore } from "~/stores/useSettingStore"
import { useAuthStore } from "~/stores/useAuthStore"

const authStore = useAuthStore()
const settingStore = useSettingStore()
const pinNumber = settingStore.pinNumber
// const isLoading = authStore.isLoading
const isLoading = ref(true)
// const applicationMask = settingStore.applicationMask

onMounted(async () => {
  await settingStore.loadFromSecureStorage()
  await authStore.loadFromSecureStorage()
})

const authUser = authStore.authUser
const router = useRouter()
console.log("[Auth] welcome page Auth user", authStore.authUser)
console.log("[Auth] welcome page token", authStore.token)

// Check if user is logged in
if (authUser) {
  // Check if mask option is set
  // if (applicationMask) {
  //   navigateTo("/mask")
  // } else {
  // No mask option
  // Check if pin is set
  if (pinNumber) {
    navigateTo("/pin")
  } else {
    // No pin
    navigateTo("/splash")
  }
}
// }
// watch(
//   () => authStore.isLoading,
//   (newVal, oldVal) => {
//     console.log(
//       "[Watcher] isLoading changed welcome page:",
//       oldVal,
//       "→",
//       newVal
//     )
//     if (!authStore.isLoading && authUser) {
//     }
//     isLoading.value = authStore.isLoading
//     if (newVal === false) {
//       console.log("[Watcher] Auth loading finished welcome page!")
//       // 🔹 You can safely check authStore.authUser or navigate here
//       if (authStore.authUser) {
//         console.log(
//           " Welcome page User authenticated:",
//           authStore.authUser.email
//         )
//         router.push("/splash")
//       } else {
//         console.log("Welcome page No user found after loading")
//       }
//     }
//   },
//   { immediate: true } // optional: run once on mount
// )
</script>

<style scoped lang="scss">
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
.spinner-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .spinner {
    text-align: center;
  }
}
</style>
