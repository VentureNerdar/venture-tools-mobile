import { defineStore } from "pinia"
import { ref } from "vue"
import { SecureStoragePlugin } from "capacitor-secure-storage-plugin"

export const useChurchStore = defineStore("church", () => {
  const churches = ref<any>({})

  const loadFromSecureStorage = async () => {
    try {
      const result = await SecureStoragePlugin.get({ key: "churches" })
      churches.value = JSON.parse(result.value)
    } catch (error) {
      console.log(error)
      churches.value = {}
    }
  }

  const setChurches = async (churchData: any) => {
    churches.value = churchData
    await SecureStoragePlugin.set({
      key: "churches",
      value: JSON.stringify(churchData),
    })
  }

  return { churches, loadFromSecureStorage, setChurches }
})
