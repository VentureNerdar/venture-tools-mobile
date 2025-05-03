<template>
  <div>
    <VanCellGroup>
      <VanField v-model="form.name" label="Name" placeholder="Name" />
      <VanCell title="User Role">
        <template #value>
          <VanTag type="primary">{{ authUserRoleName }}</VanTag>
        </template>
      </VanCell>

      <VanField v-model="form.username" label="Username" placeholder="Username" readonly />

      <VanField v-model="form.email" label="Email" placeholder="Email" />
      <VanField v-model="form.phone_number" label="Phone" placeholder="Phone" />
      <VanField v-model="form.biography" label="Biography" placeholder="Biography" />

      <VanField
v-model="userPreferredLanguage" label="Language" placeholder="Preferred Language" is-link readonly
        @click="showPicker = true" />

      <VanPopup v-model:show="showPicker" position="bottom" round>
        <VanPicker
:model-value="pickerValue" title="Languages" :columns="languagePicker" @cancel="showPicker = false"
          @confirm="m.handle.click.confirmLanguage" />
      </VanPopup>

      <VanCell>
        <VanButton type="primary" block size="small" @click="m.handle.click.update">Update</VanButton>
      </VanCell>
    </VanCellGroup>

    <VanCellGroup title="Authentication">
      <VanCell is-link title="Change Password" />

      <VanCell title="Logout">
        <template #value>
          <VanButton type="danger" size="mini" plain block @click="m.handle.click.logout">Logout</VanButton>
        </template>
      </VanCell>
    </VanCellGroup>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/stores/useAuthStore"
import { showNotify } from "vant"
import { useLanguageStore } from "~/stores/useLanguageStore"
import { useUserStore } from "~/stores/useUserStore"
import type { Numeric } from "vant/es/utils"
import { RoutePaths } from "~/types/index.d"

definePageMeta({
  layout: "application",
})

const showPicker = ref(false)
const pickerValue = ref<Numeric[]>([])
const userPreferredLanguage = ref<string>("")
const s = {
  roles: useUserStore().userRoles,
  auth: useAuthStore()
}

const form = ref({
  id: null,
  name: "",
  username: "",
  email: "",
  phone_number: "",
  biography: "",
  preferred_language_id: "",
  user_role_id: null,
})

const languagePicker = computed(() => {
  return useLanguageStore().languages.map((language: any) => ({
    text: language.name,
    value: language.id,
  }))
})

onMounted(() => {
  if (s.auth.authUser) {
    console.log("authStore", s.auth.authUser)
    form.value = { ...s.auth.authUser }
    if (form.value.preferred_language_id) {
      const selected = useLanguageStore().languages.find((l: any) => l.id === form.value.preferred_language_id)
      if (selected) {
        pickerValue.value = [selected.id]
        userPreferredLanguage.value = selected.name
      }
    }

  }
})

const authUserRoleName = computed(() => {
  return s.roles.find((role: any) => role.id === form.value.user_role_id)
    ?.label
})



const m = {
  handle: {
    click: {
      logout: async () => {
        await useAuthStore().logout()

        showNotify({
          type: "success",
          message: "See you again!",
          duration: 2000,
        })
      },
      confirmLanguage: ({ selectedOptions }: { selectedOptions: any }) => {
        showPicker.value = false
        const selectedLanguage = selectedOptions[0]
        form.value.preferred_language_id = selectedLanguage.value
        userPreferredLanguage.value = selectedLanguage.text
        pickerValue.value = [selectedLanguage.value as Numeric]
      },
      update: async () => {
        const userConsume = useConsumeApi(RoutePaths.USERS, s.auth.authUser.id)
        const res = await userConsume.save(form.value)
        const existing = JSON.parse(localStorage.getItem("authUser") || "{}")
        const updatedUser = {
          ...existing,
          ...form.value,
        }
        useAuthStore().authUser = updatedUser
        localStorage.setItem("authUser", JSON.stringify(updatedUser))
      }

    },
  },
}
</script>
