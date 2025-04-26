<template>
  <div>
    <ContactForm v-if="route.query.moduleName === 'Contacts'" />
    <ChurchForm v-else-if="route.query.moduleName === 'Churches'" />
    <CommunityForm v-else-if="route.query.moduleName === 'Communities'" />
  </div>
</template>

<script lang="ts" setup>
import ContactForm from "~/components/Form/Contact.vue"
import ChurchForm from "~/components/Form/Church.vue"
import CommunityForm from "~/components/Form/Community.vue"

const route = useRoute()

definePageMeta({
  layout: "application",
  name: "Create",
})
</script>
