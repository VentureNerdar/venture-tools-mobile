import { defineStore } from "pinia"
import type { LanguageFormModel } from "~/types"

interface Status {
  id: number
  name: string
  type: 'contact' | 'group' | 'faith_status'
}
export const useSettingStore = defineStore("setting", () => {
  const statuses = ref<Status[]>(JSON.parse(localStorage.getItem('statuses') || '[]'))

  const pinNumber = JSON.parse(localStorage.getItem("PINNumber") || "false")
  const applicationMask = ref(localStorage.getItem("applicationMask") === "true")
  const userPreferredLanguage = ref<LanguageFormModel>(
    JSON.parse(localStorage.getItem("user_preferred_language") || "null"),
  )

  const currentPreferredLanguage = computed(() => userPreferredLanguage)

  const contactStatuses = computed(() =>
    statuses.value.filter((s: any) => s.type === "contact"),
  )

  const groupStatuses = computed(() =>
    statuses.value.filter((s: any) => s.type === "group"),
  )

  const faithStatuses = computed(() =>
    statuses.value.filter((s: any) => s.type === "faith_status"),
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

  function setUserPreferredLanguage(lang: LanguageFormModel) {
    userPreferredLanguage.value = lang
    localStorage.setItem("user_preferred_language", JSON.stringify(lang))
  }
  function setStatuses(status: Status[]) {
    statuses.value = status
    // localStorage.setItem("statuses", JSON.stringify(statuses))
  }

  function setApplicationMask(value: boolean) {
    applicationMask.value = value
    localStorage.setItem("applicationMask", value.toString())
  }

  return {
    statuses,
    contactStatuses,
    groupStatuses,
    faithStatuses,
    options,
    userPreferredLanguage,
    setUserPreferredLanguage,
    currentPreferredLanguage,
    pinNumber,
    applicationMask,
    setApplicationMask,
    setStatuses,
  }
})
