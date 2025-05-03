<template>
  <div class="church">
    <VanForm @submit="onSubmit">
      <VanCellGroup>
        <!-- IS ACTIVE -->
        <VanField name="isActive" label="isActive">
          <template #input>
            <VanSwitch v-model="d.form.is_active" />
          </template>
        </VanField>
        <!-- e.o IS ACTIVE -->

        <!-- COMMUNITY -->
        <VanField
v-model="communityFieldValue" readonly label="Community" placeholder="Select a community"
          :rules="[{ required: true, message: 'Community is required' }]" required
          @click="d.visibility.communityPicker = true" />
        <VanPopup v-model:show="d.visibility.communityPicker" destroy-on-close round position="bottom">
          <VanPicker
:model-value="communityID" :columns="d.options.communities"
            @cancel="d.visibility.communityPicker = false" @confirm="m.handle.click.confirmCommunityPicker" />
        </VanPopup>
        <!-- e.o COMMUNITY -->

        <!-- CHURCH PLANTERS -->
        <VanField label="Church Planters" :model-value="auth.authUser.name" readonly />
        <!-- e.o CHURCH PLANTERS -->

        <!-- CHURCH NAME -->
        <VanField
v-model="d.form.name" label="Church Name" placeholder="Enter church name" required
          :rules="[{ required: true, message: 'Church name is required' }]" />
        <!-- e.o CHURCH NAME -->

        <!-- CHURCH DESCRIPTION -->
        <VanField v-model="d.form.description" label="Church Description" placeholder="Enter church description" />
        <!-- e.o CHURCH DESCRIPTION -->

        <!-- PARENT CHURCH -->
        <VanField
v-model="parentChurchFieldValue" readonly label="Parent Church" placeholder="Select a parent church"
          @click="d.visibility.parentChurchPicker = true" />
        <VanPopup v-model:show="d.visibility.parentChurchPicker" destroy-on-close round position="bottom">
          <VanPicker
:model-value="parentChurchID" :columns="d.options.parentChurches"
            @cancel="d.visibility.parentChurchPicker = false" @confirm="m.handle.click.confirmParentChurchPicker" />
        </VanPopup>
        <!-- e.o PARENT CHURCH -->

        <!-- CHURCH WEBSITE -->
        <VanField v-model="d.form.website" label="Church Website" placeholder="Enter church website" />
        <!-- e.o CHURCH WEBSITE -->

        <!-- FOUNDED AT -->
        <VanField
v-model="d.form.founded_at" readonly label="Founded At" placeholder="Select a date"
          @click="d.visibility.foundedAtPicker = true" />
        <VanPopup v-model:show="d.visibility.foundedAtPicker" destroy-on-close round position="bottom">
          <VanDatePicker
:model-value="foundedAt" @cancel="d.visibility.foundedAtPicker = false"
            @confirm="m.handle.click.confirmFoundedAtPicker" />
        </VanPopup>
        <!-- e.o FOUNDED AT  -->

        <!-- DENOMINATION -->
        <VanField
v-model="denominationFieldValue" readonly label="Denomination"
          placeholder="Select a church denomination" @click="d.visibility.denominationPicker = true" />
        <VanPopup v-model:show="d.visibility.denominationPicker" destroy-on-close round position="bottom">
          <VanPicker
