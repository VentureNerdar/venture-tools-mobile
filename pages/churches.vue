<template>
  <div>
    <VanCellGroup>
      <VanSearch
        v-model="searchWord"
        placeholder="Search churches by name"
        shape="round"
      />

      <VanCell
        v-for="(contact, index) in churches"
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
  name: "Churches",
})

const searchWord = ref("")

const churches = [
  "St. Peter's Church",
  "Grace Community Church",
  "First Baptist Church",
  "Holy Trinity Church",
  "New Life Church",
  "Faith Chapel",
  "Living Waters Church",
  "Cornerstone Church",
  "Hope Church",
  "Christ the King Church",
  "Redeemer Church",
  "Victory Church",
  "Crossroads Church",
  "Harvest Church",
  "The Rock Church",
  "River of Life Church",
  "Calvary Church",
  "Unity Church",
  "Abundant Life Church",
  "Bethlehem Church",
  "Good Shepherd Church",
  "Emmanuel Church",
  "Sacred Heart Church",
  "Trinity Fellowship",
  "Mount Zion Church",
  "Covenant Church",
  "New Hope Church",
  "Light of the World Church",
  "Kingdom Hall",
  "Shiloh Church",
]
</script>
