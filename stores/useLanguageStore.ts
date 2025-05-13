import { defineStore } from "pinia"

export const useLanguageStore = defineStore("languages", () => {
  const languages = ref<any[]>(JSON.parse(localStorage.getItem("languages") || "[]"))
  const words = ref<any[]>(JSON.parse(localStorage.getItem("languageWords") || "[]"))
  const setLanguages = (languageValues: any[]) => {
    languages.value = languageValues
    localStorage.setItem("languages", JSON.stringify(languageValues))
  }
  const setWords = (wordValues: any[]) => {
    words.value = wordValues
    localStorage.setItem("languageWords", JSON.stringify(wordValues))
  }
  return { languages, words, setLanguages, setWords }
})
