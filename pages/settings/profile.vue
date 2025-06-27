<template>
  <div>
    <VanCellGroup>
      <VanField
        v-model="form.name"
        :label="helpers.translate('name')"
        :placeholder="helpers.translate('name')"
      />
      <VanCell :title="helpers.translate('user_role')">
        <template #value>
          <VanTag type="primary">{{ authUserRoleName }}</VanTag>
        </template>
      </VanCell>

      <VanField
        v-model="form.username"
        :label="helpers.translate('username')"
        :placeholder="helpers.translate('username')"
        readonly
      />

      <VanField
        v-model="form.email"
        :label="helpers.translate('email')"
        :placeholder="helpers.translate('email')"
      />
      <VanField
        v-model="form.phone_number"
        :label="helpers.translate('phone')"
        :placeholder="helpers.translate('phone')"
      />

      <VanField
        v-model="form.biography"
        :label="helpers.translate('biography')"
        :placeholder="helpers.translate('biography')"
      />

      <VanCell
        :title="helpers.translate('contact_profile')"
        :is-link="!!form.contact_id"
        :value="
          form.contact_id
            ? helpers.translate('go_to_contact_profile')
            : helpers.translate('no_contact_profile')
        "
        @click="goToContactProfile"
      />

      <VanField
        v-model="userPreferredLanguage"
        :label="helpers.translate('language')"
        :placeholder="helpers.translate('language')"
        is-link
        readonly
        @click="showPicker = true"
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
          @confirm="m.handle.click.confirmLanguage"
        />
      </VanPopup>

      <VanCell>
        <VanButton
          type="primary"
          block
          size="small"
          @click="m.handle.click.update"
          >{{ helpers.translate("update") }}</VanButton
        >
      </VanCell>
    </VanCellGroup>

    <VanCellGroup :title="helpers.translate('authentication')">
      <VanCell
        is-link
        :title="helpers.translate('change_password')"
      />

      <VanCell :title="helpers.translate('log_out')">
        <template #value>
          <VanButton
            type="danger"
            size="mini"
            plain
            block
            @click="m.handle.click.logout"
            >{{ helpers.translate("log_out") }}</VanButton
          >
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
import { useSettingStore } from "../../stores/useSettingStore"

definePageMeta({
  layout: "application",
})

const helpers = useHelpers()
const router = useRouter()

const showPicker = ref(false)
const pickerValue = ref<Numeric[]>([])
const userPreferredLanguage = ref<string>("")
const s = {
  roles: computed(() => useUserStore().userRoles),
  auth: useAuthStore(),
  languages: useLanguageStore().languages,
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
  contact_id: null,
})

const goToContactProfile = () => {
  if (form.value.contact_id) {
    router.push({
      path: "/createForm",
      query: {
        moduleName: "Contacts",
        id: form.value.contact_id,
      },
    })
  }
}

const languagePicker = computed(() => {
  return useLanguageStore().languages.map((language: any) => ({
    text: language.name,
    value: language.id,
  }))
})

onMounted(() => {
  if (s.auth.authUser) {
    form.value = { ...s.auth.authUser }
    if (form.value.preferred_language_id) {
      const selected = s.languages.find(
        (l: any) => l.id === form.value.preferred_language_id,
      )
      if (selected) {
        pickerValue.value = [selected.id]
        userPreferredLanguage.value = selected.name
        useSettingStore().setUserPreferredLanguage(selected)
      }
    }
  }
})

const authUserRoleName = computed(() => {
  // return "Disciple Maker"

  return s.roles.value.find((role: any) => role.id === form.value.user_role_id)
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
        await userConsume.save(form.value)
        const existing = JSON.parse(localStorage.getItem("authUser") || "{}")
        const updatedUser = {
          ...existing,
          ...form.value,
        }
        useAuthStore().authUser = updatedUser
        localStorage.setItem("authUser", JSON.stringify(updatedUser))
        const selected = s.languages.find(
          (l: any) => l.id === form.value.preferred_language_id,
        )
        if (selected) {
          useSettingStore().setUserPreferredLanguage(selected)
        }
      },
    },
  },
}
</script>