:model-value="denominationID" :columns="d.options.denominations"
            @cancel="d.visibility.denominationPicker = false" @confirm="m.handle.click.confirmDenominationPicker" />
        </VanPopup>
        <!-- e.o DENOMINATION` -->

        <!-- CHURCH PHONE NUMBER -->
        <VanField v-model="d.form.phone_number" label="Church phone number" placeholder="Enter Church Phone Number" />
        <!-- e.o CHURCH PHONE NUMBER -->

        <!-- IS VISITED -->
        <VanField name="isVisited" label="isVisited">
          <template #input>
            <VanSwitch v-model="d.form.is_visited" />
          </template>
        </VanField>
        <!-- e.o IS VISITED -->

        <!-- CHURCH MEMBER COUNT -->
        <VanField label="Church members count">
          <template #input>
            <VanStepper v-model="d.form.church_members_count" :min="0" :default-value="0" />
          </template>
        </VanField>
        <!-- e.o CHURCH MEMBER COUNT -->

        <!-- CONFESSION OF FAITH COUNT -->
        <VanField label="Confession of Faith Count">
          <template #input>
            <VanStepper v-model="d.form.confession_of_faith_count" :min="0" :default-value="0" />
          </template>
        </VanField>
        <!-- e.o CONFESSION OF FAITH COUNT -->

        <!-- BAPTIZED COUNT -->
        <VanField label="Baptized count">
          <template #input>
            <VanStepper v-model="d.form.baptism_count" :min="0" :default-value="0" />
          </template>
        </VanField>
        <!-- e.o BAPTIZED COUNT -->

        <!-- CURRENT PRAYERS -->
        <VanField v-model="d.form.current_prayers" label="Current prayers" placeholder="Please Input" />
        <!-- e.o CURRENT PRAYERS -->

      </VanCellGroup>

      <div style="margin: 16px; display: flex; gap: 16px;">
        <VanButton round block type="default" style="flex: 1;" @click="$router.back">
          Cancel
        </VanButton>
        <VanButton round block type="primary" style="flex: 1;" @click="onSubmit">
          Submit
        </VanButton>
      </div>

    </VanForm>
  </div>

</template>

<script lang="ts" setup>
import { VanCellGroup, VanForm } from '#components'
import type { Numeric } from 'vant/es/utils'
import { useAuthStore } from '~/stores/useAuthStore'
import { RoutePaths, type UserFormModel, type BrowseConditionAll, type ChurchFormModel, type BrowseCondition } from '~/types/index.d'

const helpers = useHelpers()
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const churchId = route.query.id ? Number(route.query.id) : undefined

const communityFieldValue = ref("")
const parentChurchFieldValue = ref("")
const denominationFieldValue = ref("")

const communityID = ref<Numeric[]>([])
const parentChurchID = ref<Numeric[]>([])
const foundedAt = ref<string[]>([])
const denominationID = ref<Numeric[]>([])
const churchPlanterList = ref<UserFormModel[]>([])

const d = reactive({
  visibility: {
    communityPicker: false,
    parentChurchPicker: false,
    foundedAtPicker: false,
    denominationPicker: false,
    churchPlanterDialog: false,
  },
  form: {
    is_active: true,
    church_planters: null,
    name: "",
    description: "",
    founded_at: null,
    phone_number: "",
    website: "",
    denomination_id: null,
    is_visited: false,
    church_members_count: undefined,
    confession_of_faith_count: undefined,
    baptism_count: undefined,
    community_id: null,
    parent_church_id: null,
    current_prayers: ""
  } as ChurchFormModel,
  options: {
    communities: [] as FormattedOption[],
    parentChurches: [] as FormattedOption[],
    denominations: [] as FormattedOption[],
  }
})

const consume = {
  communities: useConsumeApi(RoutePaths.COMMUNITIES),
  churches: useConsumeApi(RoutePaths.CHURCHES),
  denominations: useConsumeApi(RoutePaths.DENOMINATIONS),
  churchPlanter: useConsumeApi(RoutePaths.USERS)
}

const m = {
  consume: {
    defaultCommunitiesForCommunityOption: async () => {
      const communities = await consume.communities.list({
        labelOption: "name",
        limit: 20
      })
      d.options.communities = helpers.formatOptions(communities)
    },
    defaultChurchesForChurchOption: async () => {
      const churches = await consume.churches.list({
        labelOption: "name",
        limit: 20
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
    }
  },
  handle: {
    click: {
      confirmCommunityPicker: ({
        selectedOptions
      }: {
        selectedOptions: FormattedOption[]
      }) => {
        d.form.community_id = selectedOptions[0].value as number
        communityFieldValue.value = selectedOptions[0].text
        communityID.value = [selectedOptions[0].value as Numeric]
        d.visibility.communityPicker = false
      },
      confirmParentChurchPicker: ({
        selectedOptions
      }: {
        selectedOptions: FormattedOption[]
      }) => {
        d.form.parent_church_id = selectedOptions[0].value as number
        parentChurchFieldValue.value = selectedOptions[0].text
        parentChurchID.value = [selectedOptions[0].value as Numeric]
        d.visibility.parentChurchPicker = false
      },
      confirmFoundedAtPicker: ({
        selectedValues
      }: {
        selectedValues: any
      }) => {
        d.form.founded_at = selectedValues.join('-')
        foundedAt.value = selectedValues
        d.visibility.foundedAtPicker = false
        console.log("Selected Value ", selectedValues)
      },
      confirmDenominationPicker: ({
        selectedOptions
      }: {
        selectedOptions: FormattedOption[]
      }) => {
        d.form.denomination_id = selectedOptions[0].value as number
        denominationFieldValue.value = selectedOptions[0].text
        denominationID.value = [selectedOptions[0].value as Numeric]
        d.visibility.denominationPicker = false
      }
    }
  }
}

onMounted(async () => {
  if (churchId) {
    const bc = {
      where: JSON.stringify([{
        key: 'id',
        value: churchId,
      }]),
      with: `["churchPlanters"]`

    } as BrowseCondition
    const res = await consume.churches.browse(bc)

    if (res.data && res.data.length > 0) {
      d.form = res.data[0]
      d.form.church_planters = []

      helpers.setFromOptions({
        options: d.options.communities,
        selectedValue: d.form.community_id,
        textField: communityFieldValue,
        idField: communityID
      })
      if (d.form.parent_church_id) {
        helpers.setFromOptions({
          options: d.options.parentChurches,
          selectedValue: d.form.parent_church_id,
          textField: parentChurchFieldValue,
          idField: parentChurchID
        })
      }
      if (d.form.denomination_id) {
        helpers.setFromOptions({
          options: d.options.denominations,
          selectedValue: d.form.denomination_id,
          textField: denominationFieldValue,
          idField: denominationID
        })
      }

    }
  }
})

const onSubmit = async () => {

  // if (!d.form.church_planters.includes(auth.authUser.id) && d.form.church_planters.length === 0 ) {
  // if ( d.form.church_planters.length === 0 ) {
  //   d.form.church_planters.push(auth.authUser.id)
  // }
  if (!Array.isArray(d.form.church_planters) || d.form.church_planters.length === 0) {
    d.form.church_planters = [auth.authUser.id]
  }
  d.form.assigned_to = auth.authUser.id
  let response
  if (churchId) {
    const editChurchConsume = useConsumeApi(RoutePaths.CHURCHES, churchId)
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

</script>
