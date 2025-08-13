<template>
  <VanConfigProvider
    :theme="currentTheme"
    :theme-vars="currentThemeVars"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </VanConfigProvider>
</template>

<script setup lang="ts">
import type { ConfigProviderThemeVars } from "vant"
import { useThemeStore } from "./stores/useTheme"
import { App } from "@capacitor/app"
import { useRouter } from "vue-router"

// SETUP BACK BUTTON ON ANDROID
App.addListener("backButton", () => {
  const router = useRouter()
  if (router.currentRoute.value.path !== "/") {
    router.back()
  } else {
    App.exitApp()
  }
})

// SETUP THEME STORE

const themeStore = useThemeStore()

const darkTheme = "dark"
const lightTheme = "light"

const currentTheme = computed(() =>
  themeStore.darkMode ? darkTheme : lightTheme
)

const bgColor1 = "#021526"
const bgColor2 = "#0a233d"
const bgColor3 = "#0c3156"
const colorTransparent = "rgba(255, 255, 255, 0.1)"
const colorTransparent2 = "rgba(255, 255, 255, 0.5)"

// light theme
const lightBgColor1 = "#ffffff"
const lightBgColor2 = "#f7f8fa"
const lightBgColor3 = "#e5e5e5"

const colorTransparentLight = "rgba(0, 0, 0, 0.06)"
const colorTransparentLight2 = "rgba(0, 0, 0, 0.3)"

const darkThemeVars: ConfigProviderThemeVars = {
  borderColor: colorTransparent,
  primaryColor: "#17badf",

  background: bgColor1,
  navBarBackground: bgColor2,

  tabbarBackground: bgColor2,
  tabbarItemActiveBackground: bgColor3,
  tabsNavBackground: bgColor3,

  searchBackground: bgColor3,
  searchContentBackground: bgColor2,
  searchActionTextColor: "blue",
  fieldPlaceholderTextColor: colorTransparent2,

  cellGroupBackground: bgColor2,
  cellGroupTitleColor: colorTransparent2,

  cellBackground: bgColor2,
  cellActiveColor: bgColor3,
  cellBorderColor: colorTransparent,

  passwordInputBackground: bgColor2,
  pickerBackground: bgColor2,
  pickerMaskColor:
    "linear-gradient(180deg, rgba(0, 0, 0, .4), rgba(0, 0, 0, .1)), linear-gradient(0deg, rgba(0, 0, 0, .4), rgba(0, 0, 0, .1))",

  numberKeyboardBackground: bgColor2,
  numberKeyboardKeyBackground: bgColor2,
  numberKeyboardKeyActiveColor: bgColor3,

  popupBackground: bgColor2,

  dialogBackground: bgColor2,
}

const lightThemeVars: ConfigProviderThemeVars = {
  borderColor: colorTransparentLight,
  primaryColor: "#17badf",

  background: lightBgColor1,
  navBarBackground: lightBgColor2,

  tabbarBackground: lightBgColor2,
  tabbarItemActiveBackground: lightBgColor3,
  tabsNavBackground: lightBgColor2,

  searchBackground: lightBgColor2,
  searchContentBackground: "#ffffff",
  searchActionTextColor: "#1989fa",
  fieldPlaceholderTextColor: colorTransparentLight2,

  cellGroupBackground: "#ffffff",
  cellGroupTitleColor: colorTransparentLight2,

  cellBackground: "#ffffff",
  cellActiveColor: lightBgColor3,
  cellBorderColor: colorTransparentLight,

  passwordInputBackground: "#ffffff",
  pickerBackground: "#ffffff",
  pickerMaskColor:
    "linear-gradient(180deg, rgba(255, 255, 255, .8), rgba(255, 255, 255, .4)), linear-gradient(0deg, rgba(255, 255, 255, .8), rgba(255, 255, 255, .4))",

  numberKeyboardBackground: "#ffffff",
  numberKeyboardKeyBackground: "#ffffff",
  numberKeyboardKeyActiveColor: lightBgColor3,

  popupBackground: "#ffffff",
  dialogBackground: "#ffffff",
}

const currentThemeVars = computed(() =>
  themeStore.darkMode ? darkThemeVars : lightThemeVars
)
</script>

<style lang="scss">
.van-theme-dark body {
  color: #f5f5f5;
  background-color: #021526;
}
</style>
