<template>
  <div>
    <VanCellGroup>
      <VanSearch
        show-action
        v-model="searchWord"
        :placeholder="h.translate('search_churches_by_name')"
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
        v-if="toggleTrash && !d.churches.length"
        style="margin-top: 10px"
      >
        <VanField
          type="textarea"
          :placeholder="h.translate('no_archived_church_found')"
          rows="1"
          autosize
        />
      </div>

      <VanSwipeCell
        v-for="(church, index) in d.churches"
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
            @click="handleRestore(church.id)"
          />
          <VanButton
            square
            type="danger"
            :text="h.translate('destroy')"
            @click="handleDestroy(church.id)"
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
            @click="handleDelete(church.id)"
          />
        </template>
        <VanCell
          :title="church.name"
          @click="toggleTrash ? null : handleEdit(church.id)"
        />
      </VanSwipeCell>
    </VanCellGroup>
  </div>
</template>

<script lang="ts" setup>
import { ArchiveRound } from "@vicons/material"

import { RoutePaths, type BrowseCondition } from "../types/index.d"
import type { ChurchFormModel } from "../types/models"

definePageMeta({
  layout: "application",
  name: "Churches",
})

const h = useHelpers()

const searchWord = ref("")
const toggleTrash = ref(false)

const d = reactive({
  churches: [] as ChurchFormModel[],
  browseOption: { all: true } as BrowseCondition,
})
const consume = {
  churches: await useConsumeApi(RoutePaths.CHURCHES),
}

const getChurches = async () => {
  d.churches = await consume.churches.browse(d.browseOption)
}

const handleSearch = async () => {
  d.browseOption = { all: true, search: searchWord.value, search_by: "name" }
  getChurches()
}

const handleEdit = (churchID: number | undefined) => {
  navigateTo({
    path: "/createForm",
    query: {
      moduleName: "Churches",
      id: churchID,
    },
  })
}

const handleDelete = async (churchID: number | undefined) => {
  if (!churchID) return
  try {
    await showConfirmDialog({
      title: "Confirm Deletion",
      message: "Are you sure? You cannot undo this action afterwards.",
    })

    const consume = await useConsumeApi(RoutePaths.CHURCHES, churchID)
    const res = await consume.delete(false)
    if (res) {
      d.churches = d.churches.filter((church) => church.id !== churchID)
    }
  } catch {
    // Handle error silently
  }
}

const handleToggleTrash = () => {
  toggleTrash.value = !toggleTrash.value
  if (toggleTrash.value) {
    d.browseOption = { all: true, onlyTrashed: true }
    getChurches()
  } else {
    d.browseOption = { all: true }
    getChurches()
  }
}

const handleRestore = async (churchID: number | undefined) => {
  const consume = await useConsumeApi(RoutePaths.CHURCHES, churchID)
  const res = await consume.restore()
  if (res) {
    d.churches = d.churches.filter((church) => church.id !== churchID)
  }
}

const handleDestroy = async (churchID: number | undefined) => {
  if (!churchID) return

  try {
    await showConfirmDialog({
      title: "Confirm Deletion",
      message: "Are you sure? You cannot undo this action afterwards.",
    })

    const consume = await useConsumeApi(RoutePaths.CHURCHES, churchID)
    const res = await consume.delete(true)
    if (res) {
      d.churches = d.churches.filter((church) => church.id !== churchID)
    }
  } catch {
    // Handle error silently
  }
}

getChurches()
</script>
