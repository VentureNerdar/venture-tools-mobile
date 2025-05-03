<template>
  <div>
    <VanCellGroup>
      <VanSearch v-model="searchWord" placeholder="Search contacts by name" shape="round" />

      <VanCell v-for="(contact, index) in d.contacts" :key="index" :title="contact.name" is-link
        @click="handleContactClick(contact.id)" />
      <!-- @click="() => navigateTo(`/contacts/${contact}`)" -->
    </VanCellGroup>
  </div>
</template>

<script lang="ts" setup>
import { RoutePaths, type BrowseConditionAll, type ContactFormModel } from '~/types/index.d'

definePageMeta({
  layout: "application",
  name: "Contacts",
})

const searchWord = ref("")

const d = reactive({
  contacts: [] as ContactFormModel[]
})
const consume = {
  contacts: useConsumeApi(RoutePaths.CONTACTS)
}
d.contacts = await consume.contacts.browse(
  { all: true } as BrowseConditionAll
)

const handleContactClick = (contactID: number | undefined) => {
  navigateTo({
    path: '/createForm',
    query: {
      moduleName: 'Contacts',
      id: contactID,
    }
  })
}


</script>
