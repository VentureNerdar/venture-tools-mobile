import { defineStore } from "pinia"
import type { Credentials, AuthUser } from "~~/types"

type User = {
  id?: number
  name: string
  email: string
}

/*
type Credentials = {
  email: string;
  password: string;
};
*/

type Header = {
  Accept: string
  "Content-Type": string
  Authorization: string
}

type LoginResponse = {
  token: string
  user: AuthUser
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

      return
    })

    if (response) {
      user.value = response as User
      authUser.value = response as User
      localStorage.setItem("authUser", JSON.stringify(response) as string)
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
      // todo : throw error
      console.log(error)

      return
    })) as LoginResponse

    if (response && "token" in response) {
      token.value = "Bearer " + response.token
      localStorage.setItem("Bearer", token.value)
      await fetchUser()
    }

    return response
  }

  async function logout() {
    const token = localStorage.getItem("Bearer") || ""

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
      headers: headers,
    }).catch((error) => {
      console.log(error)
      return
    })

    user.value = null

    localStorage.removeItem("Bearer")

    navigateTo("/")
  }

  return { user, login, fetchUser, logout, authUser }
})
