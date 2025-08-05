<template>
  <div>
    <template v-if="hasPin">
      <VanCellGroup>
        <VanCell>
          <VanButton
            block
            type="primary"
            @click="router.push('/settings/security/edit-pin')"
          >
            <!-- <VanButton block type="primary" @click="navigateTo('Change PIN')"> -->
            Change PIN Number
          </VanButton>
        </VanCell>
        <VanCell>
          <VanButton
            block
            type="danger"
            @click="router.push('/settings/security/delete-pin')"
          >
            Remove PIN Number
          </VanButton>
        </VanCell>
      </VanCellGroup>
    </template>
    <CompsPinNewPin v-else />
  </div>
</template>

<script lang="ts" setup>
import { useSettingStore } from "~/stores/useSettingStore"

definePageMeta({
  layout: "application",
  name: "PIN Number",
})

const router = useRouter()
const hasPin = ref(false)
const settingStore = useSettingStore()

onMounted(async () => {
  await settingStore.loadFromSecureStorage()
  hasPin.value = !!settingStore.pinCode
})
</script>
