<template>
  <div>
    <VanCellGroup
      title="Enter current PIN"
      style="padding-top: 10px; padding-bottom: 10px"
    >
      <VanPasswordInput
        :value="d.form.currentPin"
        :focused="d.show.currentPinKeyboard"
        :error-info="d.currentPinError"
        length="4"
        @focus="m.handle.focus.currentPin"
        @blur="m.handle.blur.currentPin"
      />

      <VanNumberKeyboard
        v-model="d.form.currentPin"
        :show="d.show.currentPinKeyboard"
        @blur="m.handle.blur.currentPin"
      />
    </VanCellGroup>

    <VanCellGroup
      title="Enter new PIN"
      style="padding-top: 10px; padding-bottom: 10px"
    >
      <VanPasswordInput
        :value="d.form.pin"
        :focused="d.show.pinKeyboard"
        length="4"
        @focus="m.handle.focus.pin"
      />

      <VanNumberKeyboard
        v-model="d.form.pin"
        :show="d.show.pinKeyboard"
        @blur="d.show.pinKeyboard = false"
      />
    </VanCellGroup>

    <VanCellGroup
      title="Confirm new PIN"
      style="padding-top: 10px; padding-bottom: 10px"
    >
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
    </VanCellGroup>

    <VanCell>
      <VanButton
        block
        type="success"
        :disabled="!bothPinFilledAndMatch"
        @click="savePin"
      >
        Save
      </VanButton>
    </VanCell>
  </div>
</template>

<script lang="ts" setup>
import { useSettingStore } from "~/stores/useSettingStore"

definePageMeta({
  layout: "application",
  name: "Change-PIN",
})

const router = useRouter()
const settingStore = useSettingStore()

onMounted(async () => {
  await settingStore.loadFromSecureStorage()
})

const d = reactive({
  form: {
    pin: "",
    confirmPin: "",
    currentPin: "",
  },

  errorInfo: "",
  currentPinError: "",

  show: {
    pinKeyboard: false,
    confirmPinKeyboard: false,
    currentPinKeyboard: false,
  },
})

const m = {
  handle: {
    focus: {
      pin: () => {
        d.show.pinKeyboard = true
        d.show.confirmPinKeyboard = false
        d.show.currentPinKeyboard = false
      },

      confirmPin: () => {
        d.show.confirmPinKeyboard = true
        d.show.pinKeyboard = false
        d.show.currentPinKeyboard = false
      },

      currentPin: () => {
        d.show.currentPinKeyboard = true
        d.show.pinKeyboard = false
        d.show.confirmPinKeyboard = false
      },
    },
    blur: {
      currentPin: () => {
        d.show.currentPinKeyboard = false
        if (
          d.form.currentPin.length === 4 &&
          d.form.currentPin !== settingStore.pinCode
        ) {
          d.currentPinError = "Incorrect PIN"
        } else {
          d.currentPinError = ""
        }
      },
    },
  },
}

const bothPinFilledAndMatch = computed(() => {
  const lengthFlag = d.form.pin.length === 4 && d.form.confirmPin.length === 4
  const matchFlag = d.form.pin === d.form.confirmPin
  const currentPinCorrect = d.form.currentPin === settingStore.pinCode

  return lengthFlag && matchFlag && currentPinCorrect
})

watch([() => d.form.pin, () => d.form.confirmPin], () => {
  const lengthFlag = d.form.pin.length === 4 && d.form.confirmPin.length === 4
  const matchFlag = d.form.pin === d.form.confirmPin

  d.errorInfo = lengthFlag && !matchFlag ? "PINs do not match" : ""
})

watch([() => d.form.confirmPin, () => d.form.currentPin], () => {
  if (d.form.confirmPin.length === 4 && d.form.confirmPin !== d.form.pin) {
    d.currentPinError = "PINs do not match"
  } else {
    d.currentPinError = ""
  }
})

const savePin = () => {
  if (bothPinFilledAndMatch.value) {
    settingStore.setPinNumber(d.form.pin)

    showNotify({
      type: "success",
      message: "PIN changed successfully",
      duration: 2000,
    })

    setTimeout(() => {
      router.push("/settings/security")
    }, 300)
  }
}
</script>
