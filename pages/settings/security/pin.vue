<template>
  <div>
    <CompsPinNewPin @new-pin-changed="m.handle.emit.newPinChanged" />
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: "application",
  name: "PIN Number",
})

const d = reactive({
  form: {
    pin: "" as string | number,
    confirmPin: "",
  },
})

const m = {
  handle: {
    emit: {
      newPinChanged: (pinNumber: string | number) => {
        console.log(pinNumber);
        d.form.pin = pinNumber;
      },
    },
  },
}
</script>
