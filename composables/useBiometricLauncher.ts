// import { ref, onMounted } from "vue"
// import { App } from "@capacitor/app"
// import { useBiometric } from "./useBiometric"

// let listenerRegistered = false
// let resumeTimeout: NodeJS.Timeout | null = null
// let lastAuthTime = 0

// export const useBiometricLauncher = () => {
//   const { checkBiometric } = useBiometric()
//   const isAuthenticating = ref(false)
//   const lastForeground = ref(0)

//   const authenticateUser = async () => {
//     if (isAuthenticating.value) return

//     isAuthenticating.value = true
//     console.log("[Biometric] Starting authentication")

//     // try {
//     //   const ok = await checkBiometric()
//     //   if (!ok) {
//     //     console.log("[Biometric] Failed — redirecting to lock screen")
//     //     window.location.href = "/"
//     //   } else {
//     //     console.log("[Biometric] Success")
//     //     lastAuthTime = Date.now()
//     //   }
//     // } finally {
//     //   isAuthenticating.value = false
//     // }
//     try {
//       const ok = await checkBiometric()
//       if (!ok) {
//         console.log("[Biometric] Cancelled or failed — retrying")
//         // Wait a bit before re-showing (e.g., 1s), not 5s
//         lastAuthTime = 0
//         lastForeground.value = 0
//         setTimeout(() => authenticateUser(), 1000)
//         return
//       }

//       console.log("[Biometric] Success")
//       lastAuthTime = Date.now()
//     } catch (err) {
//       console.error("[Biometric] Error", err)
//       lastAuthTime = 0
//       lastForeground.value = 0
//       // setTimeout(() => authenticateUser(), 1000)
//     } finally {
//       isAuthenticating.value = false
//     }
//   }

//   onMounted(() => {
//     if (process.client) authenticateUser()

//     if (!listenerRegistered) {
//       listenerRegistered = true
//       console.log("[Biometric] Registering appStateChange listener")

//       App.addListener("appStateChange", (state) => {
//         console.log("[Biometric] appStateChange:", state.isActive)
//         if (!state.isActive) return

//         const now = Date.now()
//         if (now - lastAuthTime < 1000) {
//           console.log("[Biometric] Skipping — just authenticated")
//           return
//         }

//         if (now - lastForeground.value < 1000) {
//           console.log("[Biometric] Ignoring rapid resume")
//           return
//         }

//         lastForeground.value = now
//         if (resumeTimeout) clearTimeout(resumeTimeout)

//         resumeTimeout = setTimeout(async () => {
//           if (!isAuthenticating.value) {
//             await authenticateUser()
//           }
//         }, 1000)
//       })
//     }
//   })

//   return { checkBiometric: authenticateUser, isAuthenticating }
// }

// export const useBiometricLauncher = () => {
//   const { checkBiometric } = useBiometric()
//   const isAuthenticating = ref(false)
//   const lastForeground = ref(0)
//   const authenticateUser = async () => {
//     if (isAuthenticating.value) return

//     isAuthenticating.value = true
//     console.log("[Biometric] Starting authentication")

//     try {
//       const ok = await checkBiometric()
//       if (!ok) {
//         console.log("[Biometric] Failed — redirecting to lock screen")
//         window.location.href = "/"
//       } else {
//         console.log("[Biometric] Success")
//         lastAuthTime = Date.now()
//       }
//     } finally {
//       isAuthenticating.value = false
//     }
//   }

//   onMounted(() => {
//     if (process.client) authenticateUser()

//     if (!listenerRegistered) {
//       listenerRegistered = true
//       console.log("[Biometric] Registering appStateChange listener")

//       App.addListener("appStateChange", (state) => {
//         console.log("[Biometric] appStateChange:", state.isActive)
//         if (!state.isActive) return

//         // ✅ Skip if recently authenticated (<5s ago)
//         const now = Date.now()
//         if (now - lastAuthTime < 5000) {
//           console.log("[Biometric] Skipping — just authenticated")
//           return
//         }

//         if (now - lastForeground.value < 3000) {
//           console.log("[Biometric] Ignoring rapid resume")
//           return
//         }

//         lastForeground.value = now
//         if (resumeTimeout) clearTimeout(resumeTimeout)

//         resumeTimeout = setTimeout(async () => {
//           if (!isAuthenticating.value) {
//             await authenticateUser()
//           }
//         }, 1000)
//       })
//     }
//   })
// }

// let listenerRegistered = false
// let resumeTimeout: NodeJS.Timeout | null = null
// let lastAuthTime = 0

// export const useBiometricLauncher = () => {
//   const { checkBiometric } = useBiometric()
//   const isAuthenticating = ref(false)
//   const lastForeground = ref(0)
//   const settingStore = useSettingStore()
//   const authStore = useAuthStore()

//   const authenticateUser = async () => {
//     if (isAuthenticating.value) return
//     if (!settingStore.isUsingBiometric) return

//     isAuthenticating.value = true
//     console.log("[Biometric] Starting authentication")

//     try {
//       const ok = await checkBiometric()
//       if (!ok) {
//         console.log("[Biometric] Failed — redirecting to lock screen")
//         window.location.href = "/"
//       } else {
//         console.log("[Biometric] Success")
//         lastAuthTime = Date.now()
//       }
//     } finally {
//       isAuthenticating.value = false
//     }
//   }

//   onMounted(async () => {
//     await settingStore.loadFromSecureStorage() // ✅ wait until store is ready
//     if (settingStore.isUsingBiometric) {
//       console.log("[Splash] Launch biometric immediately")
//       authenticateUser()
//     }

//     if (!listenerRegistered) {
//       listenerRegistered = true
//       console.log("[Biometric] Registering appStateChange listener")

//       App.addListener("appStateChange", (state) => {
//         if (!settingStore.isUsingBiometric) return // skip if user disabled biometric

//         if (!state.isActive) return
//         const now = Date.now()

//         if (now - lastAuthTime < 5000) {
//           console.log("[Biometric] Skipping — just authenticated")
//           return
//         }

//         if (now - lastForeground.value < 3000) {
//           console.log("[Biometric] Ignoring rapid resume")
//           return
//         }

//         lastForeground.value = now
//         if (resumeTimeout) clearTimeout(resumeTimeout)

//         resumeTimeout = setTimeout(async () => {
//           if (!isAuthenticating.value) {
//             await authenticateUser()
//           }
//         }, 1000)
//       })
//     }
//   })

//   // Optional: watch for changes in isUsingBiometric
//   watch(
//     () => settingStore.isUsingBiometric,
//     (newVal) => {
//       if (newVal) authenticateUser()
//     }
//   )
// }
