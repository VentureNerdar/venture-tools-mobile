<template>
  <div>
    <VanNavBar
      fixed
      :left-arrow="showBackButton"
      :title="pageName.translated"
      @click-left="() => $router.back()"
      @click-right="hasCreateButton ? m.handle.click.btnAddNew() : undefined"
    >
      <template #right>
        <span v-if="hasCreateButton">
          <PlusRound style="width: 24px; height: 24px" />
        </span>
      </template>
    </VanNavBar>

    <div style="margin-top: 46px">
      <NuxtPage />
    </div>

    <VanTabbar
      v-if="!showBackButton"
      fixed
      route
    >
      <VanTabbarItem
        replace
        to="/prayers"
      >
        <template #icon>
          <PrayingHands style="width: 18px; height: 18px" />
        </template>

        {{ h.translate("prayers") }}
      </VanTabbarItem>

      <VanTabbarItem
        replace
        to="/contacts"
      >
        <template #icon>
          <PersonRound style="width: 18px; height: 18px" />
        </template>

        {{ h.translate("contacts") }}
      </VanTabbarItem>

      <VanTabbarItem
        replace
        to="/churches"
      >
        <template #icon>
          <ChurchRound style="width: 18px; height: 18px" />
        </template>

        {{ h.translate("churches") }}
      </VanTabbarItem>

      <VanTabbarItem
        replace
        to="/communities"
      >
        <template #icon>
          <GroupRound style="width: 18px; height: 18px" />
        </template>

        {{ h.translate("communities") }}
      </VanTabbarItem>

      <VanTabbarItem
        replace
        to="/settings"
      >
        <template #icon>
          <SettingsRound style="width: 18px; height: 18px" />
        </template>

        {{ h.translate("settings") }}
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
const h = useHelpers()

const pageName = computed(() => {
  const name = (route.name ? route.name : "") as string
  const isEdit = route.query.id !== undefined
  const moduleName = route.query.moduleName as string | undefined

  let rawPageName = name[0].toUpperCase() + name.slice(1)

  if (rawPageName === "Create") {
    if (isEdit) {
      rawPageName = "Edit" + (moduleName ? " " + moduleName : "")
    } else {
      rawPageName += moduleName ? " " + moduleName : ""
    }
  }

  let translated = h.translate(h.toSnakeCase(rawPageName))
  if (rawPageName == "Settings-profile") {
    translated = h.translate("profile")
  }
  return {
    raw: rawPageName,
    translated,
  }
})

const m = {
  handle: {
    click: {
      btnAddNew: () => {
        navigateTo({
          path: "/createForm",
          query: {
            moduleName: pageName.value.raw,
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
