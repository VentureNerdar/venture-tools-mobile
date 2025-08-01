import { defineStore } from "pinia"
import { secureGet, secureSet } from "@/utils/secureStorage"

export const useLanguageStore = defineStore("languages", () => {
  const languages = ref<any[]>([])
  const words = ref<any[]>([])

  const loadFromSecureStorage = async () => {
    const storedLanguages = await secureGet("languages")
    const storedWords = await secureGet("languageWords")

    if (storedLanguages) {
      languages.value = JSON.parse(storedLanguages)
    }
    if (storedWords) {
      words.value = JSON.parse(storedWords)
    }
  }

  const setLanguages = async (languageValues: any[]) => {
    languages.value = languageValues
    await secureSet("languages", JSON.stringify(languageValues))
  }

  const setWords = async (wordValues: any[]) => {
    words.value = wordValues
    await secureSet("languageWords", JSON.stringify(wordValues))
  }

  return {
    languages,
    words,
    loadFromSecureStorage,
    setLanguages,
    setWords,
  }
})

// import { defineStore } from "pinia"

// export const useLanguageStore = defineStore("languages", () => {
//   const languages = ref<any[]>(JSON.parse(localStorage.getItem("languages") || "[]"))
//   const words = ref<any[]>(JSON.parse(localStorage.getItem("languageWords") || "[]"))
//   const setLanguages = (languageValues: any[]) => {
//     languages.value = languageValues
//     localStorage.setItem("languages", JSON.stringify(languageValues))
//   }
//   const setWords = (wordValues: any[]) => {
//     words.value = wordValues
//     localStorage.setItem("languageWords", JSON.stringify(wordValues))
//   }
//   return { languages, words, setLanguages, setWords }
// })
