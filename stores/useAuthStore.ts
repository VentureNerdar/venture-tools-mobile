import { defineStore } from "pinia"
import type { Credentials, AuthUser } from "~/types"
import { app } from "~/utils/firebase"
import { SecureStoragePlugin } from "capacitor-secure-storage-plugin"

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
    }
  }

  async function registerDevice(userId: number) {
    try {
      const deviceId = "mobile_" + crypto.randomUUID()
      let currentNotificationToken: string | null = null

      try {
        const vapidKey = (config as unknown as FirebaseConfig).public.firebase
          .vapidKey
        const { getMessaging, getToken, onMessage } = await import(
          "firebase/messaging"
        )
        const messaging = getMessaging(app)

        const permission = await Notification.requestPermission()
        if (permission === "granted") {
          currentNotificationToken = await getToken(messaging, { vapidKey })
          if (currentNotificationToken) {
            await SecureStoragePlugin.set({
              key: "notificationToken",
              value: currentNotificationToken,
            })
          }
        }

        onMessage(messaging, (payload) => {
          console.log("Message received in foreground:", payload)
          if (payload.notification?.title && payload.notification?.body) {
            const { title, body } = payload.notification
            new Notification(title, { body, icon: "/logo-vertical.png" })
          }
        })
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
          device_type: "web",
          device_name: navigator.userAgent,
          notification_token: currentNotificationToken,
        },
        headers,
      })
    } catch (error) {
      console.error("Error registering device:", error)
    }
  }

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

    console.log("Auth Store Login res", response)

    if (response && "token" in response) {
      token.value = "Bearer " + response.token
      await SecureStoragePlugin.set({
        key: "Bearer",
        value: token.value,
      })

      await registerDevice(response.user.id)
      await fetchUser()
    }

    return response
  }

  async function logout() {
    const bearer = await SecureStoragePlugin.get({ key: "Bearer" })
    const deviceId = await SecureStoragePlugin.get({ key: "deviceId" })

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
    await SecureStoragePlugin.remove({ key: "notificationToken" })

    navigateTo("/")
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
