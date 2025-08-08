<template>
  <div>
    <VanCellGroup
      title="Enter PIN to remove"
      style="padding-top: 10px; padding-bottom: 10px"
    >
      <VanPasswordInput
        :value="d.form.currentPin"
        :focused="d.show.currentPinKeyboard"
        :error-info="d.currentPinError"
        length="4"
        @focus="m.handle.focus.currentPin"
      />

      <VanNumberKeyboard
        v-model="d.form.currentPin"
        :show="d.show.currentPinKeyboard"
        @blur="m.handle.blur.currentPin"
      />
    </VanCellGroup>

    <VanCell>
      <VanButton
        block
        type="danger"
        :disabled="!isPinCorrect"
        @click="removePin"
      >
        Remove PIN
      </VanButton>
    </VanCell>
  </div>
</template>

<script lang="ts" setup>
import { useSettingStore } from "~/stores/useSettingStore"

const router = useRouter()
const settingStore = useSettingStore()
onMounted(async () => {
  await settingStore.loadFromSecureStorage()
})

const d = reactive({
  form: {
    currentPin: "",
  },

  currentPinError: "",

  show: {
    currentPinKeyboard: false,
  },
})

const m = {
  handle: {
    focus: {
      currentPin: () => {
        d.show.currentPinKeyboard = true
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

const isPinCorrect = computed(() => {
  return (
    d.form.currentPin.length === 4 && d.form.currentPin === settingStore.pinCode
  )
})

const removePin = () => {
  if (isPinCorrect.value) {
    settingStore.removePinNumber()
    // settingStore.setApplicationMask(false)
    showNotify({
      type: "success",
      message: "PIN removed successfully",
      duration: 2000,
    })
    setTimeout(() => {
      router.push("/settings/security")
    }, 300)
  }
}
</script>
