<template>
  <div>
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

        <!-- Name -->
        <VanField
          v-model="d.form.name"
          :label="h.translate('name')"
          :placeholder="h.translate('please_input')"
          :rules="[
            { required: true, message: h.translate('name_is_required') },
          ]"
          required
        />
        <!-- e.o Name -->
      </VanCellGroup>

      <VanCellGroup :title="h.translate('location')">
        <!-- LONGITUDE -->
        <VanField
          v-model="d.form.location_longitude"
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
          v-model="d.form.location_latitude"
          :label="h.translate('latitude')"
          :placeholder="h.translate('please_input')"
          :rules="[
            { required: true, message: h.translate('latitude_is_required') },
          ]"
          required
        />
        <!-- e.o LATITUDE -->
        <van-dialog
          v-model:show="showMaps"
          :title="h.translate('select_location')"
          :class="themeStore.darkMode ? 'dark-theme' : 'light-theme'"
          :show-cancel-button="true"
          width="90%"
          @confirm="handleLocationConfirm"
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
            @click="handleOpenMaps"
            >{{ h.translate("select_location") }}</VanButton
          >
        </div>
      </VanCellGroup>

      <!-- COMMUNITY CHECKLISTS -->
      <VanCellGroup :title="h.translate('community_checklist')">
        <VanField
          name="checkboxGroup"
          :label="h.translate('community_checklist')"
        >
          <template #input>
            <VanCheckboxGroup
              v-model="d.form.checklists"
              direction="vertical"
            >
              <VanCheckbox
                v-for="checklist in communicationChecklist"
                :key="checklist.id"
                :name="checklist.id"
                shape="square"
                style="margin-bottom: 5px"
              >
                {{ checklist.name }}
              </VanCheckbox>
            </VanCheckboxGroup>
          </template>
        </VanField>
      </VanCellGroup>
      <!-- e.o COMMUNITY CHECKLISTS -->

      <!-- PERSON OF PEACE -->
      <VanCellGroup :title="h.translate('person_of_peace')">
        <FormPartialsCommunityPeacePerson
          :peace-persons="d.form.peace_persons"
          @added="m.handle.emits.communityPeacePersonAdded"
          @updated="m.handle.emits.communityPeacePersonUpdated"
          @deleted="m.handle.emits.communityPeacePersonDeleted"
        />
      </VanCellGroup>
      <!-- e.o PERSON OF PEACE  -->

      <!-- COMMITTEES -->
      <VanCellGroup :title="h.translate('committees')">
        <FormPartialsCommunityCommittees
          :committees="d.form.committees"
          @added="m.handle.emits.communityCommitteeAdded"
          @updated="m.handle.emits.communityCommitteeUpdated"
          @deleted="m.handle.emits.communityCommitteeDeleted"
        />
      </VanCellGroup>
      <!-- e.o COMMITTEES -->

      <!-- COMMUNITY NEEDS -->
      <VanCellGroup>
        <template #title>
          <div style="display: flex; align-items: center">
            <VanCheckbox
              v-model="d.form.conducted_survey_of_community_needs"
              style="margin-right: 8px"
              shape="square"
            />
            <span>{{
              h.translate("conducted_survey_of_community_needs")
            }}</span>
          </div>
        </template>
        <VanField
          v-model="d.form.community_needs_1"
          :label="h.translate('community_needs') + ' 1'"
          :placeholder="h.translate('please_input')"
          :disabled="!d.form.conducted_survey_of_community_needs"
        />
        <VanField
          v-model="d.form.community_needs_2"
          :label="h.translate('community_needs') + ' 2'"
          :placeholder="h.translate('please_input')"
          :disabled="!d.form.conducted_survey_of_community_needs"
        />
        <VanField
          v-model="d.form.community_needs_3"
          :label="h.translate('community_needs') + ' 3'"
          :placeholder="h.translate('please_input')"
          :disabled="!d.form.conducted_survey_of_community_needs"
        />
        <VanField
          v-model="d.form.community_needs_4"
          :label="h.translate('community_needs') + ' 4'"
          :placeholder="h.translate('please_input')"
          :disabled="!d.form.conducted_survey_of_community_needs"
        />
        <VanField
          v-model="d.form.community_needs_5"
          :label="h.translate('community_needs') + ' 5'"
          :placeholder="h.translate('please_input')"
          :disabled="!d.form.conducted_survey_of_community_needs"
        />
      </VanCellGroup>

      <!-- e.o COMMUNITY NEEDS -->

      <!-- CHURCHES -->
      <VanCellGroup
        :title="h.translate('churches') + ': ' + d.form.churches.length"
      >
        <div style="height: 200px; overflow: auto">
          <VanList>
            <VanCell
              v-for="church in d.form.churches"
              :key="church.id"
              :title="church.name"
            />
          </VanList>
        </div>
      </VanCellGroup>
      <!-- e.o CHURCHES -->

      <!-- CHURCH PLANTERS -->
      <VanCellGroup
        :title="
          h.translate('church_planters') + ': ' + d.form.churchPlanters.length
        "
      >
        <VanList>
          <VanCell
            v-for="church in d.form.churchPlanters"
            :key="church.id"
            :title="church.name"
          />
        </VanList>
      </VanCellGroup>
      <!-- e.o CHURCH PLANTERS -->

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
import { useAuthStore } from "~/stores/useAuthStore"
import { RoutePaths, type BrowseCondition } from "../../types/index.d"
import type {
  ChurchFormModel,
  CommunityChecklistFormModel,
  CommunityCommittee,
  CommunityPeacePersonFormModel,
} from "../../types/models"
import { useThemeStore } from "~/stores/useTheme"

