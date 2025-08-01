import { defineStore } from "pinia"
import { ref } from "vue"
import { SecureStoragePlugin } from "capacitor-secure-storage-plugin"

export const useDenominationStore = defineStore("denomination", () => {
  const denominations = ref<any>({})

  // Load denominations from secure storage
  const loadFromSecureStorage = async () => {
    try {
      const storedDenominations = await SecureStoragePlugin.get({
        key: "denominations",
      })
      denominations.value = JSON.parse(storedDenominations.value)
    } catch (error) {
      console.log(error)
      denominations.value = {}
    }
  }

  // Save denominations to secure storage
  const setDenominations = async (data: any) => {
    denominations.value = data
    await SecureStoragePlugin.set({
      key: "denominations",
      value: JSON.stringify(data),
    })
  }

  return {
    denominations,
    loadFromSecureStorage,
    setDenominations,
  }
})
