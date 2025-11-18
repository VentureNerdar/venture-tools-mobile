<template>
  <VanSpace
    direction="vertical"
    fill
  >
    <VanNavBar
      title="Venture Tools"
      :border="false"
    />

    <VanForm @submit="m.handle.click.register">
      <VanCellGroup
        :inset="true"
        title="Welcome! Please continue to register"
      >
        <!-- Name -->
        <VanField
          v-model="d.form.name"
          label="Name"
          placeholder="Name"
          required
          :rules="[{ required: true, message: 'Name is required' }]"
        />

        <!-- Username -->
        <!-- <VanField
          v-model="d.form.username"
          label="Username"
          placeholder="Username"
          :rules="[{ required: true, message: 'Username is required' }]"
        /> -->

        <!-- Email -->
        <VanField
          v-model="d.form.email"
          label="Email"
          placeholder="Email"
          required
          :rules="[
            { required: true, message: 'Email is required' },
            { pattern: /.+@.+\..+/, message: 'Invalid email' },
          ]"
        />

        <VanField
          v-model="d.confirmPassword"
          label="Confirm Email"
          placeholder="Confirm Email"
          required
          :rules="[
            { required: true, message: 'Email is required' },
            { pattern: /.+@.+\..+/, message: 'Invalid email' },
            { validator: m.handle.validate.confirmEmailMatch },
          ]"
        />

        <!-- Phone Number -->
        <VanField
          label="Phone"
          required
        >
          <template #input>
            <div class="phone-row">
              <div
                class="country-code"
                @click="d.visibility.countryPicker = true"
              >
                {{ countryCode }}
              </div>

              <VanField
                v-model="d.form.phone_number"
                placeholder="Phone Number"
                :rules="[{ required: true, message: 'Phone is required' }]"
              />
            </div>
          </template>
        </VanField>

        <VanPopup
          v-model:show="d.visibility.countryPicker"
          round
          position="bottom"
        >
          <VanPicker
            :columns="countryCodeOptions"
            @confirm="selectCountryCode"
            @cancel="d.visibility.countryPicker = false"
          />
        </VanPopup>

        <!-- Language -->
        <VanField
          v-model="preferredLanguageFieldValue"
          label="Language"
          placeholder="Language"
          is-link
          readonly
          required
          @click="d.visibility.languagePicker = true"
          :rules="[{ required: true, message: 'Language is required' }]"
        />
        <VanPopup
          v-model:show="d.visibility.languagePicker"
          destroy-on-close
          round
          position="bottom"
        >
          <VanPicker
            :model-value="preferredLanguageID"
            :columns="languageOptions"
            @cancel="d.visibility.languagePicker = false"
            @confirm="m.handle.click.confirmLanguagePicker"
          />
        </VanPopup>

        <!-- Movement -->
        <VanField
          v-model="movementFieldValue"
          label="Movement"
          placeholder="Movement"
          is-link
          readonly
          @click="d.visibility.movementPicker = true"
          required
          :rules="[{ required: true, message: 'Movement is required' }]"
        />
        <VanPopup
          v-model:show="d.visibility.movementPicker"
          destroy-on-close
          round
          position="bottom"
        >
          <VanPicker
            :model-value="movementID"
            :columns="movementOptions"
            @cancel="d.visibility.movementPicker = false"
            @confirm="m.handle.click.confirmMovementPicker"
          />
        </VanPopup>

        <!-- Biography -->
        <VanField
          v-model="d.form.biography"
          label="Biography"
          placeholder="Biography"
          type="textarea"
          :autosize="{ minHeight: 50, maxHeight: 120 }"
        />

        <!-- Password -->
        <VanField
          v-model="d.form.password"
          label="Password"
          placeholder="Password"
          :type="d.visibility.showPassword ? 'text' : 'password'"
          required
          :rules="[
            { required: true, message: 'Password is required' },
            { validator: m.handle.validate.confirmPasswordLength },
          ]"
        >
          <template #right-icon>
            <van-icon
              :name="d.visibility.showPassword ? 'closed-eye' : 'eye-o'"
              @click="d.visibility.showPassword = !d.visibility.showPassword"
            />
          </template>
        </VanField>

        <!-- Confirm Password -->
        <VanField
          v-model="d.form.password_confirmation"
          label="Confirm Password"
          placeholder="Confirm password"
          :type="d.visibility.showConfirmPassword ? 'text' : 'password'"
          required
          :rules="[
            { required: true, message: 'Please confirm password' },
            { validator: m.handle.validate.confirmPasswordMatch },
          ]"
        >
          <template #right-icon>
            <VanIcon
              :name="d.visibility.showConfirmPassword ? 'closed-eye' : 'eye-o'"
              @click="
                d.visibility.showConfirmPassword =
                  !d.visibility.showConfirmPassword
              "
            />
          </template>
        </VanField>
      </VanCellGroup>

      <VanSpace
        direction="vertical"
        fill
        style="padding: 16px"
      >
        <VanButton
          type="primary"
          block
          native-type="submit"
        >
          Register
        </VanButton>
        <VanButton
          type="primary"
          plain
          block
          @click="router.push('/login')"
          >Cancel</VanButton
        >
      </VanSpace>
    </VanForm>
  </VanSpace>