const route = useRoute()
const router = useRouter()
const themeStore = useThemeStore()
const communityID = route.query.id ? Number(route.query.id) : undefined
const communicationChecklist = ref<CommunityChecklistFormModel[]>([])
const showMaps = ref(false)
const h = useHelpers()
const auth = useAuthStore()

const d = reactive({
  form: {
    is_active: true,
    name: "",
    location_longitude: "",
    location_latitude: "",
    google_location_data: "",
    province_name: "",
    district_name: "",
    conducted_survey_of_community_needs: false,
    checklists: [],
    community_needs_1: "",
    community_needs_2: "",
    community_needs_3: "",
    community_needs_4: "",
    community_needs_5: "",
    created_by: 0,
    churches: [] as ChurchFormModel[],
    churchPlanters: [] as any,
    peace_persons: [] as CommunityPeacePersonFormModel[],
    committees: [] as CommunityCommittee[],
  },
})

const consume = {
  communities: await useConsumeApi(RoutePaths.COMMUNITIES),
  communityChecklists: await useConsumeApi(RoutePaths.COMMUNITY_CHECKLISTS),
  churches: await useConsumeApi(RoutePaths.CHURCHES),
}

const m = {
  handle: {
    emits: {
      communityPeacePersonAdded: (pp: CommunityPeacePersonFormModel) => {
        if (!d.form.peace_persons) d.form.peace_persons = []
        d.form.peace_persons.push(pp)
      },
      communityPeacePersonUpdated: (pp: CommunityPeacePersonFormModel) => {
        const index = d.form.peace_persons.findIndex(
          (p: CommunityPeacePersonFormModel) => p.name === pp.originalName
        )

        if (index !== -1) {
          d.form.peace_persons[index] = {
            ...d.form.peace_persons[index],
            ...pp,
          }
        }
      },
      communityPeacePersonDeleted: (pp: CommunityPeacePersonFormModel) => {
        const index = d.form.peace_persons.findIndex(
          (p: CommunityPeacePersonFormModel) => p.name === pp.name
        )

        if (index !== -1) {
          d.form.peace_persons.splice(index, 1)
        }
      },

      communityCommitteeAdded: (cc: CommunityCommittee) => {
        if (!d.form.committees) d.form.committees = []
        d.form.committees.push(cc)
      },
      communityCommitteeUpdated: (pp: CommunityCommittee) => {
        const index = d.form.committees.findIndex(
          (p: CommunityCommittee) => p.name === pp.originalName
        )

        if (index !== -1) {
          d.form.committees[index] = {
            ...d.form.committees[index],
            ...pp,
          }
        }
      },
      communityCommitteeDeleted: (pp: CommunityCommittee) => {
        const index = d.form.committees.findIndex(
          (p: CommunityCommittee) => p.name === pp.name
        )

        if (index !== -1) {
          d.form.committees.splice(index, 1)
        }
      },
      handleLocationSelected: (
        location: { lat: string; lng: string },
        place: any
      ) => {
        d.form.location_latitude = location.lat
        d.form.location_longitude = location.lng
        d.form.google_location_data = JSON.stringify(place)
        console.log(
          "location from parent",
          d.form.location_latitude,
          d.form.location_longitude
        )
        if (place.adminLevels) {
          d.form.province_name = place.adminLevels.administrative_area_level_1
          d.form.district_name = place.adminLevels.administrative_area_level_2
        }
        console.log("location from child", location)
      },
    },
  },
}

onMounted(async () => {
  if (communityID) {
    const bc = {
      where: JSON.stringify([
        {
          key: "id",
          value: communityID,
        },
      ]),
      with: `["peacePersons", "committees", "checklists", "churches", "churches.churchPlanters"]`,
    } as BrowseCondition
    const res = await consume.communities.browse(bc)
    if (res.data.length > 0) {
      d.form = res.data[0]
      d.form.checklists = res.data[0].checklists.map((c: any) => c.id)
    }
  }
  communicationChecklist.value = (await consume.communityChecklists.browse({
    all: true,
  })) as CommunityChecklistFormModel[]
})

const handleOpenMaps = () => {
  showMaps.value = true
}

const handleLocationConfirm = () => {
  showMaps.value = false
}

const onSubmit = async () => {
  if (auth.authUser?.id) {
    d.form.created_by = auth.authUser.id
  }
  let response
  if (communityID) {
    const editChurchConsume = await useConsumeApi(
      RoutePaths.COMMUNITIES,
      communityID
    )
    response = await editChurchConsume.save(d.form)
  } else {
    response = await consume.communities.save(d.form)
  }
  if (response) {
    router.back()
  }
}
</script>

<style scoped>
.dark-theme ::v-deep(.van-dialog__confirm) {
  background-color: #0a233d !important;
}

.light-theme ::v-deep(.van-dialog__confirm) {
  background-color: #fff !important;
}

.dark-theme ::v-deep(.van-dialog__cancel) {
  background-color: #0a233d !important;
}

.light-theme ::v-deep(.van-dialog__cancel) {
  background-color: #fff !important;
}
</style>
