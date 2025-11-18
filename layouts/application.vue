<template>
  <div>
    <VanNavBar
      fixed
      :left-arrow="showBackButton"
      :title="pageName.translated"
      @click-left="() => $router.back()"
      @click-right="hasCreateButton ? m.handle.click.btnAddNew() : undefined"
      style="z-index: 999"
    >
      <template #right>
        <span v-if="hasCreateButton">
          <PlusRound style="width: 24px; height: 24px" />
        </span>
      </template>
    </VanNavBar>

    <div style="margin-top: 46px; margin-bottom: 48px">
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
    <div class="fab-wrapper">
      <VanFloatingBubble
        v-if="showBubble"
        axis="lock"
        icon="plus"
        :gap="{ x: 20, y: 80 }"
        class="fab-main"
        @click="toggleFab"
      />

      <!-- Action Buttons -->
      <transition-group name="fab">
        <div
          v-if="fabOpen"
          class="fab-action"
          key="prayers"
          @click="goTo('Prayers')"
        >
          Prayers
        </div>

        <div
          v-if="fabOpen"
          class="fab-action"
          key="contacts"
          @click="goTo('Contacts')"
        >
          Contact
        </div>

        <div
          v-if="fabOpen"
          class="fab-action"
          key="churches"
          @click="goTo('Churches')"
        >
          Church
        </div>

        <div
          v-if="fabOpen"
          class="fab-action"
          key="communities"
          @click="goTo('Communities')"
        >
          Community
        </div>
      </transition-group>
    </div>
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

const showBubble = computed(() =>
  [
    "/landing",
    "/prayers",
    "/churches",
    "/contacts",
    "/communities",
    "/settings",
  ].includes(route.path)
)

const fabOpen = ref(false)
const toggleFab = () => (fabOpen.value = !fabOpen.value)

const goTo = (name: string) => {
  fabOpen.value = false
  navigateTo({
    path: "/createForm",
    query: { moduleName: name },
  })
}

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

<style scoped>
.fab-wrapper {
  position: fixed;
  right: 20px;
  bottom: 132px;
  z-index: 9999;
}

.fab-main {
  z-index: 10010;
}

.fab-action {
  background: #17badf;
  color: white;
  padding: 10px 18px;
  border-radius: 22px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transform-origin: bottom right;
  transition: all 0.2s ease-out;
}

/* Animation for the action buttons */
.fab-enter-from,
.fab-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.8);
}
.fab-enter-active,
.fab-leave-active {
  transition: all 0.2s ease;
}
</style>
