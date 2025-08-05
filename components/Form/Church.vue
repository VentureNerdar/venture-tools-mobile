<template>
  <div class="church">
    <VanForm @submit="onSubmit">
      <VanCellGroup>
        <!-- IS ACTIVE -->
        <VanField
          name="isActive"
          :label="h.translate('is_active')"
        >
          <template #input>
            <VanSwitch v-model="d.form.is_active" />
          </template>
        </VanField>
        <!-- e.o IS ACTIVE -->

        <!-- COMMUNITY -->
        <VanField
          v-model="communityFieldValue"
          readonly
          :label="h.translate('community')"
          :placeholder="h.translate('select_community')"
          :rules="[
            {
              required: true,
              message: h.translate('the_community_id_field_is_required'),
            },
          ]"
          required
          @click="d.visibility.communityPicker = true"
        />
        <VanPopup
          v-model:show="d.visibility.communityPicker"
          destroy-on-close
          round
          position="bottom"
        >
          <VanPicker
            :model-value="communityID"
            :columns="d.options.communities"
            @cancel="d.visibility.communityPicker = false"
            @confirm="m.handle.click.confirmCommunityPicker"
          />
        </VanPopup>
        <!-- e.o COMMUNITY -->

        <!-- CHURCH PLANTERS -->
        <VanField
          :label="h.translate('church_planters')"
          :model-value="auth.authUser.name"
          readonly
        />
        <!-- e.o CHURCH PLANTERS -->

        <!-- CHURCH NAME -->
        <VanField
          v-model="d.form.name"
          :label="h.translate('church_name')"
          :placeholder="h.translate('enter_church_name')"
          required
          :rules="[
            { required: true, message: h.translate('name_is_required') },
          ]"
        />
        <!-- e.o CHURCH NAME -->

        <!-- LONGITUDE -->
        <VanField
          v-model="d.form.location_longitude as string"
          :label="h.translate('longitude')"
          :placeholder="h.translate('please_input')"
          :rules="[
            { required: true, message: h.translate('longitude_is_required') },
          ]"
          required
        />
        <!-- e.o LONGITUDE -->

        <!-- LATITUDE  -->
        <VanField
          v-model="d.form.location_latitude as string"
          :label="h.translate('latitude')"
          :placeholder="h.translate('please_input')"
          :rules="[
            { required: true, message: h.translate('latitude_is_required') },
          ]"
          required
        />
        <!-- e.o LATITUDE -->
        <van-dialog
          v-model:show="d.visibility.showMaps"
          :class="themeStore.darkMode ? 'dark-theme' : 'light-theme'"
          :title="h.translate('select_location')"
          :show-cancel-button="true"
          width="90%"
          @confirm="m.handle.click.handleLocationConfirm"
        >
          <FormPartialsSelectLocation
            :latitude="Number(d.form.location_latitude)"
            :longitude="Number(d.form.location_longitude)"
            @update="m.handle.emits.handleLocationSelected"
          />
        </van-dialog>
        <div style="display: flex; justify-content: center; padding: 10px">
          <VanButton
            type="primary"
            @click="m.handle.click.handleOpenMaps"
            >{{ h.translate("select_location") }}</VanButton
          >
        </div>

        <!-- CHURCH DESCRIPTION -->
        <VanField
          v-model="d.form.description"
          :label="h.translate('church_description')"
          :placeholder="h.translate('enter_church_description')"
        />
        <!-- e.o CHURCH DESCRIPTION -->

        <!-- PARENT CHURCH -->
        <VanField
          v-model="parentChurchFieldValue"
          readonly
          :label="h.translate('parent_church')"
          :placeholder="h.translate('select_parent_church')"
          @click="d.visibility.parentChurchPicker = true"
        />
        <VanPopup
          v-model:show="d.visibility.parentChurchPicker"
          destroy-on-close
          round
          position="bottom"
        >
          <VanPicker
            :model-value="parentChurchID"
            :columns="d.options.parentChurches"
            @cancel="d.visibility.parentChurchPicker = false"
            @confirm="m.handle.click.confirmParentChurchPicker"
          />
        </VanPopup>
        <!-- e.o PARENT CHURCH -->

        <!-- CHURCH WEBSITE -->
        <VanField
          v-model="d.form.website"
          :label="h.translate('church_website')"
          :placeholder="h.translate('enter_church_website')"
        />
        <!-- e.o CHURCH WEBSITE -->

        <!-- FOUNDED AT -->
        <VanField
          v-model="d.form.founded_at"
          readonly
          :label="h.translate('founded_at')"
          :placeholder="h.translate('select_date')"
          @click="d.visibility.foundedAtPicker = true"
        />
        <VanPopup
          v-model:show="d.visibility.foundedAtPicker"
          destroy-on-close
          round
          position="bottom"
        >
          <VanDatePicker
            :model-value="foundedAt"
            @cancel="d.visibility.foundedAtPicker = false"
            @confirm="m.handle.click.confirmFoundedAtPicker"
          />
        </VanPopup>
        <!-- e.o FOUNDED AT  -->

        <!-- DENOMINATION -->
        <VanField
          v-model="denominationFieldValue"
          readonly
          :label="h.translate('denomination')"
          :placeholder="h.translate('select_church_denomination')"
          @click="d.visibility.denominationPicker = true"
        />
        <VanPopup
          v-model:show="d.visibility.denominationPicker"
          destroy-on-close
          round
          position="bottom"
        >
          <VanPicker
            :model-value="denominationID"
            :columns="d.options.denominations"
            @cancel="d.visibility.denominationPicker = false"
            @confirm="m.handle.click.confirmDenominationPicker"
          />
        </VanPopup>
        <!-- e.o DENOMINATION` -->

        <!-- CHURCH PHONE NUMBER -->
        <VanField
          v-model="d.form.phone_number"
          :label="h.translate('church_phone_number')"
          :placeholder="h.translate('enter_church_phone_number')"
        />
        <!-- e.o CHURCH PHONE NUMBER -->

        <!-- IS VISITED -->
        <VanField
          name="isVisited"
          :label="h.translate('is_visited')"
        >
          <template #input>
            <VanSwitch v-model="d.form.is_visited" />
          </template>
        </VanField>
        <!-- e.o IS VISITED -->

        <!-- MEMBER COUNT BY PEOPLE GROUP BOOLEAN -->
        <VanField
          name="isMemberCountByPeopleGroup"
          :label="h.translate('member_count_by_people_group')"
        >
          <template #input>
            <VanSwitch
              v-model="d.form.member_count_by_people_group"
              @change="m.handle.click.memberCountByPeopleGroup"
            />
          </template>
        </VanField>
        <!-- e.o MEMBER COUNT BY PEOPLE GROUP BOOLEAN -->

        <!-- MEMBER COUNT BY PEOPLE GROUP -->
        <FormPartialsMemberCountByPeopleGroup
          v-if="d.form.member_count_by_people_group"
          :people-group-list="d.peopleGroupList"
          :model-value="d.form.member_count_list_by_people_group"
          @update:model-value="m.handle.emits.updateMemberCountByPeopleGroup"
        />
        <!-- e.o MEMBER COUNT BY PEOPLE GROUP -->

        <!-- CHURCH MEMBER COUNT -->
        <VanField
          v-if="!d.form.member_count_by_people_group"
          :label="h.translate('church_members_count')"
        >
          <template #input>
            <VanStepper
              v-model="d.form.church_members_count"
              :min="0"
              :default-value="0"
            />
          </template>
        </VanField>
        <!-- e.o CHURCH MEMBER COUNT -->

        <!-- CONFESSION OF FAITH COUNT -->
        <VanField :label="h.translate('confession_of_faith_count')">
          <template #input>
            <VanStepper
              v-model="d.form.confession_of_faith_count"
              :min="0"
              :default-value="0"
            />
          </template>
        </VanField>
        <!-- e.o CONFESSION OF FAITH COUNT -->

        <!-- BAPTIZED COUNT -->
        <VanField :label="h.translate('baptized_count')">
          <template #input>
            <VanStepper
              v-model="d.form.baptism_count"
              :min="0"
              :default-value="0"
            />
          </template>
        </VanField>
        <!-- e.o BAPTIZED COUNT -->

        <!-- PRAYERS PROMPT -->
        <VanField
          v-model="prayerPromptFieldValue"
          readonly
          :label="h.translate('prayer_prompts')"
          :placeholder="h.translate('choose_prayer_prompts')"
          @click="d.visibility.prayerPromptPicker = true"
        />
        <VanPopup
          v-model:show="d.visibility.prayerPromptPicker"
          destroy-on-close
          round
          position="bottom"
        >
          <VanPicker
            :model-value="prayerPromptID"
            :title="h.translate('title')"
            :columns="prayerPromptList"
            @cancel="d.visibility.prayerPromptPicker = false"
            @confirm="m.handle.click.confirmPrayerPromptPicker"
          />
        </VanPopup>

        <!-- e.o PRAYERS PROMPT -->

        <!-- CURRENT PRAYERS -->
        <VanField
          v-model="d.form.current_prayers"
          :label="h.translate('current_prayers')"
          :placeholder="h.translate('please_input')"
        />
        <!-- e.o CURRENT PRAYERS -->
      </VanCellGroup>

      <div style="margin: 16px; display: flex; gap: 16px">
        <VanButton
          round
          block
          type="default"
          style="flex: 1"
          @click="router.back"
        >
          {{ h.translate("cancel") }}
        </VanButton>
        <VanButton
          round
          block
          type="primary"
          style="flex: 1"
          @click="onSubmit"
        >
          {{ h.translate("submit") }}
        </VanButton>
      </div>
    </VanForm>
  </div>
</template>

<script lang="ts" setup>
import type { Numeric } from "vant/es/utils"
import { useAuthStore } from "~/stores/useAuthStore"
import {
  RoutePaths,
  type UserFormModel,
  type BrowseConditionAll,
  type ChurchFormModel,
  type BrowseCondition,
  type PeopleGroupFormModel,
} from "~/types/index.d"
import { useThemeStore } from "~/stores/useTheme"

const helpers = useHelpers()
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const themeStore = useThemeStore()
const churchId = route.query.id ? Number(route.query.id) : undefined

const communityFieldValue = ref("")
const parentChurchFieldValue = ref("")
const denominationFieldValue = ref("")
const prayerPromptFieldValue = ref("")

const communityID = ref<Numeric[]>([])
const parentChurchID = ref<Numeric[]>([])
const prayerPromptID = ref<Numeric[]>([])
const foundedAt = ref<string[]>([])
const denominationID = ref<Numeric[]>([])
const churchPlanterList = ref<UserFormModel[]>([])
const h = useHelpers()

const d = reactive({
  visibility: {
    communityPicker: false,
    parentChurchPicker: false,
    foundedAtPicker: false,
    denominationPicker: false,
    churchPlanterDialog: false,
    showMaps: false,
    prayerPromptPicker: false,
  },
  form: {
    is_active: true,
    church_planters: null,
    name: "",
    description: "",
    founded_at: null,
    phone_number: "",
    website: "",
    location_longitude: "",
    location_latitude: "",
    google_location_data: "",
    province_name: "",
    district_name: "",
    denomination_id: null,
    is_visited: false,
    church_members_count: undefined,
    confession_of_faith_count: undefined,
    baptism_count: undefined,
    community_id: null,
    parent_church_id: null,
    current_prayers: "",
    member_count_by_people_group: false,
    member_count_list_by_people_group: [],
    church_members: [],
  } as ChurchFormModel,
  prayer_prompt_id: null as number | null,
  peopleGroupList: [] as PeopleGroupFormModel[],
  options: {
    communities: [] as FormattedOption[],
    parentChurches: [] as FormattedOption[],
    denominations: [] as FormattedOption[],
    prayerPrompts: [] as FormattedOption[],
  },
})

const consume = {
  communities: await useConsumeApi(RoutePaths.COMMUNITIES),
  churches: await useConsumeApi(RoutePaths.CHURCHES),
  denominations: await useConsumeApi(RoutePaths.DENOMINATIONS),
  churchPlanter: await useConsumeApi(RoutePaths.USERS),
  prayerPrompts: await useConsumeApi(RoutePaths.PRAYER_PROMPTS),
  peopleGroups: await useConsumeApi(RoutePaths.PEOPLE_GROUPS),
}

const m = {
  consume: {
    defaultCommunitiesForCommunityOption: async () => {
      const communities = await consume.communities.list({
        labelOption: "name",
        limit: 20,
      })
      d.options.communities = helpers.formatOptions(communities)
    },
    defaultChurchesForChurchOption: async () => {
      const churches = await consume.churches.list({
        labelOption: "name",
        limit: 20,
      })
      d.options.parentChurches = helpers.formatOptions(churches)
    },
    defaultDenominationsForDenominationOption: async () => {
      const denominations = await consume.denominations.list({
        labelOption: "name",
        limit: 20,
      })
      d.options.denominations = helpers.formatOptions(denominations)
    },
    defaultChurchPlanters: async () => {
      const bc = {
        all: true,
        limit: 20,
        where: JSON.stringify([{ key: "user_role_id", value: 4 }]),
      } as BrowseConditionAll
      churchPlanterList.value = await consume.churchPlanter.browse(bc, false)
    },
    defaultPrayerPrompts: async () => {
      const bc = {
        all: true,
      } as BrowseConditionAll
      d.options.prayerPrompts = await consume.prayerPrompts.browse(bc, false)
    },
  },
  handle: {
    click: {
      confirmCommunityPicker: ({
        selectedOptions,
      }: {
        selectedOptions: FormattedOption[]
      }) => {
        d.form.community_id = selectedOptions[0].value as number
        communityFieldValue.value = selectedOptions[0].text
        communityID.value = [selectedOptions[0].value as Numeric]
        d.visibility.communityPicker = false
      },
      confirmParentChurchPicker: ({
        selectedOptions,
      }: {
        selectedOptions: FormattedOption[]
      }) => {
        d.form.parent_church_id = selectedOptions[0].value as number
        parentChurchFieldValue.value = selectedOptions[0].text
        parentChurchID.value = [selectedOptions[0].value as Numeric]
        d.visibility.parentChurchPicker = false
      },
      confirmFoundedAtPicker: ({ selectedValues }: { selectedValues: any }) => {
        d.form.founded_at = selectedValues.join("-")
        foundedAt.value = selectedValues
        d.visibility.foundedAtPicker = false
        console.log("Selected Value ", selectedValues)
      },
      confirmDenominationPicker: ({
        selectedOptions,
      }: {
        selectedOptions: FormattedOption[]
      }) => {
        d.form.denomination_id = selectedOptions[0].value as number
        denominationFieldValue.value = selectedOptions[0].text
        denominationID.value = [selectedOptions[0].value as Numeric]
        d.visibility.denominationPicker = false
      },
      handleLocationConfirm: () => {
        d.visibility.showMaps = false
      },
      handleOpenMaps: () => {
        d.visibility.showMaps = true
      },
      confirmPrayerPromptPicker: ({
        selectedOptions,
      }: {
        selectedOptions: FormattedOption[]
      }) => {
        d.prayer_prompt_id = selectedOptions[0].value as number
        prayerPromptFieldValue.value = selectedOptions[0].text
        prayerPromptID.value = [selectedOptions[0].value as Numeric]
        d.form.current_prayers = selectedOptions[0].text
        d.visibility.prayerPromptPicker = false
      },
      memberCountByPeopleGroup: async (value: boolean) => {
        if (value && d.peopleGroupList.length === 0) {
          d.peopleGroupList = await consume.peopleGroups.browse({
            all: true,
          })
        }
        if (!value) {
          d.form.member_count_list_by_people_group = []
        }

        console.log(
          "Value From Switch",
          d.form.member_count_list_by_people_group
        )
      },
    },
    emits: {
      // handleLocationSelected: (location: { lat: string; lng: string }) => {
      //    d.form.location_latitude = location.lat
      //     d.form.location_longitude = location.lng
      //  console.log("location from parent", d.form.location_latitude, d.form.location_longitude)
      //   console.log("location from child", location)
      //  }
      handleLocationSelected: (
        location: { lat: string; lng: string },
        place: any
      ) => {
        d.form.location_latitude = location.lat
        d.form.location_longitude = location.lng
        d.form.google_location_data = JSON.stringify(place)
        if (place.adminLevels) {
          d.form.province_name = place.adminLevels.administrative_area_level_1
          d.form.district_name = place.adminLevels.administrative_area_level_2
        }
        console.log(
          "location from parent",
          d.form.location_latitude,
          d.form.location_longitude,
          d.form.google_location_data
        )
        console.log("location from child", location)
      },
      updateMemberCountByPeopleGroup: (memberCountList: any) => {
        const filteredList = memberCountList.filter(
          (item: any) => item.amount != 0
        )
        d.form.member_count_list_by_people_group = filteredList
      },
    },
  },
}

onMounted(async () => {
  if (churchId) {
    const bc = {
      where: JSON.stringify([
        {
          key: "id",
          value: churchId,
        },
      ]),
      with: `["churchPlanters", "churchMembers"]`,
    } as BrowseCondition
    const res = await consume.churches.browse(bc)

    if (res.data && res.data.length > 0) {
      d.form = res.data[0]
      d.form.church_planters = []
      if (res.data[0].church_members && res.data[0].church_members.length > 0) {
        d.form.member_count_list_by_people_group = res.data[0].church_members
      }

      if (d.form.member_count_by_people_group) {
        d.peopleGroupList = await consume.peopleGroups.browse({
          all: true,
        })
      }

      helpers.setFromOptions({
        options: d.options.communities,
        selectedValue: d.form.community_id,
        textField: communityFieldValue,
        idField: communityID,
      })
      if (d.form.parent_church_id) {
        helpers.setFromOptions({
          options: d.options.parentChurches,
          selectedValue: d.form.parent_church_id,
          textField: parentChurchFieldValue,
          idField: parentChurchID,
        })
      }
      if (d.form.denomination_id) {
        helpers.setFromOptions({
          options: d.options.denominations,
          selectedValue: d.form.denomination_id,
          textField: denominationFieldValue,
          idField: denominationID,
        })
      }
    }
  }
})

const prayerPromptList = computed(() => {
  return d.options.prayerPrompts.map((pp: any) => ({
    text: pp.prompt_text,
    value: pp.id,
  }))
})

const onSubmit = async () => {
  // if (!d.form.church_planters.includes(auth.authUser.id) && d.form.church_planters.length === 0 ) {
  // if ( d.form.church_planters.length === 0 ) {
  //   d.form.church_planters.push(auth.authUser.id)
  // }
  if (
    !Array.isArray(d.form.church_planters) ||
    d.form.church_planters.length === 0
  ) {
    d.form.church_planters = [auth.authUser?.id]
  }
  d.form.assigned_to = auth.authUser?.id
  let response
  if (churchId) {
    const editChurchConsume = await useConsumeApi(RoutePaths.CHURCHES, churchId)
    response = await editChurchConsume.save(d.form)
  } else {
    response = await consume.churches.save(d.form)
  }
  if (response) {
    router.back()
  }
}

m.consume.defaultCommunitiesForCommunityOption()
m.consume.defaultChurchesForChurchOption()
m.consume.defaultDenominationsForDenominationOption()
m.consume.defaultChurchPlanters()
m.consume.defaultPrayerPrompts()
</script>

<style scoped>
:global(.van-dialog.dark-theme .van-dialog__footer .van-dialog__confirm) {
  background-color: #0a233d !important;
}

:global(.van-dialog.dark-theme .van-dialog__footer .van-dialog__cancel) {
  background-color: #0a233d !important;
}

:global(.van-dialog.light-theme .van-dialog__footer .van-dialog__confirm) {
  background-color: #fff !important;
}

:global(.van-dialog.light-theme .van-dialog__footer .van-dialog__cancel) {
  background-color: #fff !important;
}
</style>
