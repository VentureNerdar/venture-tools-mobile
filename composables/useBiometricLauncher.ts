import { ref, onMounted } from "vue"
import { App } from "@capacitor/app"
import { useBiometric } from "./useBiometric"

export const useBiometricLauncher = () => {
  const { checkBiometric } = useBiometric()
  const isAuthenticating = ref(false) // prevents double-trigger
  const lastForeground = ref(0)

  const authenticateUser = async () => {
    if (isAuthenticating.value) return
    isAuthenticating.value = true

    try {
      const ok = await checkBiometric()
      if (!ok) {
        window.location.href = "/lock"
        // window.location.href = "/"
      }
    } finally {
      isAuthenticating.value = false
    }
  }

  onMounted(() => {
    if (process.client) {
      authenticateUser()
    }
  })

  App.addListener("appStateChange", async (state) => {
    if (!state.isActive) return

    // ignore if we're still authenticating
    if (isAuthenticating.value) return

    // ignore rapid resume from AuthActivity
    const now = Date.now()
    if (now - lastForeground.value < 1500) return
    lastForeground.value = now

    await authenticateUser()
  })
}

// composables/useBiometricLauncher.ts
// import { onMounted } from "vue"
// import { App } from "@capacitor/app"
// import { useBiometric } from "./useBiometric"

// export const useBiometricLauncher = () => {
//   const { checkBiometric } = useBiometric()

//   onMounted(async () => {
//     if (process.client) {
//       const ok = await checkBiometric()
//       if (!ok) {
//         // redirect to login or show lock screen
//         window.location.href = "/lock"
//       }
//     }
//   })

//   // Optional: app resume
//   App.addListener("appStateChange", async (state) => {
//     if (state.isActive) {
//       const ok = await checkBiometric()
//       if (!ok) window.location.href = "/lock"
//     }
//   })
// }

// import { onMounted } from "vue"
// import { App } from "@capacitor/app"
// import { Preferences } from "@capacitor/preferences"
// import { useBiometric } from "./useBiometric"

// export const useBiometricLauncher = () => {
//   const { checkBiometric } = useBiometric()

//   const runAuth = async () => {
//     const { value: authenticated } = await Preferences.get({
//       key: "authenticated",
//     })

//     // Only prompt if not authenticated
//     if (authenticated !== "true") {
//       const ok = await checkBiometric()
//       if (ok) {
//         await Preferences.set({ key: "authenticated", value: "true" })
//       } else {
//         window.location.href = "/lock"
//       }
//     }
//   }

//   onMounted(async () => {
//     if (process.client) {
//       await runAuth()
//     }
//   })

//   App.addListener("appStateChange", async (state) => {
//     if (state.isActive) {
//       await runAuth()
//     }
//   })
// }
