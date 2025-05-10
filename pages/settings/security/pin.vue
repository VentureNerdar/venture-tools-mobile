<template>
  <div>
    <template v-if="hasPin">
      <VanCellGroup>
        <VanCell>
          <VanButton block type="primary" @click="router.push('/settings/security/edit-pin')">
            Change PIN Number
          </VanButton>
        </VanCell>
        <VanCell>
          <VanButton block type="danger" @click="router.push('/settings/security/delete-pin')">
            Remove PIN Number
          </VanButton>
        </VanCell>
      </VanCellGroup>
    </template>
    <CompsPinNewPin v-else />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "application",
  name: "PIN Number",
})

const router = useRouter()
const hasPin = ref(false)

onMounted(() => {
  hasPin.value = !!localStorage.getItem('PINNumber')
})
</script>
