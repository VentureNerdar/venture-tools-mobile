import { defineStore } from "pinia"
import { ref } from "vue"
import { SecureStoragePlugin } from "capacitor-secure-storage-plugin"

export const useContactStore = defineStore("contact", () => {
  const contacts = ref<any>({})

  // Load contacts from secure storage
  const loadFromSecureStorage = async () => {
    try {
      // const storedContacts = await SecureStoragePlugin.get({ key: "contacts" })
      const storedContacts = await secureGet("contacts")
      if (storedContacts.value) {
        contacts.value = JSON.parse(storedContacts.value)
      }
    } catch (error) {
      console.log(error)
      contacts.value = {}
    }
  }

  // Save contacts to secure storage
  const setContacts = async (data: any) => {
    contacts.value = data
    await secureSet("contacts", JSON.stringify(data))
    // await SecureStoragePlugin.set({
    //   key: "contacts",
    //   value: JSON.stringify(data),
    // })
  }

  return {
    contacts,
    loadFromSecureStorage,
    setContacts,
  }
})
