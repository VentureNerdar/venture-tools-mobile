import { defineStore } from "pinia"
import type { LanguageFormModel } from "~/types"

export const useLanguageStore = defineStore("languages", () => {
  const languages = ref<any[]>(
    JSON.parse(localStorage.getItem("languages") || "[]")
  )
  const words = ref<any[]>(
    JSON.parse(localStorage.getItem("languageWords") || "[]")
  )
  const userPreferredLanguage = ref<LanguageFormModel | null>(
    JSON.parse(localStorage.getItem("user_preferred_language") || "null")
  )

  const currentPreferredLanguage = computed(() => userPreferredLanguage.value)
  const setLanguages = (languageValues: any[]) => {
    languages.value = languageValues
    localStorage.setItem("languages", JSON.stringify(languageValues))
  }
  const setWords = (wordValues: any[]) => {
    words.value = wordValues
    localStorage.setItem("languageWords", JSON.stringify(wordValues))
  }
  const setUserPreferredLanguage = (lang: LanguageFormModel | null) => {
    userPreferredLanguage.value = lang
    if (lang) {
      localStorage.setItem("user_preferred_language", JSON.stringify(lang))
    } else {
      localStorage.removeItem("user_preferred_language")
    }
  }
  return {
    languages,
    words,
    userPreferredLanguage,
    currentPreferredLanguage,
    setLanguages,
    setWords,
    setUserPreferredLanguage,
  }
})
