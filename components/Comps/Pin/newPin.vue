<template>
  <div>
    <VanCellGroup
      title="Enter your PIN number"
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
      title="Confirm your PIN number"
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
      <VanButton block type="success" :disabled="!bothPinFilledAndMatch">
        Save
      </VanButton>
    </VanCell>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(["newPinChanged"]);

const d = reactive({
  form: {
    pin: "",
    confirmPin: "",
  },

  errorInfo: "",

  show: {
    pinKeyboard: false,
    confirmPinKeyboard: false,
  },
});

const m = {
  handle: {
    focus: {
      pin: () => {
        d.show.pinKeyboard = true;
        d.show.confirmPinKeyboard = false;
      },

      confirmPin: () => {
        d.show.confirmPinKeyboard = true;
        d.show.pinKeyboard = false;
      },
    },
  },
};

const bothPinFilledAndMatch = computed(() => {
  const lengthFlag = d.form.pin.length === 4 && d.form.confirmPin.length === 4;
  const matchFlag = d.form.pin === d.form.confirmPin;

  // d.errorInfo = lengthFlag && !matchFlag ? "PINs do not match" : "";

  return lengthFlag && matchFlag;
});

watch([() => d.form.pin, () => d.form.confirmPin], () => {
  const lengthFlag = d.form.pin.length === 4 && d.form.confirmPin.length === 4;
  const matchFlag = d.form.pin === d.form.confirmPin;

  d.errorInfo = lengthFlag && !matchFlag ? "PINs do not match" : "";
});

watch(
  () => d.form.pin,
  (newPin) => {
    if (newPin.length === 4) {
      console.log(newPin);
      emits("newPinChanged", newPin);
    }
  },
);
</script>
