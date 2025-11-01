// ~/utils/storage.ts
import { Capacitor } from "@capacitor/core"
import { SecureStoragePlugin } from "capacitor-secure-storage-plugin"

const isNative = Capacitor.isNativePlatform()

export const secureSet = async (key: string, value: string) => {
  if (isNative) {
    await SecureStoragePlugin.set({ key, value })
  } else {
    localStorage.setItem(key, value)
  }
}

export const secureGet = async (
  key: string
): Promise<{ value: string | null }> => {
  if (isNative) {
    return SecureStoragePlugin.get({ key }).catch(() => ({ value: null }))
  } else {
    const value = localStorage.getItem(key)
    return { value }
  }
}

export const secureRemove = async (key: string) => {
  if (isNative) {
    await SecureStoragePlugin.remove({ key })
  } else {
    localStorage.removeItem(key)
  }
}
