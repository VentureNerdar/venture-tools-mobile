<template>
  <div>
    <VanTabs :active="activeTab" style="margin-top: 46px">
      <VanTab :title="helpers.translate('contacts')" name="contacts">
        <VanList>
          <VanCell
            v-for="(prayer, index) in d.prayers.assignedToContactPrayers"
            :key="index"
            :title="prayer.name"
            :label="prayer.current_prayers"
          />
        </VanList>
      </VanTab>

      <VanTab :title="helpers.translate('churches')" name="churches">
        <VanList>
          <VanCell
            v-for="(prayer, index) in d.prayers.assignedToChurchPrayers"
            :key="index"
            :title="prayer.name"
            :label="prayer.current_prayers"
          />
        </VanList>
      </VanTab>
    </VanTabs>
  </div>
</template>
<script lang="ts" setup>
import { RoutePaths, type BrowseConditionAll } from '~/types/index.d'
definePageMeta({
  layout: "application",
})

const activeTab = ref(0)
const helpers = useHelpers()


type Prayers = {
  churchPlanterPrayers: any[]
  assignedToChurchPrayers: any[]
  assignedToContactPrayers: any[]
}

const consume = {
  prayers: useConsumeApi(RoutePaths.SETTINGS_PRAYERS)
}

const d = reactive({
  prayers: {} as Prayers
})

d.prayers = (await consume.prayers.browse(
  {all: true} as BrowseConditionAll
)) as Prayers

</script>
