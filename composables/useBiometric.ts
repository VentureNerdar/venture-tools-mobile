// composables/useBiometric.ts
import {
  BiometricAuth,
  BiometryType,
  BiometryErrorType,
} from "@aparajita/capacitor-biometric-auth"

export const useBiometric = () => {
  const checkBiometric = async (): Promise<boolean> => {
    try {
      // Check what biometrics are available & if device is secure
      const info = await BiometricAuth.checkBiometry()

      if (!info.isAvailable && !info.deviceIsSecure) {
        console.warn("No biometric enrolled and device not secured")
        return false
      }

      // Authenticate user (biometric or device PIN fallback)
      await BiometricAuth.authenticate({
        reason: "Authenticate to continue",
        allowDeviceCredential: true, // fallback to PIN/password
        iosFallbackTitle: "Use device passcode",
      })

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

  return { checkBiometric }
}
