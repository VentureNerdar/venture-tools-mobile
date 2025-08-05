<template>
  <div>
    <VanCellGroup>
      <VanSearch
        show-action
        v-model="searchWord"
        :placeholder="h.translate('search_contacts_by_name')"
        @search="handleSearch"
        shape="round"
      >
        <template #action>
          <div style="display: flex; align-items: center; height: 100%">
            <template v-if="toggleTrash">
              <VanButton
                @click="handleToggleTrash"
                size="small"
                type="danger"
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <ArchiveRound style="width: 16px; height: 16px" />
              </VanButton>
            </template>
            <template v-else>
              <VanButton
                @click="handleToggleTrash"
                plain
                size="small"
                type="primary"
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <ArchiveRound style="width: 16px; height: 16px" />
              </VanButton>
            </template>
          </div>
        </template>
      </VanSearch>

      <div
        v-if="toggleTrash && !d.contacts.length"
        style="margin-top: 10px"
      >
        <VanField
          type="textarea"
          :placeholder="h.translate('no_archived_contact_found')"
          rows="1"
          autosize
        />
      </div>

      <VanSwipeCell
        v-for="(contact, index) in d.contacts"
        :key="index"
      >
        <template
          v-if="toggleTrash"
          #right
        >
          <VanButton
            square
            type="primary"
            :text="h.translate('restore')"
            @click="handleRestore(contact.id)"
          />
          <VanButton
            square
            type="danger"
            :text="h.translate('destroy')"
            @click="handleDestroy(contact.id)"
          />
        </template>
        <template
          v-else
          #right
        >
          <VanButton
            square
            type="danger"
            :text="h.translate('archive')"
            @click="handleDelete(contact.id)"
          />
        </template>
        <VanCell
          :title="contact.name"
          @click="toggleTrash ? null : handleEdit(contact.id)"
        />
      </VanSwipeCell>
    </VanCellGroup>
  </div>
</template>

<script lang="ts" setup>
import { ArchiveRound } from "@vicons/material"
import { RoutePaths, type BrowseCondition } from "../types/index.d"
import type { ContactFormModel } from "../types/models.ts"

definePageMeta({
  layout: "application",
  name: "Contacts",
})

const searchWord = ref("")
const toggleTrash = ref(false)
const h = useHelpers()
const d = reactive({
  contacts: [] as ContactFormModel[],
  browseOption: { all: true } as BrowseCondition,
})
const consume = {
  contacts: await useConsumeApi(RoutePaths.CONTACTS),
}

const getContacts = async () => {
  d.contacts = await consume.contacts.browse(d.browseOption)
}

const handleSearch = async () => {
  d.browseOption = { all: true, search: searchWord.value, search_by: "name" }
  getContacts()
}

const handleEdit = (contactID: number | undefined) => {
  navigateTo({
    path: "/createForm",
    query: {
      moduleName: "Contacts",
      id: contactID,
    },
  })
}

const handleDelete = async (contactID: number | undefined) => {
  if (!contactID) return
  try {
    await showConfirmDialog({
      title: "Confirm Deletion",
      message: "Are you sure? You cannot undo this action afterwards.",
    })

    const consume = await useConsumeApi(RoutePaths.CONTACTS, contactID)
    const res = await consume.delete(false)
    if (res) {
      d.contacts = d.contacts.filter(
        (contact: ContactFormModel) => contact.id !== contactID
      )
    }
  } catch {
    console.log("error")
  }
}

const handleToggleTrash = () => {
  toggleTrash.value = !toggleTrash.value
  if (toggleTrash.value) {
    d.browseOption = { all: true, onlyTrashed: true }
    getContacts()
  } else {
    d.browseOption = { all: true }
    getContacts()
  }
}

const handleRestore = async (contactID: number | undefined) => {
  const consume = await useConsumeApi(RoutePaths.CONTACTS, contactID)
  const res = await consume.restore()
  if (res) {
    d.contacts = d.contacts.filter(
      (contact: ContactFormModel) => contact.id !== contactID
    )
  }
}

const handleDestroy = async (contactID: number | undefined) => {
  if (!contactID) return

  try {
    await showConfirmDialog({
      title: "Confirm Deletion",
      message: "Are you sure? You cannot undo this action afterwards.",
    })

    const consume = await useConsumeApi(RoutePaths.CONTACTS, contactID)
    const res = await consume.delete(true)
    if (res) {
      d.contacts = d.contacts.filter(
        (contact: ContactFormModel) => contact.id !== contactID
      )
    }
  } catch {
    console.log("error")
  }
}

getContacts()
</script>
