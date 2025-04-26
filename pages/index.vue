<template>
  <div />
</template>

<script setup lang="ts">
import { useSettingStore } from "~/stores/useSettingStore"
const { pinNumber, maskOption } = useSettingStore()

navigateTo(!pinNumber || !maskOption ? "/login" : "/mask")
</script>
