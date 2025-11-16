import { defineStore } from "pinia"
import { ref } from "vue"
import { SecureStoragePlugin } from "capacitor-secure-storage-plugin"

export const useCommunicationPlatformStore = defineStore(
  "communicationPlatform",
  () => {
    const communicationPlatforms = ref<any>({})

    // Load from secure storage
    const loadFromSecureStorage = async () => {
      try {
        // const result = await SecureStoragePlugin.get({
        //   key: "communicationPlatforms",
        // })
        const result = await secureGet("communicationPlatforms")
        if (result.value) {
          communicationPlatforms.value = JSON.parse(result.value)
        }
      } catch (error) {
        console.log(error)
        communicationPlatforms.value = {}
      }
    }

    // Save to secure storage
    const setCommunicationPlatforms = async (
      communicationPlatformValues: any
    ) => {
      communicationPlatforms.value = communicationPlatformValues
      await secureSet(
        "communicationPlatforms",
        JSON.stringify(communicationPlatformValues)
      )
      // await SecureStoragePlugin.set({
      //   key: "communicationPlatforms",
      //   value: JSON.stringify(communicationPlatformValues),
      // })
    }

    return {
      communicationPlatforms,
      loadFromSecureStorage,
      setCommunicationPlatforms,
    }
  }
)
