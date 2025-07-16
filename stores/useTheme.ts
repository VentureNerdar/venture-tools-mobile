import { defineStore } from "pinia"

export const useThemeStore = defineStore("theme", {
  state: () => ({
    darkMode: JSON.parse(localStorage.getItem("darkMode") ?? "true"),
  }),
  actions: {
    toggleTheme() {
      this.darkMode = !this.darkMode
      localStorage.setItem("darkMode", JSON.stringify(this.darkMode))
    },
    setDarkMode(value: boolean) {
      this.darkMode = value
      localStorage.setItem("darkMode", JSON.stringify(value))
    },
  },
})
