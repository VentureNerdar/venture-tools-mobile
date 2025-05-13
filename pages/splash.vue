<template>
  <div class="wrap">
    <VanLoading vertical> {{ d.currentTaskText }} </VanLoading>
  </div>
</template>

<script setup lang="ts">
import { useConsumeApi } from "~/composables/useConsumeApi"
import {
  RoutePaths,
  type BrowseCondition,
  type StoreOptions,
} from "~/types/index.d"

import { useLanguageStore } from "~/stores/useLanguageStore"
import { useSettingStore } from "~/stores/useSettingStore"
import { usePeopleGroupStore } from "~/stores/usePeopleGroupStore"
import { useCommunicationPlatformStore } from "~/stores/useCommunicationPlatformStore"
import { useCommunityStore } from "~/stores/useCommunityStore"
import { useUserStore } from "~/stores/useUserStore"
import { useFaithMilestoneStore } from "~/stores/useFaithMilestoneStore"
import type { LanguageFormModel } from "../types/models"

type ModuleNameType =
  | "User Roles"
  | "Languages"
  | "Language Words"
  | "Statuses"
  | "People Groups"
  | "Communication Platforms"
  | "Community Checklists"
  | "Faith Milestones"

type Task = [ModuleNameType, RoutePaths, string, StoreOptions, BrowseCondition]

definePageMeta({
  // middleware: "guest",
  // layout: "non-app",
})

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const d = reactive({
  completedModules: [] as string[],
  currentTaskText: "",

  defaultStoreOptions: {
    isPersist: true,
  } as StoreOptions,

  stores: {
    languages: useLanguageStore(),
    settings: useSettingStore(),
  },

  logoLoaded: false,
})

const query = { all: true } as BrowseCondition
const tasks: Task[] = [
  [
    "User Roles",
    RoutePaths.USERS_ROLES,
    "userRoles",
    {
      ...d.defaultStoreOptions,
      key: "userRoles",
      storeState: useUserStore().userRoles,
    } as StoreOptions,
    {
      ...query,
      whereNotIn: {
        key: "id",
        value: [1, 2],
      },
    },
  ],
  [
    "Languages",
    RoutePaths.LANGUAGES,
    "languages",
    {
      ...d.defaultStoreOptions,
      key: "languages",
      storeState: useLanguageStore().languages,
    } as StoreOptions,
    // query,
    {
      ...query,
      with: JSON.stringify(["translations"]),
    },
  ],

  [
    "Language Words",
    RoutePaths.LANGUAGE_WORDS,
    "languageWords",
    {
      ...d.defaultStoreOptions,
      key: "languageWords",
      storeState: useLanguageStore().words,
    } as StoreOptions,
    query,
  ],

  [
    "Statuses",
    RoutePaths.SETTINGS_STATUSES,
    "statuses",
    {
      ...d.defaultStoreOptions,
      key: "statuses",
      storeState: useSettingStore().statuses,
    } as StoreOptions,
    query,
  ],

  [
    "People Groups",
    RoutePaths.PEOPLE_GROUPS,
    "peopleGroups",
    {
      ...d.defaultStoreOptions,
      key: "peopleGroups",
      storeState: usePeopleGroupStore().peopleGroups,
    } as StoreOptions,
    query,
  ],

  [
    "Communication Platforms",
    RoutePaths.COMMUNICATION_PLATFORMS,
    "communicationPlatforms",
    {
      ...d.defaultStoreOptions,
      key: "communicationPlatforms",
      storeState: useCommunicationPlatformStore().communicationPlatforms,
    } as StoreOptions,
    query,
  ],

  [
    "Community Checklists",
    RoutePaths.COMMUNITY_CHECKLISTS,
    "communityChecklists",
    {
      ...d.defaultStoreOptions,
      key: "communityChecklists",
      storeState: useCommunityStore().communityChecklists,
    } as StoreOptions,
    query,
  ],

  [
    "Faith Milestones",
    RoutePaths.FAITH_MILESTONES,
    "faithMilestones",
    {
      ...d.defaultStoreOptions,
      key: "faithMilestones",
      storeState: useFaithMilestoneStore().faithMilestones,
    } as StoreOptions,
    query,
  ],
]

const s = reactive({
  faithMilestoneStore: useFaithMilestoneStore(),
  settings: useSettingStore(),
  peopleGroupStore: usePeopleGroupStore(),
  languageStore: useLanguageStore(),
  communicationPlatformStore: useCommunicationPlatformStore(),
})

const downloadSequence = async () => {
  for (const [moduleName, model, key, store, query] of tasks) {
    d.currentTaskText = `Fetching ${moduleName}...`
    await consume(moduleName, model, query, {
      ...d.defaultStoreOptions,
      key,
      store,
    } as StoreOptions)

    if (moduleName === 'Languages') {
      const languages = JSON.parse(localStorage.getItem('languages') || "[]")
      let defaultLang
      if (languages) {
        defaultLang = languages.find((l: LanguageFormModel) => l.locale === 'en')
        s.settings.setUserPreferredLanguage(defaultLang)
      }
    }
    if (moduleName === 'Statuses') {
      const statuses = JSON.parse(localStorage.getItem('statuses') || "[]")
      s.settings.setStatuses(statuses)
    }
    if (moduleName === 'Faith Milestones') {
      const faithMilestoneValues = JSON.parse(localStorage.getItem('faithMilestones') || "[]")
      s.faithMilestoneStore.setFaithMilestones(faithMilestoneValues)
    }
    if (moduleName === 'People Groups') {
      const peopleGroupValues = JSON.parse(localStorage.getItem('peopleGroups') || "[]")
      s.peopleGroupStore.setPeopleGroups(peopleGroupValues)
    }
    if (moduleName === 'Language Words') {
      const wordValues = JSON.parse(localStorage.getItem('languageWords') || "[]")
      s.languageStore.setWords(wordValues)
    }
    if (moduleName === 'Languages') {
      const languageValues = JSON.parse(localStorage.getItem('languages') || "[]")
      s.languageStore.setLanguages(languageValues)
    }

    if (moduleName === 'Communication Platforms') {
      const communicationPlatformValues = JSON.parse(localStorage.getItem('communicationPlatforms') || "[]")
      s.communicationPlatformStore.setCommunicationPlatforms(communicationPlatformValues)
    }

    await delay(500)

    if (!d.logoLoaded) {
      d.logoLoaded = true
    }
  }

  navigateTo("/landing")
}

const consume = async (
  moduleName: ModuleNameType,
  routePaths: RoutePaths,
  query: BrowseCondition,
  storeOptions: StoreOptions,
) => {
  const consumer = useConsumeApi(routePaths)
  await consumer.browse(query, storeOptions)

  d.completedModules.push(moduleName)

  if (moduleName === "Community Checklists") {
    d.currentTaskText = "Redirecting . . . "
  }
}

downloadSequence()


</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
