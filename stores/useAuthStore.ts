import { defineStore } from "pinia"
import type { Credentials, AuthUser } from "~/types"
import { app } from "~/utils/firebase"
import { SecureStoragePlugin } from "capacitor-secure-storage-plugin"
import { Capacitor } from "@capacitor/core"
import {
  FirebaseMessaging,
  type GetTokenOptions,
} from "@capacitor-firebase/messaging"
import { LocalNotifications } from "@capacitor/local-notifications"

type User = {
  id?: number
  name: string
  email: string
}

type Header = {
  Accept: string
  "Content-Type": string
  Authorization: string
}

type LoginResponse = {
  token: string
  user: AuthUser
}

interface FirebaseConfig {
  public: {
    firebase: {
      vapidKey: string
    }
  }
}

export const useAuthStore = defineStore("auth", () => {
  const config = useRuntimeConfig()
  const user = ref<User | null>(null)
  const authUser = ref<AuthUser | null>(null)
  const token = ref<string>("")
  const router = useRouter()

  // Load from secure storage on store init
  const loadFromSecureStorage = async () => {
    const storedAuthUser = await SecureStoragePlugin.get({ key: "authUser" })
    // const storedToken = await secureGet("Bearer")
    const storedToken = await SecureStoragePlugin.get({ key: "Bearer" })

    if (storedAuthUser.value) {
      authUser.value = JSON.parse(storedAuthUser.value)
    }
    if (storedToken.value) {
      token.value = storedToken.value
    }
  }

  async function fetchUser() {
    const bearer = await SecureStoragePlugin.get({ key: "Bearer" })

    const headers: Header = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearer.value || "",
    }

    const response = await $fetch(config.public.apiURL + "auth/user", {
      method: "GET",
      credentials: "include",
      headers,
    }).catch((error) => {
      console.log(error)
    })

    if (response) {
      user.value = response as User
      authUser.value = response as AuthUser
      await SecureStoragePlugin.set({
        key: "authUser",
        value: JSON.stringify(response),
      })
      // localStorage.setItem("authUser", JSON.stringify(response))
    }
  }

  // async function registerDevice(userId: number) {
  //     try {
  //       const deviceId = "mobile_" + crypto.randomUUID()
  //       let currentNotificationToken: string | null = null
  //       const platform = Capacitor.getPlatform() // 'web' or 'android'

  //       try {
  //         const vapidKey = (config as unknown as FirebaseConfig).public.firebase.vapidKey

  //         if (platform === "web") {
  //           // Web-specific FCM
  //           const { getMessaging, getToken, onMessage } = await import("firebase/messaging")
  //           const messaging = getMessaging(app)

  //           const permission = await Notification.requestPermission()
  //           if (permission === "granted") {
  //             currentNotificationToken = await getToken(messaging, { vapidKey })
  //             if (currentNotificationToken) {
  //               await SecureStoragePlugin.set({
  //                 key: "notificationToken",
  //                 value: currentNotificationToken,
  //               })
  //             }

  //             onMessage(messaging, (payload) => {
  //               console.log("Message received in foreground:", payload)
  //               if (payload.notification?.title && payload.notification?.body) {
  //                 const { title, body } = payload.notification
  //                 new Notification(title, { body, icon: "/logo-vertical.png" })
  //               }
  //             })
  //           }
  //         } else {
  //           // Android (Capacitor)
  //           const { receive } = await FirebaseMessaging.requestPermissions()
  //           if (receive !== "granted") {
  //             console.error("Notification permissions denied")
  //             return
  //           }

  //           const options: GetTokenOptions = { vapidKey }
  //           currentNotificationToken = (await FirebaseMessaging.getToken(options)).token
  //           if (currentNotificationToken) {
  //             await SecureStoragePlugin.set({
  //               key: "notificationToken",
  //               value: currentNotificationToken,
  //             })
  //           }

  //           // Handle foreground notifications
  //           FirebaseMessaging.addListener("notificationReceived", (event) => {
  //             console.log("Notification received:", event.notification)
  //             // Handle notification (e.g., show in-app alert)
  //           })

  //           // Handle notification taps
  //           FirebaseMessaging.addListener("notificationActionPerformed", (event) => {
  //             console.log("Notification action:", event)
  //             // Navigate or handle click
  //           })
  //         }
  //       } catch (err) {
  //         console.error("FCM error:", err)
  //       }

  //       await SecureStoragePlugin.set({
  //         key: "deviceId",
  //         value: deviceId,
  //       })

  //       const bearer = await SecureStoragePlugin.get({ key: "Bearer" })
  //       const headers: Header = {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: bearer.value || "",
  //       }

  //       await $fetch(`${config.public.apiURL}users/id/${userId}/devices`, {
  //         method: "POST",
  //         body: {
  //           device_id: deviceId,
  //           device_type: platform, // 'web' or 'android'
  //           device_name: platform === "web" ? navigator.userAgent : "Android Device",
  //           notification_token: currentNotificationToken,
  //         },
  //         headers,
  //       })
  //     } catch (error) {
  //       console.error("Error registering device:", error)
  //     }
  //   }

  async function registerDevice(userId: number) {
    try {
      const deviceId = "mobile_" + crypto.randomUUID()
      let currentNotificationToken: string | null = null
      const platform = Capacitor.getPlatform() // 'web' or 'android'

      try {
        const vapidKey = (config as unknown as FirebaseConfig).public.firebase
          .vapidKey

        if (platform === "web") {
          // Web-specific FCM
          const { getMessaging, getToken, onMessage } = await import(
            "firebase/messaging"
          )
          const messaging = getMessaging(app)

          const permission = await Notification.requestPermission()
          console.log("Web notification permission:", permission)
          if (permission === "granted") {
            currentNotificationToken = await getToken(messaging, { vapidKey })
            console.log("Web FCM token:", currentNotificationToken)
            if (currentNotificationToken) {
              await SecureStoragePlugin.set({
                key: "notificationToken",
                value: currentNotificationToken,
              })
            }

            onMessage(messaging, (payload) => {
              console.log(
                "Web foreground message received:",
                JSON.stringify(payload, null, 2)
              )
              if (payload.notification?.title && payload.notification?.body) {
                const { title, body } = payload.notification
                new Notification(title, { body, icon: "/logo-vertical.png" })
              }
            })
          } else {
            console.error("Web notification permission denied")
          }
        } else {
          // Android (Capacitor)
          const { receive } = await FirebaseMessaging.requestPermissions()
          console.log("Android notification permission:", receive)
          if (receive !== "granted") {
            console.error("Android notification permissions denied")
            return
          }

          const options: GetTokenOptions = { vapidKey }
          currentNotificationToken = (await FirebaseMessaging.getToken(options))
            .token
          console.log("Android FCM token:", currentNotificationToken)
          if (currentNotificationToken) {
            await SecureStoragePlugin.set({
              key: "notificationToken",
              value: currentNotificationToken,
            })
          }

          // Handle foreground notifications ***
          FirebaseMessaging.addListener(
            "notificationReceived",
            async (event) => {
              console.log(
                "Android notification received:",
                JSON.stringify(event.notification, null, 2)
              )
              if (event.notification?.title && event.notification?.body) {
                try {
                  await LocalNotifications.schedule({
                    notifications: [
                      {
                        id: Math.floor(Date.now() / 1000),
                        title: event.notification.title,
                        body: event.notification.body,
                        smallIcon: "notification_icon", // Matches @mipmap/notification_icon
                      },
                    ],
                  })
                  console.log("Local notification scheduled")
                } catch (error) {
                  console.error("Error scheduling local notification:", error)
                }
              } else {
                console.warn(
                  "Notification missing title or body:",
                  event.notification
                )
              }
            }
          )

          // Handle notification taps
          FirebaseMessaging.addListener(
            "notificationActionPerformed",
            (event) => {
              console.log(
                "Android notification action:",
                JSON.stringify(event, null, 2)
              )
              // Handle tap, e.g., navigate to a route
            }
          )
        }
      } catch (err) {
        console.error("FCM error:", err)
      }

      await SecureStoragePlugin.set({
        key: "deviceId",
        value: deviceId,
      })

      const bearer = await SecureStoragePlugin.get({ key: "Bearer" })
      const headers: Header = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: bearer.value || "",
      }

      await $fetch(`${config.public.apiURL}users/id/${userId}/devices`, {
        method: "POST",
        body: {
          device_id: deviceId,
          device_type: platform,
          device_name:
            platform === "web" ? navigator.userAgent : "Android Device",
          notification_token: currentNotificationToken,
        },
        headers,
      }).catch((error) => {
        console.error("Error registering device with server:", error)
      })
    } catch (error) {
      console.error("Error in registerDevice:", error)
    }
  }

  // ------

  async function login(credentials: Credentials) {
    await $fetch(config.public.rootURL + "sanctum/csrf-cookie", {
      method: "GET",
      credentials: "include",
    })

    const response = (await $fetch(config.public.apiURL + "login", {
      method: "POST",
      body: credentials,
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error)
      return
    })) as LoginResponse

    if (response && "token" in response) {
      token.value = "Bearer " + response.token
      await SecureStoragePlugin.set({
        key: "Bearer",
        value: token.value,
      })
      // localStorage.setItem("Barer", JSON.stringify(token.value))

      await registerDevice(response.user.id)
      await fetchUser()
    }

    return response
  }

  async function logout() {
    const bearer = await SecureStoragePlugin.get({ key: "Bearer" })
    const deviceId = await SecureStoragePlugin.get({ key: "deviceId" })
    const router = useRouter()

    const headers: Header = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: bearer.value || "",
    }

    await $fetch(config.public.apiURL + "auth/logout", {
      method: "POST",
      credentials: "include",
      body: { device_id: deviceId },
      headers,
    }).catch((error) => {
      console.log(error)
    })

    user.value = null
    authUser.value = null
    token.value = ""

    await SecureStoragePlugin.remove({ key: "Bearer" })
    await SecureStoragePlugin.remove({ key: "authUser" })
    await SecureStoragePlugin.remove({ key: "deviceId" })
    // await SecureStoragePlugin.remove({ key: "notificationToken" })
    router.replace({ path: "/" })
  }

  return {
    user,
    authUser,
    token,
    loadFromSecureStorage,
    login,
    fetchUser,
    logout,
  }
})
