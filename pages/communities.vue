<template>
  <div>
    <VanCellGroup>
      <VanSearch
        v-model="searchWord"
        placeholder="Search communities by name"
        shape="round"
      />

      <VanCell
        v-for="(community, index) in d.communities"
        :key="index"
        :title="community.name || ''"
        is-link
        @click="handleCommunityClick(community.id)"
      />
      <!-- @click="() => navigateTo(`/contacts/${contact}`)" -->
    </VanCellGroup>
  </div>
</template>

<script lang="ts" setup>
import type { BrowseConditionAll, CommunityFormModel } from '~/types/index.d'
import { RoutePaths } from '~/types/index.d'

definePageMeta({
  layout: "application",
  name: "Communities",
})

const searchWord = ref("")

const consume = {
  communities: useConsumeApi(RoutePaths.COMMUNITIES)
}

const d = reactive({
  communities: [] as CommunityFormModel[]
})

d.communities = await consume.communities.browse(
  {all: true} as BrowseConditionAll
)

const handleCommunityClick = (communityID: number | undefined) => {
  navigateTo({
    path: '/createForm',
    query: {
      moduleName: 'Communities',
      id: communityID,
    }
  })
}


</script>
