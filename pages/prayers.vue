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
        <VanList
          v-model:loading="loading.contacts"
          :finished="finished.contacts"
          finished-text="No More Data"
          @load="m.handle.loadMoreContacts"
        >
          <VanCell
            v-for="(prayer, index) in d.prayers.contactPrayers"
            :key="index"
          >
            <template #title>
              {{ prayer.name }}
            </template>
            <template #label>
              <div>
                {{ prayer.current_prayers }}
                <div class="flex items-center gap-1 mt-1">
                  <PrayingHands
                    :style="{
                      color: prayer.user_has_prayed
                        ? '#17badf'
                        : unPrayedHandColor,
                      width: '18px',
                      height: '18px',
                      paddingRight: '10px',
                      paddingTop: '10px',
                    }"
                    @click="m.handle.click.contactPrayerCount(prayer)"
                  />
                  <span class="custom-title">
                    {{ m.handle.formattedPrayerCount(prayer) }}
                  </span>
                </div>
              </div>
            </template>
          </VanCell>
        </VanList>
      </VanTab>

      <VanTab
        :title="helpers.translate('churches')"
        name="churches"
      >
        <!-- <VanList>
          <VanCell
            v-for="(prayer, index) in d.prayers.churchPrayers"
            :key="index"
            :title="prayer.name"
            :label="prayer.current_prayers"
          />
        </VanList> -->
        <VanList
          v-model:loading="loading.churches"
          :finished="finished.churches"
          finished-text="No More Data"
          @load="m.handle.loadMoreChurches"
        >
          <VanCell
            v-for="(prayer, index) in d.prayers.churchPrayers"
            :key="index"
          >
            <template #title>
              {{ prayer.name }}
            </template>
            <template #label>
              <div>
                {{ prayer.current_prayers }}
                <div class="flex items-center gap-1 mt-1">
                  <PrayingHands
                    :style="{
                      color: prayer.user_has_prayed
                        ? '#17badf'
                        : unPrayedHandColor,
                      width: '18px',
                      height: '18px',
                      paddingRight: '10px',
                      paddingTop: '10px',
                    }"
                    @click="m.handle.click.churchPrayerCount(prayer)"
                  />
                  <span class="custom-title">
                    {{ m.handle.formattedPrayerCount(prayer) }}
                  </span>
                </div>
              </div>
            </template>
          </VanCell>
        </VanList>
      </VanTab>
    </VanTabs>
  </div>
</template>
<script lang="ts" setup>
import { RoutePaths, type BrowseConditionAll } from "~/types/index.d"
import { PrayingHands } from "@vicons/fa"
import { loadingProps } from "vant"
import { useAuthStore } from "~/stores/useAuthStore"
import { useThemeStore } from "~/stores/useTheme"

definePageMeta({
  layout: "application",
})

const activeTab = ref(0)
const helpers = useHelpers()
const limit = ref(10)
const loading = reactive({ contacts: false, churches: false })
const finished = reactive({ contacts: false, churches: false })
const authStore = useAuthStore()
const themeStore = useThemeStore()

console.log("[ThemeStore] current theme is:", themeStore.darkMode)

type Prayers = {
  churchPrayers: any[]
  contactPrayers: any[]
}

onMounted(async () => {
  await authStore.loadFromSecureStorage()
})

console.log("[Auth] Prayer auth user ", authStore.authUser)
console.log("[Auth] Prayer page token ", authStore.token)

const consume = {
  prayers: await useConsumeApi(RoutePaths.SETTINGS_PRAYERS),
  contactPrayerCount: await useConsumeApi(RoutePaths.CONTACT_PRAYER_COUNT),
  churchPrayerCount: await useConsumeApi(RoutePaths.CHURCH_PRAYER_COUNT),
}

const unPrayedHandColor = computed(() => {
  // this will automatically re-compute when themeStore.darkMode changes
  return themeStore.darkMode ? "#fff" : "#000"
})

const m = {
  handle: {
    click: {
      contactPrayerCount: async (contact: any) => {
        if (contact.user_has_prayed) return
        const res = await consume.contactPrayerCount.save({
          contact_id: contact.id,
        })
        if (res) {
          contact.user_has_prayed = true
          contact.prayer_count += 1
        }
      },
      churchPrayerCount: async (church: any) => {
        if (church.user_has_prayed) return
        const res = await consume.churchPrayerCount.save({
          church_id: church.id,
        })
        if (res) {
          church.user_has_prayed = true
          church.prayer_count += 1
        }
      },
    },
    formattedPrayerCount: (item: any) => {
      if (item.user_has_prayed) {
        if (item.prayer_count === 1) return "You prayed for this"
        if (item.prayer_count === 2) return "You and 1 other prayed for this"
        return `You and ${item.prayer_count - 1} others prayed for this`
      } else {
        if (item.prayer_count === 1) return "1 person prayed for this"
        if (item.prayer_count === 0) return "No one prayed for this"
        return `${item.prayer_count} people prayed for this`
      }
    },
    loadMoreContacts: async () => {
      loading.contacts = true
      limit.value += limit.value // double the limit
      const newData = await consume.prayers.browse({
        with: JSON.stringify(limit.value),
      } as BrowseConditionAll)
      console.log("Contact prayer length error+++", d.prayers.contactPrayers)

      if (d.prayers.contactPrayers.length === newData.contactPrayers.length) {
        finished.contacts = true
      } else {
        d.prayers.contactPrayers = newData.contactPrayers
      }
      loading.contacts = false
    },

    loadMoreChurches: async () => {
      loading.churches = true
      limit.value += limit.value // double the limit
      const newData = await consume.prayers.browse({
        with: JSON.stringify(limit.value),
      } as BrowseConditionAll)
      if (d.prayers.churchPrayers.length === newData.churchPrayers.length) {
        finished.churches = true
      } else {
        d.prayers.churchPrayers = newData.churchPrayers
      }
      loading.churches = false
    },
  },
}

const d = reactive({
  prayers: {} as Prayers,
})

// d.prayers = (await consume.prayers.browse({
//   all: true,
// } as BrowseConditionAll)) as Prayers
d.prayers = (await consume.prayers.browse({
  with: JSON.stringify(limit.value),
} as BrowseConditionAll)) as Prayers

console.log("Current  Prayer", d.prayers)
</script>
