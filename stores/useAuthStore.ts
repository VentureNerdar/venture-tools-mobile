import { defineStore } from "pinia"
import type { Credentials, AuthUser } from "~/types"
import { app } from "~/utils/firebase"

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
  const authUser = ref(JSON.parse(localStorage.getItem("authUser") || "{}"))
  const token = ref(localStorage.getItem("Bearer") || "")

  async function fetchUser() {
    const token = localStorage.getItem("Bearer") || ""

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    } as Header

    if (token) {
      headers["Authorization"] = token as string
    }

    const response = await $fetch(config.public.apiURL + "auth/user", {
      method: "GET",
      credentials: "include",
      headers: headers,
    }).catch((error) => {
      // todo throw error
      console.log(error)
    })

    if (response) {
      user.value = response as User
      authUser.value = response as User
      localStorage.setItem("authUser", JSON.stringify(response) as string)
    }
  }

  async function registerDevice(userId: number) {
    try {
      // Generate a unique device ID
      const deviceId = generateDeviceId()
      let currentNotificationToken = null

      // Generate FCM Token and initialize Firebase Messaging
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
            localStorage.setItem("notificationToken", currentNotificationToken)
          }
        }

        onMessage(messaging, (payload) => {
          console.log("Message received in foreground:", payload)
          if (payload.notification?.title && payload.notification?.body) {
            const { title, body } = payload.notification
            new Notification(title, {
              body,
              icon: "/logo-vertical.png",
            })
          }
        })
      } catch (err) {
        console.error("FCM error:", err)
      }

      // Store device ID in localStorage
      localStorage.setItem("deviceId", deviceId)

      const token = localStorage.getItem("Bearer") || ""
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      }

      // Register device with backend
      await $fetch(`${config.public.apiURL}users/id/${userId}/devices`, {
        method: "POST",
        body: {
          device_id: deviceId,
          device_type: "web",
          device_name: navigator.userAgent,
          notification_token: currentNotificationToken,
        },
        headers: headers,
      })
    } catch (error: any) {
      console.error("Error registering device:", error)
    }
  }

  function generateDeviceId(): string {
    return "mobile_" + crypto.randomUUID()
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
      // todo : throw error
      console.log(error)

      return
    })) as LoginResponse

    if (response && "token" in response) {
      token.value = "Bearer " + response.token
      localStorage.setItem("Bearer", token.value)

      await registerDevice(response.user.id)
      await fetchUser()
    }

    return response
  }

  async function logout() {
    const token = localStorage.getItem("Bearer") || ""
    const deviceId = localStorage.getItem("deviceId") || ""

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    } as Header

    if (token) {
      headers["Authorization"] = token as string
    }

    await $fetch(config.public.apiURL + "auth/logout", {
      method: "POST",
      credentials: "include",
      body: {
        device_id: deviceId,
      },
      headers: headers,
    }).catch((error) => {
      console.log(error)
      return
    })

    user.value = null
    localStorage.clear()
    navigateTo("/")
  }

  return { user, login, fetchUser, logout, authUser }
})
