<template>
  <div>
    <VanCellGroup>
      <VanSearch
        v-model="searchWord"
        placeholder="Search contacts by name"
        shape="round"
      />

      <VanCell
        v-for="(contact, index) in contacts"
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
  name: "Contacts",
})

const searchWord = ref("")

const contacts = [
  "John Doe",
  "Jane Smith",
  "Alice Johnson",
  "Bob Brown",
  "Charlie Davis",
  "Diana Evans",
  "Ethan Foster",
  "Fiona Green",
  "George Harris",
  "Hannah Irving",
  "Ian Jackson",
  "Julia King",
  "Kevin Lewis",
  "Laura Miller",
  "Michael Nelson",
  "Nina Owens",
  "Oliver Parker",
  "Paula Quinn",
  "Quincy Roberts",
  "Rachel Scott",
]
</script>
