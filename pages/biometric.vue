<template>
  <div class="container">
    <div
      v-if="!isReady"
      class="spinner-wrapper"
    >
      <van-loading
        color="#17badf"
        type="spinner"
        size="32px"
        class="spinner"
      />
      <p class="mt-4 text-blue-400 text-base">Preparing biometric...</p>
    </div>
    <div
      class="auth-wrapper"
      v-else
    >
      <div class="title">Venture Tools</div>
      <div class="button">
        <VanButton
          square
          type="primary"
          @click="handleUnlock"
          :disabled="isAuthenticating"
        >
          UNLOCK
        </VanButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { Capacitor } from "@capacitor/core"
import { useBiometric } from "@/composables/useBiometric"
import { BiometricAuth } from "@aparajita/capacitor-biometric-auth"

const router = useRouter()
const { checkBiometric } = useBiometric()

const isAuthenticating = ref(false)
const isReady = ref(false) // ⬅️ controls loading state

// waits until biometric is responsive
const waitUntilBiometricReady = async (maxWait = 7000) => {
  const start = Date.now()
  while (Date.now() - start < maxWait) {
    try {
      const info = await BiometricAuth.checkBiometry()
      if (info.isAvailable || info.deviceIsSecure) return true
    } catch {}
    await new Promise((r) => setTimeout(r, 500))
  }
  return false
}

const checkBiometricAuth = async () => {
  if (isAuthenticating.value) return
  isAuthenticating.value = true

  try {
    if (Capacitor.isNativePlatform()) {
      // 👇 Wait until the plugin is ready
      await waitUntilBiometricReady()
      isReady.value = true
    }

    const ok = await checkBiometric()
    if (ok) {
      router.replace("/splash")
    } else {
      console.log("[Biometric] Auth cancelled or failed")
    }
  } finally {
    isAuthenticating.value = false
  }
}

onMounted(async () => {
  await checkBiometricAuth()
})

const handleUnlock = async () => {
  await checkBiometricAuth()
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  .spinner-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .spinner {
      text-align: center;
    }
  }
  .auth-wrapper {
    .title {
      width: 220px;
      height: 40px;
      line-height: 40px;
      position: absolute;
      color: #fff;
      background-color: #17badf;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 30px;
      font-weight: bold;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      z-index: 10;
      text-align: center;
      border-radius: 4px;
    }
    .button {
      position: absolute;
      left: 50%;
      bottom: 8%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
