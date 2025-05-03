<template>
  <div>
    <VanNavBar
fixed :left-arrow="showBackButton" :title="pageName" @click-left="() => $router.back()"
      @click-right="hasCreateButton ? m.handle.click.btnAddNew() : undefined">
      <template #right>
        <span v-if="hasCreateButton">
          <PlusRound style="width: 24px; height: 24px" />
        </span>
      </template>
    </VanNavBar>

    <div style="margin-top: 46px">
      <NuxtPage />
    </div>

    <VanTabbar v-if="!showBackButton" fixed route>
      <VanTabbarItem replace to="/prayers">
        <template #icon>
          <PrayingHands style="width: 18px; height: 18px" />
        </template>

        Prayers
      </VanTabbarItem>

      <VanTabbarItem replace to="/contacts">
        <template #icon>
          <PersonRound style="width: 18px; height: 18px" />
        </template>

        Contacts
      </VanTabbarItem>

      <VanTabbarItem replace to="/churches">
        <template #icon>
          <ChurchRound style="width: 18px; height: 18px" />
        </template>

        Churches
      </VanTabbarItem>

      <VanTabbarItem replace to="/communities">
        <template #icon>
          <GroupRound style="width: 18px; height: 18px" />
        </template>

        Communities
      </VanTabbarItem>

      <VanTabbarItem replace to="/settings">
        <template #icon>
          <SettingsRound style="width: 18px; height: 18px" />
        </template>

        Settings
      </VanTabbarItem>
    </VanTabbar>
  </div>
</template>

<script lang="ts" setup>
import {
  ChurchRound,
  GroupRound,
  PersonRound,
  SettingsRound,
  PlusRound,
} from "@vicons/material"
import { PrayingHands } from "@vicons/fa"

const route = useRoute()

const pageName = computed(() => {
  const name = (route.name ? route.name : "") as string

  const isEdit = route.query.id !== undefined

  let pageName = name[0].toUpperCase() + name.slice(1)

  if (pageName === "Create") {
    if (isEdit) {
      pageName = "Edit" + (route.query.moduleName ? " " + route.query.moduleName : "")
    } else {
      pageName =
        pageName + (route.query.moduleName ? " " + route.query.moduleName : "")
    }

  }
  return pageName
})

const m = {
  handle: {
    click: {
      btnAddNew: () => {
        navigateTo({
          path: "/createForm",
          query: {
            moduleName: pageName.value,
          },
        })
      },
    },
  },
}

const hasCreateButton = computed(() => {
  const creatablePages = ["Contacts", "Churches", "Communities"]
  const currentPageName = route.name ? route.name : ""

  return creatablePages.includes(currentPageName as string)
})

const showBackButton = computed(() => {
  return route.name === "Create"
    ? true
    : route.path.split("/").length > 2
      ? true
      : false
})
</script>
