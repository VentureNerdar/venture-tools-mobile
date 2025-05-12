<template>
  <div>
    <!-- Show options when PIN exists and form is not shown -->
    <template v-if="d.hasPin && !d.showPinForm">
      <VanCellGroup>
        <VanCell>
          <VanButton block type="primary" @click="m.handle.showChangePinForm">
            Change PIN Number
          </VanButton>
        </VanCell>
        <VanCell>
          <VanButton block type="danger" @click="m.handle.focus.removePin">
            Remove PIN Number
          </VanButton>
        </VanCell>
      </VanCellGroup>

      <!-- Remove PIN Confirmation -->
      <VanCellGroup v-if="d.show.removePinKeyboard">
        <VanCell title="Enter PIN to remove">
          <VanPasswordInput
            :value="d.form.currentPin"
            :focused="d.show.removePinKeyboard"
            length="4"
            @focus="m.handle.focus.removePin"
          />

          <VanNumberKeyboard
            v-model="d.form.currentPin"
            :show="d.show.removePinKeyboard"
            @blur="d.show.removePinKeyboard = false"
          />
        </VanCell>
        <VanCell>
          <VanButton block type="danger" @click="m.handle.removePin">
            Confirm Remove
          </VanButton>
        </VanCell>
      </VanCellGroup>
    </template>

    <!-- Show PIN form when creating new PIN or changing existing PIN -->
    <template v-if="!d.hasPin || d.showPinForm">
      <VanCellGroup
        v-if="d.isChangingPin"
        title="Enter current PIN"
        style="padding-top: 10px; padding-bottom: 10px"
      >
        <VanPasswordInput
          :value="d.form.currentPin"
          :focused="d.show.currentPinKeyboard"
          length="4"
          @focus="m.handle.focus.currentPin"
        />

        <VanNumberKeyboard
          v-model="d.form.currentPin"
          :show="d.show.currentPinKeyboard"
          @blur="d.show.currentPinKeyboard = false"
        />
      </VanCellGroup>

      <VanCellGroup
        :title="h.translate('enter_your_pin_number')"
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
        :title="h.translate('confirm_your_pin_number')"
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
        <VanButton block type="success" :disabled="!bothPinFilledAndMatch" @click="savePin">
          {{ h.translate("save") }}
        </VanButton>
      </VanCell>
    </template>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(["newPinChanged"])
const h = useHelpers()
const router = useRouter()

const d = reactive({
  form: {
    pin: "",
    confirmPin: "",
    currentPin: "",
  },

  errorInfo: "",
  showPinForm: false,

  show: {
    pinKeyboard: false,
    confirmPinKeyboard: false,
    currentPinKeyboard: false,
    removePinKeyboard: false,
  },

  isChangingPin: false,
  hasPin: false,
});

// Check if pin exists in localStorage
onMounted(() => {
  const existingPin = localStorage.getItem('PINNumber');
  d.hasPin = !!existingPin;
});

const m = {
  handle: {
    focus: {
      pin: () => {
        d.show.pinKeyboard = true;
        d.show.confirmPinKeyboard = false;
        d.show.currentPinKeyboard = false;
        d.show.removePinKeyboard = false;
      },

      confirmPin: () => {
        d.show.confirmPinKeyboard = true;
        d.show.pinKeyboard = false;
        d.show.currentPinKeyboard = false;
        d.show.removePinKeyboard = false;
      },

      currentPin: () => {
        d.show.currentPinKeyboard = true;
        d.show.pinKeyboard = false;
        d.show.confirmPinKeyboard = false;
        d.show.removePinKeyboard = false;
      },

      removePin: () => {
        d.show.removePinKeyboard = true;
        d.show.pinKeyboard = false;
        d.show.confirmPinKeyboard = false;
        d.show.currentPinKeyboard = false;
      },
    },

    showChangePinForm: () => {
      d.showPinForm = true;
      d.isChangingPin = true;
    },

    removePin: () => {
      if (d.form.currentPin === localStorage.getItem('PINNumber')) {
        localStorage.removeItem('PINNumber');
        showNotify({
          type: 'success',
          message: 'PIN removed successfully',
          duration: 2000,
        });
        setTimeout(() => {
          router.push('/settings/security');
        }, 300);
      } else {
        showNotify({
          type: 'danger',
          message: 'Incorrect PIN',
          duration: 2000,
        });
      }
    },
  },
};

const bothPinFilledAndMatch = computed(() => {
  const lengthFlag = d.form.pin.length === 4 && d.form.confirmPin.length === 4;
  const matchFlag = d.form.pin === d.form.confirmPin;
  
  if (d.isChangingPin) {
    return lengthFlag && matchFlag && d.form.currentPin === localStorage.getItem('pin');
  }
  
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
    if(newPin.length > 4) {
      d.form.pin = newPin.slice(0, 4)
      console.log('new pin!', d.form.pin)
    }

    if (newPin.length === 4) {
      emits("newPinChanged", newPin);
    }
  },
);

watch(
  () => d.form.confirmPin,
  (newPin) => {
    if(newPin.length > 4) {
      d.form.confirmPin = newPin.slice(0, 4)
    }
  }
)

watch(
  () => d.form.currentPin,
  (val) => {
    console.log(d.form.currentPin)
    if (val.length > 4) {
      d.form.currentPin = val.slice(0, 4)
    }
  }
)

const savePin = () => {
  if (bothPinFilledAndMatch.value) {
    localStorage.setItem('PINNumber', d.form.pin);
    
    // Show success notification
    showNotify({
      type: 'success',
      message: d.isChangingPin ? 'PIN changed successfully' : 'PIN created successfully',
      duration: 2000,
    });

    // Navigate back to security page after a short delay
    setTimeout(() => {
      router.push('/settings/security');
    }, 300);
  }
};
</script>
