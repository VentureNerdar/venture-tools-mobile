<template>
  <VanSpace direction="vertical" fill>
    <VanNavBar title="Venture Tools" :border="false" />

    <VanCellGroup :inset="true" title="Welcome! Please continue to register">
      <!-- Name -->
      <VanField v-model="d.form.name" label="Name" placeholder="Name" />

      <!-- Username -->
      <VanField
        v-model="d.form.username"
        label="Username"
        placeholder="Username"
      />

      <!-- Email -->
      <VanField v-model="d.form.email" label="Email" placeholder="Email" />

      <!-- Phone Number -->
      <VanField
        v-model="d.form.phone_number"
        label="Phone"
        placeholder="Phone Number"
      />

      <!-- Language -->
      <VanField
        v-model="preferredLanguageFieldValue"
        label="Language"
        placeholder="Language"
        is-link
        readonly
        @click="d.visibility.languagePicker = true"
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
      />

      <!-- Password -->
      <VanField
        v-model="d.form.password"
        label="Password"
        placeholder="Password"
        type="password"
      />

      <VanField
        v-model="d.form.password_confirmation"
        label="Password"
        placeholder="Password"
        type="password"
      />
    </VanCellGroup>

    <VanSpace direction="vertical" fill style="padding: 16px">
      <VanButton type="primary" block @click="m.handle.click.register">
        Register
      </VanButton>
      <VanButton type="primary" plain block @click="router.push('/login')"
        >Cancel</VanButton
      >
    </VanSpace>
  </VanSpace>
</template>

<script lang="ts" setup>
  import type { Numeric } from 'vant/lib/utils'
  const config = useRuntimeConfig()
  const router = useRouter()
  const preferredLanguageFieldValue = ref('')
  const preferredLanguageID = ref<Numeric[]>([])

  const movementFieldValue = ref('')
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
    },
    form: {
      name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      user_role_id: 4,
      movement_id: null as number | null,
      phone_number: '',
      biography: '',
      is_active: true,
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
    const registrationOptions = await $fetch<Options>(
      config.public.apiURL + 'registration/options',
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
          const response = await $fetch(
            config.public.apiURL + 'registration/register',
            {
              method: 'POST',
              body: d.form,
            },
          )

          if (response) {
            showNotify({
              type: 'success',
              message: 'Registration successful',
            })

            setTimeout(() => {
              navigateTo('/login')
            }, 300)
          } else {
            showNotify({
              type: 'danger',
              message: 'Registration failed',
            })
          }
        },
      },
    },
  }
  onMounted(async () => {
    await getRegistrationOptions()

    // NOTE: just for testing purposes. need to delete this before production
    const randomString = 'test' + Math.random().toString(36).substring(2, 12)

    d.form.name = randomString
    d.form.username = randomString
    d.form.email = randomString + '@test.com'
    d.form.password = 'demodemo'
    d.form.password_confirmation = 'demodemo'
    d.form.phone_number = generateRandomPhoneNumber()
    d.form.biography = randomString

    const movid = generateRandomOneOrTwo()
    d.form.movement_id = movid
    movementID.value = [movid]
    movementFieldValue.value =
      options.movements.find((movement) => movement.id === movid)?.name ?? ''

    const langid = generateRandomOneOrTwo()
    d.form.preferred_language_id = langid
    preferredLanguageID.value = [langid]
    preferredLanguageFieldValue.value =
      options.languages.find((language) => language.id === langid)?.name ?? ''
  })

  // NOTE: just for testing purposes. need to delete this before production
  const generateRandomPhoneNumber = () => {
    const prefixes = ['09', '06', '08']
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)]
    const remainingDigits = Math.floor(Math.random() * 100000000)
      .toString()
      .padStart(8, '0')
    return randomPrefix + remainingDigits
  }

  // NOTE: just for testing purposes. need to delete this before production
  const generateRandomOneOrTwo = () => {
    return Math.floor(Math.random() * 2) + 1
  }
</script>
