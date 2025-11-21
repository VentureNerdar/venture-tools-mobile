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
  const isLoading = ref<boolean>(true)
  const loginTime = ref<number | null>(null)

  // Load from secure storage on store init
  const loadFromSecureStorage = async () => {
    try {
      isLoading.value = true

      const storedAuthUser = await secureGet("authUser")
      const storedToken = await secureGet("Bearer")

      if (storedAuthUser?.value) {
        authUser.value = JSON.parse(storedAuthUser.value)
      }

      if (storedToken?.value) {
        token.value = storedToken.value
      }

      if (token.value && !authUser.value) {
        await fetchUser()
      }

      const storedLoginTime = await secureGet("loginTime")
      if (storedLoginTime?.value) {
        loginTime.value = Number(storedLoginTime.value)
      }

      isLoading.value = false
    } catch (e) {
      console.error("[AuthStore] loadFromSecureStorage error:", e)
    }
  }

  async function fetchUser() {
    const bearer = await secureGet("Bearer")

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
      await secureSet("authUser", JSON.stringify(response))
    }
  }

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
            if (currentNotificationToken) {
              await secureSet("notificationToken", currentNotificationToken)
            }

            onMessage(messaging, (payload) => {
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
            secureSet("notificationToken", currentNotificationToken)
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

      await secureSet("deviceId", deviceId)

      const bearer = await secureGet("Bearer")
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
      secureSet("Bearer", token.value)
      const now = Date.now()
      loginTime.value = now
      await secureSet("loginTime", String(now))

      await registerDevice(response.user.id)
      await fetchUser()
    }

    return response
  }

  async function logout() {
    const bearer = await secureGet("Bearer")
    const deviceId = await secureGet("deviceId")
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
    await secureRemove("Bearer")
    await secureRemove("authUser")
    await secureRemove("deviceId")
    await secureRemove("loginTime")

    user.value = null
    authUser.value = null
    token.value = ""
    loginTime.value = null

    router.replace({ path: "/" })
  }

  function isLoginExpired(): boolean {
    if (!loginTime.value) return true

    const now = Date.now()
    // 24 hours
    const hoursPassed = (now - loginTime.value) / (1000 * 60 * 60)
    return hoursPassed >= 24

    // Testing 3 min
    // const minutesPassed = (now - loginTime.value) / (1000 * 60)
    // return minutesPassed >= 3
  }

  return {
    user,
    authUser,
    token,
    isLoading,
    loginTime,
    loadFromSecureStorage,
    login,
    fetchUser,
    logout,
    isLoginExpired,
  }
})