</template>

<script lang="ts" setup>
import type { Numeric } from "vant/lib/utils"
import { useLanguageStore } from "~/stores/useLanguageStore"

const config = useRuntimeConfig()
const router = useRouter()

const languageStore = useLanguageStore()
const preferredLanguageFieldValue = ref("")
const preferredLanguageID = ref<Numeric[]>([])
const countryCode = ref("+977")

const countryCodeOptions = [
  { text: "Nepal +977", value: "+977" },
  { text: "USA +1", value: "+1" },
  { text: "UK +44", value: "+44" },
  { text: "Thailand +66", value: "+66" },
  { text: "Myanmar +95", value: "+95" },
  { text: "Australia +61", value: "+61" },
  { text: "Japan +81", value: "+81" },
]
const selectCountryCode = ({ selectedOptions }: any) => {
  countryCode.value = selectedOptions[0].value
  d.visibility.countryPicker = false
}

const movementFieldValue = ref("")
const movementID = ref<Numeric[]>([])

type Options = {
  languages: any[]
  movements: any[]
}

const options: Options = reactive({
  languages: [],
  movements: [],
})

const d = reactive({
  visibility: {
    languagePicker: false,
    movementPicker: false,
    countryPicker: false,
    showPassword: false,
    showConfirmPassword: false,
  },
  confirmPassword: "",
  form: {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    user_role_id: 4,
    movement_id: null as number | null,
    phone_number: "",
    biography: "",
    is_active: true,
    first_time_login: true,
    preferred_language_id: null as number | null,
  },
})

const languageOptions = computed(() => {
  return options.languages.map((language: any) => ({
    text: language.name,
    value: language.id,
  }))
})

const movementOptions = computed(() => {
  return options.movements.map((movement: any) => ({
    text: movement.name,
    value: movement.id,
  }))
})

const getRegistrationOptions = async () => {
  const registrationOptions = await $fetch(
    config.public.apiURL + "registration/options"
  )
  options.languages = registrationOptions.languages ?? []
  options.movements = registrationOptions.movements ?? []
}

const m = {
  handle: {
    click: {
      confirmLanguagePicker: ({
        selectedOptions,
      }: {
        selectedOptions: FormattedOption[]
      }) => {
        d.form.preferred_language_id = selectedOptions[0].value as number
        preferredLanguageFieldValue.value = selectedOptions[0].text
        preferredLanguageID.value = [selectedOptions[0].value as Numeric]
        d.visibility.languagePicker = false
      },

      confirmMovementPicker: ({
        selectedOptions,
      }: {
        selectedOptions: FormattedOption[]
      }) => {
        d.form.movement_id = selectedOptions[0].value
          ? (selectedOptions[0].value as number)
          : null
        movementFieldValue.value = selectedOptions[0].text
        movementID.value = [selectedOptions[0].value as Numeric]
        d.visibility.movementPicker = false
      },

      register: async () => {
        d.form.phone_number = countryCode.value + d.form.phone_number

        console.log("Register Form", d.form)
        const response = await $fetch(
          config.public.apiURL + "registration/register",
          {
            method: "POST",
            body: d.form,
          }
        )

        if (response) {
          showNotify({
            type: "success",
            message: "Registration successful",
          })

          setTimeout(() => {
            navigateTo("/login")
          }, 300)
        } else {
          showNotify({
            type: "danger",
            message: "Registration failed",
          })
        }
      },
    },
    validate: {
      confirmPasswordMatch: (value: string) => {
        if (value !== d.form.password) {
          return "Password do not match"
        }
        return true
      },
      confirmPasswordLength: (value: string) => {
        if (value.length < 8) {
          return "Password must be at least 8 characters"
        }
        return true
      },
      confirmEmailMatch: (value: string) => {
        if (value !== d.form.email) {
          return "Email do not match "
        }
        return true
      },
    },
  },
}
onMounted(async () => {
  await getRegistrationOptions()

  const userPrefLang = languageStore.userPreferredLanguage
  if (userPrefLang) {
    d.form.preferred_language_id = userPrefLang.id as number
    preferredLanguageID.value = [userPrefLang.id as number]
    preferredLanguageFieldValue.value = userPrefLang.name
  }
})
</script>

<style>
.phone-row {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.phone-row .van-field {
  flex: 1;
}
</style>
