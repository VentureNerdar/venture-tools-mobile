import { defineStore } from "pinia"

export const useLanguageStore = defineStore("languages", () => {
  const languages = JSON.parse(localStorage.getItem("languages") || "[]")
  const words = JSON.parse(localStorage.getItem("languageWords") || "[]")
  return { languages, words }
})
