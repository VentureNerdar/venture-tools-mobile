<template>
  <div class="pin-container">
    <div class="pin-header">
      <h2>{{ h.translate('enter_pin') == "" ? 'Enter PIN Number' : h.translate('enter_pin') }}</h2>
    </div>

    <VanPasswordInput
      :value="d.form.confirmPin"
      :focused="d.show.confirmPinKeyboard"
      :error-info="d.errorInfo"
      length="4"
      @focus="m.handle.focus.confirmPin"
    />

    <VanNumberKeyboard
      v-model="d.form.confirmPin"
      :show="d.show.confirmPinKeyboard"
      @blur="d.show.confirmPinKeyboard = false"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useSettingStore } from '~/stores/useSettingStore'
import { useHelpers } from '~/composables/useHelpers'

definePageMeta({
  name: "Enter PIN",
})

const router = useRouter()
const settingStore = useSettingStore()
const h = useHelpers()

const d = reactive({
  form: {
    confirmPin: '',
  },
  show: {
    confirmPinKeyboard: false,
  },
  errorInfo: '',
})

const m = {
  handle: {
    focus: {
      confirmPin: () => {
        d.show.confirmPinKeyboard = true
      },
    },
  },
}

watch(() => d.form.confirmPin, (newValue) => {
  if (newValue.length === 4) {
    verifyPin(newValue)
  }
})

async function verifyPin(pin: string) {
  try {
    const storedPin = settingStore.pinNumber.toString()
    if (pin === storedPin) {
      router.push('/splash')
    } else {
      d.errorInfo = h.translate('incorrect_pin') == "" ? "Incorrect PIN" : h.translate('incorrect_pin')
      d.form.confirmPin = ''
    }
  } catch (e) {
    d.errorInfo = h.translate('error_occurred') == "" ? "Error Occurred" : h.translate('error_occurred')
    d.form.confirmPin = ''
  }
}
</script>

<style scoped>
.pin-container {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}

.pin-header {
  text-align: center;
  margin-bottom: 30px;
}
</style>