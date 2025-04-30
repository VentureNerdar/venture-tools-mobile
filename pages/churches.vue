<template>
  <div>
    <VanCellGroup>
      <VanSearch
        v-model="searchWord"
        placeholder="Search churches by name"
        shape="round"
      />

      <VanCell
        v-for="(church, index) in d.churches"
        :key="index"
        :title="church.name || ''"
        is-link
        @click="handleChurchClick(church.id)"
      />
      <!-- @click="() => navigateTo(`/contacts/${contact}`)" -->
    </VanCellGroup>
  </div>
</template>

<script lang="ts" setup>
import { RoutePaths, type BrowseConditionAll, type ChurchFormModel } from '~/types/index.d'
definePageMeta({
  layout: "application",
  name: "Churches",
})

const searchWord = ref("")


// const churches = [] as ChurchFormModel[]

const d = reactive({
  churches: [] as ChurchFormModel[]
})

const consume = {
  churches: useConsumeApi(RoutePaths.CHURCHES)
}

d.churches = await consume.churches.browse(
  { all: true} as BrowseConditionAll
)

const handleChurchClick = (churchID: number | undefined) => {
  console.log("Church ID", churchID)
  navigateTo({
    path: '/createForm',
    query: {
      moduleName: 'Churches',
      id: churchID,
    }
  })
}



</script>
