import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { SecureStoragePlugin } from "capacitor-secure-storage-plugin"
import type { LanguageFormModel } from "~/types"

interface Status {
  id: number
  name: string
  type: "contact" | "group" | "faith_status"
}

export const useSettingStore = defineStore("setting", () => {
  const statuses = ref<Status[]>([])
  const pinNumber = ref<boolean>(false)
  const pinCode = ref<string>("")
  // const applicationMask = ref<boolean>(false)
  // const userPreferredLanguage = ref<LanguageFormModel | null>(null)

  // const currentPreferredLanguage = computed(() => userPreferredLanguage.value)

  const contactStatuses = computed(() =>
    statuses.value.filter((s: Status) => s.type === "contact")
  )

  const groupStatuses = computed(() =>
    statuses.value.filter((s: Status) => s.type === "group")
  )

  const faithStatuses = computed(() =>
    statuses.value.filter((s: Status) => s.type === "faith_status")
  )

  const options = computed(() => ({
    contact: contactStatuses.value.map((s: any) => ({
      text: s.name,
      value: s.id,
    })),
    group: groupStatuses.value.map((s: any) => ({
      text: s.name,
      value: s.id,
    })),
    faith: faithStatuses.value.map((s: any) => ({
      text: s.name,
      value: s.id,
    })),
    ageGroups: [
      { value: "Under 18 years old", text: "Under 18 years old" },
      { value: "18-25 years old", text: "18-25 years old" },
      { value: "26-40 years old", text: "26-40 years old" },
      { value: "Over 40 years old", text: "Over 40 years old" },
    ],
    genders: [
      { text: "Male", value: "male" },
      { text: "Female", value: "female" },
    ],
  }))

  const loadFromSecureStorage = async () => {
    try {
      const storedStatuses = await SecureStoragePlugin.get({ key: "statuses" })
      statuses.value = JSON.parse(storedStatuses.value)
    } catch {
      statuses.value = []
    }

    try {
      const storedPin = await SecureStoragePlugin.get({ key: "PINNumber" })
      pinNumber.value = JSON.parse(storedPin.value)
    } catch {
      pinNumber.value = false
    }

    // try {
    //   const storedLang = await SecureStoragePlugin.get({
    //     key: "user_preferred_language",
    //   })
    //   userPreferredLanguage.value = JSON.parse(storedLang.value)
    // } catch {
    //   userPreferredLanguage.value = null
    // }

    try {
      const storedPin = await SecureStoragePlugin.get({ key: "PINNumber" })
      const parsedPin = JSON.parse(storedPin.value)
      pinCode.value = parsedPin
      pinNumber.value = !!parsedPin
    } catch {
      pinCode.value = ""
      pinNumber.value = false
    }
  }

  // const setUserPreferredLanguage = async (lang: LanguageFormModel) => {
  //   userPreferredLanguage.value = lang
  //   await SecureStoragePlugin.set({
  //     key: "user_preferred_language",
  //     value: JSON.stringify(lang),
  //   })
  // }

  const setStatuses = async (status: Status[]) => {
    statuses.value = status
    await SecureStoragePlugin.set({
      key: "statuses",
      value: JSON.stringify(status),
    })
  }

  // const setApplicationMask = async (value: boolean) => {
  //   applicationMask.value = value
  //   await SecureStoragePlugin.set({
  //     key: "applicationMask",
  //     value: value.toString(),
  //   })
  // }

  const setPinNumber = async (value: string) => {
    pinCode.value = value
    await SecureStoragePlugin.set({
      key: "PINNumber",
      value: JSON.stringify(value),
    })
  }

  const removePinNumber = async () => {
    pinCode.value = ""
    pinNumber.value = false
    await SecureStoragePlugin.remove({ key: "PINNumber" })
  }

  return {
    statuses,
    contactStatuses,
    groupStatuses,
    faithStatuses,
    options,
    // userPreferredLanguage,
    // currentPreferredLanguage,
    pinNumber,
    pinCode,
    // applicationMask,
    /** methods **/
    loadFromSecureStorage,
    // setUserPreferredLanguage,
    // setApplicationMask,
    setPinNumber,
    setStatuses,
    removePinNumber,
  }
})
