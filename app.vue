<template>
  <VanConfigProvider theme="dark" :theme-vars="themeVars">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </VanConfigProvider>
</template>

<script setup lang="ts">
import type { ConfigProviderThemeVars } from "vant"

const bgColor1 = "#021526"
const bgColor2 = "#0a233d"
const bgColor3 = "#0c3156"

const colorTransparent = "rgba(255, 255, 255, 0.1)"
const colorTransparent2 = "rgba(255, 255, 255, 0.5)"

const themeVars: ConfigProviderThemeVars = {
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
}
</script>

<style lang="scss">
.van-theme-dark body {
  color: #f5f5f5;
  background-color: #021526;
}
</style>
