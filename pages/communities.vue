<template>
  <div>
    <VanCellGroup>
      <VanSearch
        v-model="searchWord"
        placeholder="Search communities by name"
        shape="round"
      />

      <VanCell
        v-for="(contact, index) in communities"
        :key="index"
        :title="contact"
        is-link
      />
      <!-- @click="() => navigateTo(`/contacts/${contact}`)" -->
    </VanCellGroup>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "application",
  name: "Communities",
})

const searchWord = ref("")

const communities = ["Nebulynth", "Zarion Core", "Astravolt", "Aquila Rift"]
</script>
