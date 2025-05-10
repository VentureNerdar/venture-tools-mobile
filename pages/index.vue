<template>
  <div />
</template>

<script setup lang="ts">
import { useSettingStore } from "~/stores/useSettingStore"
const { pinNumber, applicationMask } = useSettingStore()

const authUser = localStorage.getItem("authUser")

// Check if user is logged in
if(authUser) {
  // Check if mask option is set
  if(applicationMask) {
    navigateTo("/mask")
  } else { // No mask option
    // Check if pin is set
    if(pinNumber) {
      navigateTo("/pin")
    } else { // No pin
      navigateTo('/splash')
    }
  }
} else { // Not logged in
  navigateTo("/login")
}
</script>
