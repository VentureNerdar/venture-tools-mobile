<template>
  <div
    v-if="!authUser"
    class="wrapper"
  >
    <div class="title">Venture Tools</div>

    <div class="subtitle">Welcome to Venture Tools</div>

    <VanButton
      type="primary"
      block
      @click="router.push('/login')"
      >LOGIN</VanButton
    >

    <VanDivider>OR</VanDivider>

    <VanButton
      type="primary"
      block
      @click="router.push('/register')"
      >REGISTER</VanButton
    >

    <VanField
      v-model="userPreferredLanguage"
      :label="helpers.translate('language')"
      :placeholder="helpers.translate('language')"
      is-link
      readonly
      @click="showPicker = true"
      style="margin-top: 20px"
    />

    <VanPopup
      v-model:show="showPicker"
      position="bottom"
      round
    >
      <VanPicker
        :model-value="pickerValue"
        title="Languages"
        :columns="languagePicker"
        @cancel="showPicker = false"
        @confirm="confirmLanguage"
      />
    </VanPopup>
  </div>
</template>

<script setup lang="ts">
import { useSettingStore } from "~/stores/useSettingStore"
import { useAuthStore } from "~/stores/useAuthStore"
import { useLanguageStore } from "~/stores/useLanguageStore"
import type { Numeric } from "vant/es/utils"
import { ForumRound } from "@vicons/material"
import {
  type BrowseCondition,
  type LanguageFormModel,
  type StoreOptions,
} from "~/types/index.d"
import { RoutePaths } from "~/types/index.d"

const authStore = useAuthStore()
const settingStore = useSettingStore()
const languageStore = useLanguageStore()

const router = useRouter()
const helpers = useHelpers()

const authUser = authStore.authUser
const pinNumber = settingStore.pinNumber

const userPreferredLanguage = ref<string>("")
const showPicker = ref<boolean>(false)
const pickerValue = ref<Numeric[]>()

const languagePicker = computed(() => {
  return languageStore.languages.map((language: LanguageFormModel) => ({
    text: language.name,
    value: language.id,
  }))
})

onMounted(async () => {
  await settingStore.loadFromSecureStorage()
  await authStore.loadFromSecureStorage()
  const defaultLang = languageStore.languages.find(
    (l: any) => l.locale === "en"
  )
  if (defaultLang) {
    pickerValue.value = [defaultLang.id]
    userPreferredLanguage.value = defaultLang.name
    languageStore.setUserPreferredLanguage(defaultLang)
  }
})

const confirmLanguage = ({ selectedOptions }: { selectedOptions: any }) => {
  showPicker.value = false
  const selectedLanguage = selectedOptions[0]
  userPreferredLanguage.value = selectedLanguage.text
  pickerValue.value = [selectedLanguage.value as Numeric]
  const languageToStore = languageStore.languages.find(
    (language: LanguageFormModel) => language.id == selectedLanguage.value
  )

  languageStore.setUserPreferredLanguage(languageToStore)
}

// Check if user is logged in
if (authUser) {
  // ---------
  if (pinNumber) {
    navigateTo("/pin")
  } else {
    // No pin
    navigateTo("/splash")
  }
}
</script>

<style scoped lang="scss">
.title {
  font-size: 24px;
  font-weight: bold;
  color: #17badf;
  text-align: center;
  margin: 20px 0;
  text-transform: uppercase;
}

.wrapper {
  padding: 20px;
}

.subtitle {
  font-size: 16px;
  text-align: center;
  margin-bottom: 30px;
}
.spinner-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .spinner {
    text-align: center;
  }
}
</style>
