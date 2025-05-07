<template>
  <div>
    <div class="landing-title">{{h.translate("venture_tools")}}</div>

    <div class="wrap-links">
      <VanRow :gutter="[20, 20]" justify="space-between">
        <VanCol span="12">
          <div>
            <NuxtLink to="/prayers">
              <div class="landing-links">
                <div class="icons">
                  <PrayingHands style="width: 30px" />
                </div>
                <div>{{ h.translate("prayers") }}</div>
              </div>
            </NuxtLink>
          </div>
        </VanCol>
        <VanCol span="12">
          <NuxtLink to="/contacts">
            <div class="landing-links">
              <div class="icons">
                <PersonRound style="width: 30px" />
              </div>
              <div>{{ h.translate("contacts") }}</div>
            </div>
          </NuxtLink>
        </VanCol>
        <VanCol span="12">
          <NuxtLink to="/churches">
            <div class="landing-links">
              <div class="icons">
                <ChurchRound style="width: 30px" />
              </div>
              <div>{{ h.translate("churches") }}</div>
            </div>
          </NuxtLink>
        </VanCol>
        <VanCol span="12">
          <NuxtLink to="/communities">
            <div class="landing-links">
              <div class="icons">
                <GroupRound style="width: 30px" />
              </div>
              <div>{{ h.translate("communities") }}</div>
            </div>
          </NuxtLink>
        </VanCol>
      </VanRow>
    </div>

    <div class="wrap-profile">
      <NuxtLink to="/settings" style="color: white">
        <SettingsRound />
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ChurchRound,
  GroupRound,
  PersonRound,
  SettingsRound,
} from "@vicons/material"
import { PrayingHands } from "@vicons/fa"

import { useAuthStore } from "~/stores/useAuthStore"
import { useLanguageStore } from "~/stores/useLanguageStore"
import { useSettingStore } from "~/stores/useSettingStore"

const authUser = useAuthStore().authUser
const languages = useLanguageStore().languages

onMounted(() => {
  const userPreferredLanguage = languages.find((language:any) => language.id === authUser.preferred_language_id)
  console.log("+++++++++", userPreferredLanguage)
  if(userPreferredLanguage) {
    useSettingStore().setUserPreferredLanguage(userPreferredLanguage)
  }
})

const h = useHelpers()
</script>

<style lang="scss" scoped>
$primaryColor: #17badf;

.landing {
  &-title {
    color: $primaryColor;
    text-align: center;
    font-weight: bold;
    height: 200px;
    line-height: 200px;
  }
}
.landing-links {
  background: $primaryColor;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  color: black;
  height: 60px;
}

.wrap-links {
  display: inline-block;
  margin: 0 20px;

  .icons {
    height: 40px;
  }
}

.wrap-profile {
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 30px;
  height: 30px;
  color: white;
}
</style>
