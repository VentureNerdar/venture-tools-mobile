<template>
  <div>
    <VanTabs
      :active="activeTab"
      style="margin-top: 46px"
    >
      <VanTab
        :title="helpers.translate('contacts')"
        name="contacts"
      >
        <VanList>
          <VanCell
            v-for="(prayer, index) in d.prayers.contactPrayers"
            :key="index"
            :title="prayer.name"
            :label="prayer.current_prayers"
          />
        </VanList>
      </VanTab>

      <VanTab
        :title="helpers.translate('churches')"
        name="churches"
      >
        <VanList>
          <VanCell
            v-for="(prayer, index) in d.prayers.churchPrayers"
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
import { RoutePaths, type BrowseConditionAll } from "~/types/index.d"
definePageMeta({
  layout: "application",
})

const activeTab = ref(0)
const helpers = useHelpers()

type Prayers = {
  churchPrayers: any[]
  contactPrayers: any[]
}

const consume = {
  prayers: useConsumeApi(RoutePaths.SETTINGS_PRAYERS),
}

const d = reactive({
  prayers: {} as Prayers,
})

d.prayers = (await consume.prayers.browse({
  all: true,
} as BrowseConditionAll)) as Prayers

console.log("Current  Prayer", d.prayers)
</script>
