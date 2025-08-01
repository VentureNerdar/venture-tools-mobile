import { defineStore } from "pinia"
import { ref } from "vue"
import { SecureStoragePlugin } from "capacitor-secure-storage-plugin"

export const useUserStore = defineStore("user", () => {
  const users = ref<any>({})
  const userRoles = ref<any>([])

  // Load from secure storage
  const loadFromSecureStorage = async () => {
    try {
      const storedUsers = await SecureStoragePlugin.get({ key: "users" })
      users.value = JSON.parse(storedUsers.value) || {}
    } catch {
      users.value = {}
    }

    try {
      const storedRoles = await SecureStoragePlugin.get({ key: "userRoles" })
      userRoles.value = JSON.parse(storedRoles.value) || []
    } catch {
      userRoles.value = []
    }
  }

  // Save functions
  const setUsers = async (userValues: any) => {
    users.value = userValues
    await SecureStoragePlugin.set({
      key: "users",
      value: JSON.stringify(userValues),
    })
  }

  const setUserRoles = async (roleValues: any) => {
    userRoles.value = roleValues
    await SecureStoragePlugin.set({
      key: "userRoles",
      value: JSON.stringify(roleValues),
    })
  }

  return {
    users,
    userRoles,
    loadFromSecureStorage,
    setUsers,
    setUserRoles,
  }
})
