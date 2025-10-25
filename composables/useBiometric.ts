import { ref } from "vue"
import {
  BiometricAuth,
  BiometryErrorType,
} from "@aparajita/capacitor-biometric-auth"

const isAuthenticated = ref(false) // only resets when app restarts

export const useBiometric = () => {
  const checkBiometric = async (): Promise<boolean> => {
    // avoid re-checking if already authenticated this session
    if (isAuthenticated.value) return true

    try {
      const info = await BiometricAuth.checkBiometry()
      if (!info.isAvailable && !info.deviceIsSecure) {
        console.warn("No biometric enrolled and device not secured")
        return false
      }

      await BiometricAuth.authenticate({
        reason: "Authenticate to continue",
        allowDeviceCredential: true,
        iosFallbackTitle: "Use device passcode",
      })

      // ✅ Mark as authenticated for this session
      isAuthenticated.value = true
      return true
    } catch (err: any) {
      if (
        err.code === BiometryErrorType.userCancel ||
        err.code === BiometryErrorType.appCancel
      ) {
        console.warn("User cancelled biometric authentication")
        return false
      }
      console.error("Biometric authentication failed:", err)
      return false
    }
  }

  const resetBiometricSession = () => {
    isAuthenticated.value = false
  }

  return { checkBiometric, resetBiometricSession, isAuthenticated }
}

// import {
//   BiometricAuth,
//   BiometryType,
//   BiometryErrorType,
// } from "@aparajita/capacitor-biometric-auth"

// export const useBiometric = () => {
//   const checkBiometric = async (): Promise<boolean> => {
//     try {
//       // Check what biometrics are available & if device is secure
//       const info = await BiometricAuth.checkBiometry()

//       if (!info.isAvailable && !info.deviceIsSecure) {
//         console.warn("No biometric enrolled and device not secured")
//         return false
//       }

//       // Authenticate user (biometric or device PIN fallback)
//       await BiometricAuth.authenticate({
//         reason: "Authenticate to continue",
//         allowDeviceCredential: true, // fallback to PIN/password
//         iosFallbackTitle: "Use device passcode",
//       })

//       return true
//     } catch (err: any) {
//       if (
//         err.code === BiometryErrorType.userCancel ||
//         err.code === BiometryErrorType.appCancel
//       ) {
//         console.warn("User cancelled biometric authentication")
//         return false
//       }
//       console.error("Biometric authentication failed:", err)
//       return false
//     }
//   }

//   return { checkBiometric }
// }
