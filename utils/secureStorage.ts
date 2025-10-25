import { SecureStoragePlugin } from "capacitor-secure-storage-plugin"

export const secureSet = async (key: string, value: string) => {
  await SecureStoragePlugin.set({ key, value })
}

export const secureGet = async (key: string): Promise<string | null> => {
  try {
    const result = await SecureStoragePlugin.get({ key })
    return result.value
  } catch (error) {
    console.log("store key missing", key, error)
    return null // if key does not exist
  }
}

export const secureRemove = async (key: string) => {
  await SecureStoragePlugin.remove({ key })
}

export const secureClear = async () => {
  await SecureStoragePlugin.clear()
}
