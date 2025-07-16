<template>
  <VanCellGroup>
    <VanCell
      is-link
      :title="h.translate('profile')"
      to="/settings/profile"
    />
    <VanCell
      is-link
      :title="h.translate('security')"
      to="/settings/security"
    />
    <VanCell title="Dark Mode">
      <template #right-icon>
        <VanSwitch v-model="darkMode" />
      </template>
    </VanCell>
  </VanCellGroup>
</template>

<script lang="ts" setup>
import { useThemeStore } from "~/stores/useTheme"
definePageMeta({
  layout: "application",
})
const h = useHelpers()
const themeStore = useThemeStore()

const darkMode = computed({
  get: () => themeStore.darkMode,
  set: (value) => themeStore.setDarkMode(value),
})
</script>
