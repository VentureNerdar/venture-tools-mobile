// plugins/biometric-init.client.ts
import { BiometricAuth } from "@aparajita/capacitor-biometric-auth"

export default defineNuxtPlugin(async () => {
  try {
    await BiometricAuth.checkBiometry()
    console.log("[Biometric] Plugin ready")
  } catch (e) {
    console.log("[Biometric] Warmup failed", e)
  }
})
