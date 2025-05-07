<template>
  <div>
    <VanCellGroup>
      <VanSearch show-action v-model="searchWord" :placeholder="h.translate('search_communities_by_name')" @search="handleSearch" shape="round" >
        <template #action>
            <div style="display: flex; align-items: center; height: 100%;">
              <template v-if="toggleTrash">
                <VanButton @click="handleToggleTrash" size="small" type="danger" style="display: flex; align-items: center; justify-content: center;">
                  <DeleteFilled style="width: 16px; height: 16px;" />
                </VanButton>
              </template>
              <template v-else>
                <VanButton @click="handleToggleTrash" plain size="small" type="primary" style="display: flex; align-items: center; justify-content: center;">
                  <DeleteFilled style="width: 16px; height: 16px;" />
                </VanButton>
              </template>
            </div>
        </template>
      </VanSearch>

      <div v-if="toggleTrash && !d.communities.length" style="margin-top: 10px;">
        <VanField
           type="textarea"
           :placeholder="h.translate('no_trashed_community_found')"
           rows="1"
           autosize
        />
      </div>

      <VanSwipeCell v-for="(community, index) in d.communities" :key="index">
        <template v-if="toggleTrash" #right>
          <VanButton square type="primary" text="Restore" @click="handleRestore(community.id)" />
          <VanButton square type="danger" text="Destroy" @click="handleDestroy(community.id)" />
        </template>
        <template v-else #right>
          <VanButton square type="primary" text="Edit" @click="handleEdit(community.id)" />
          <VanButton square type="danger" text="Delete" @click="handleDelete(community.id)" />
        </template>
        <VanCell :title="community.name || ''" />
      </VanSwipeCell>
    </VanCellGroup>
  </div>
</template>

<script lang="ts" setup>
import { RoutePaths, type BrowseCondition } from '../types/index.d'
import { DeleteFilled } from '@vicons/material'
import type { CommunityFormModel } from '../types/models.ts'
definePageMeta({
  layout: "application",
  name: "Communities",
})

const searchWord = ref("")
const toggleTrash = ref(false)
const h = useHelpers()
const d = reactive({
  communities: [] as CommunityFormModel[],
  browseOption: { all: true } as BrowseCondition,
})
const consume = {
  communities: useConsumeApi(RoutePaths.COMMUNITIES)
}

const getCommunities = async () => {
  d.communities = await consume.communities.browse(
    d.browseOption
  )
}

const handleSearch = async () => {
  d.browseOption = { all: true, search: searchWord.value, search_by: 'name'}
  getCommunities()
}

const handleEdit = (communityID: number | undefined) => {
  navigateTo({
    path: '/createForm',
    query: {
      moduleName: 'Communities',
      id: communityID,
    }
  })
}

const handleDelete = async (communityID: number | undefined) => {
  if (!communityID) return
  try {
    await showConfirmDialog({
      title: 'Confirm Deletion',
      message: 'Are you sure? You cannot undo this action afterwards.',
    })

    const consume = useConsumeApi(RoutePaths.COMMUNITIES, communityID)
    const res = await consume.delete(false)
    if (res) {
      d.communities = d.communities.filter((community: CommunityFormModel) => community.id !== communityID)
    } 
  } catch {
    // Handle error silently
  }
}

const handleToggleTrash = () => {
  toggleTrash.value = !toggleTrash.value
  if(toggleTrash.value) {
    d.browseOption = {all: true, onlyTrashed: true}
    getCommunities()
  } else {
    d.browseOption = {all:true}
    getCommunities()
  }
}

const handleRestore = async (communityID: number | undefined) => {
  const consume = useConsumeApi(RoutePaths.COMMUNITIES, communityID)
  const res = await consume.restore()
  if (res) {
    d.communities = d.communities.filter((community: CommunityFormModel) => community.id !== communityID)
  }
}

const handleDestroy = async (communityID: number | undefined) => {
  if (!communityID) return

  try {
    await showConfirmDialog({
      title: 'Confirm Deletion',
      message: 'Are you sure? You cannot undo this action afterwards.',
    })

    const consume = useConsumeApi(RoutePaths.COMMUNITIES, communityID)
    const res = await consume.delete(true)
    if (res) {
      d.communities = d.communities.filter((community: CommunityFormModel)   => community.id !== communityID)
    } 
  } catch {
    // Handle error silently
  }
}

getCommunities()
</script>
