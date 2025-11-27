<template>
  <div>
    <VanCellGroup :title="h.translate('general_information')">
      <!-- NAME -->
      <VanField
        v-model="d.form.name"
        :label="h.translate('name')"
        :placeholder="h.translate('enter_name')"
        required
        :rules="[{ required: true, message: h.translate('name_is_required') }]"
      />
      <!-- e.o NAME -->

      <!-- e.o NICKNAME -->
      <!-- <VanField
        v-model="d.form.nickname"
        :label="h.translate('nickname')"
        :placeholder="h.translate('enter_nickname')"
      /> -->
      <!-- e.o NICKNAME -->

      <!-- e.o Note-->
      <VanField
        v-model="d.form.note"
        :label="h.translate('note')"
        :placeholder="h.translate('enter_note')"
      />
      <!-- e.o NICKNAME -->

      <!-- USER PROFILE -->
      <!-- <FormPartialsUserProfile
        :user-profile-id="d.form.user_profile_id"
        @update="m.handle.emits.updateUserProfile"
        @clear="m.handle.emits.clearUserProfile"
      /> -->
      <!-- e.o USER PROFILE -->

      <!-- GENDER -->
      <VanCellGroup>
        <template #title>
          <span>
            <span style="color: red">*</span> {{ h.translate("gender") }}
          </span>
        </template>
        <VanRadioGroup
          v-model="d.form.gender"
          required
          :rules="[
            {
              required: true,
              message: h.translate('the_gender_field_is_required'),
            },
          ]"
        >
          <VanCellGroup
            v-for="g in s.settings.options.genders"
            :key="g.value"
            inset
          >
            <VanCell
              :title="h.translate(h.toSnakeCase(g.text))"
              clickable
              @click="d.form.gender = g.value as GenderTypes"
            >
              <template #right-icon>
                <van-radio :name="g.value" />
              </template>
            </VanCell>
          </VanCellGroup>
        </VanRadioGroup>
      </VanCellGroup>
      <!-- e.o GENDER -->

      <!-- AGE GROUPS -->
      <VanField
        v-model="ageGroupFieldValue"
        readonly
        :label="h.translate('age_group')"
        :placeholder="h.translate('choose_age_group')"
        required
        :rules="[{ required: true, message: h.translate('age_is_required') }]"
        @click="d.visibility.ageGroupPicker = true"
      />
      <VanPopup
        v-model:show="d.visibility.ageGroupPicker"
        destroy-on-close
        round
        position="bottom"
      >
        <VanPicker
          :model-value="ageGroupID"
          :title="h.translate('title')"
          :columns="s.settings.options.ageGroups"
          @cancel="d.visibility.ageGroupPicker = false"
          @confirm="m.handle.click.confirmAgeGroupPicker"
        />
      </VanPopup>
      <!-- e.o AGE GROUPS -->

      <!-- PEOPLE GROUP -->
      <VanField
        v-model="peopleGroupFieldValue"
        readonly
        autosize
        :label="h.translate('people_group')"
        label-align="top"
        :placeholder="h.translate('choose_people_group')"
        @click="d.visibility.peopleGroupPicker = true"
      />
      <VanPopup
        v-model:show="d.visibility.peopleGroupPicker"
        destroy-on-close
        closeable
        round
        position="bottom"
        style="height: 400px"
        @cancel="d.visibility.peopleGroupPicker = false"
        @confirm="m.handle.click.confirmPeopleGroupPicker"
      >
        <VanCheckboxGroup
          v-model="peopleGroupID"
          @change="m.handle.click.checkbox"
        >
          <VanCell
            v-for="(item, index) in s.peopleGroup.options"
            :key="index"
          >
            <VanCheckbox :name="item.value">
              {{ item.text }}
            </VanCheckbox>
          </VanCell>
        </VanCheckboxGroup>
      </VanPopup>
      <!-- e.o PEOPLE GROUP -->

      <!-- FAITH STATUS -->
      <VanField
        v-model="faithStatusFieldValue"
        readonly
        :label="h.translate('position')"
        :placeholder="h.translate('choose_position')"
        @click="d.visibility.faithStatusPicker = true"
      />
      <VanPopup
        v-model:show="d.visibility.faithStatusPicker"
        destroy-on-close
        round
        position="bottom"
      >
        <VanPicker
          :model-value="faithStatusID"
          :title="h.translate('title')"
          :columns="s.settings.options.faith"
          @cancel="d.visibility.faithStatusPicker = false"
          @confirm="m.handle.click.confirmFaithStatusPicker"
        />
      </VanPopup>
      <!-- e.o FAITH STATUS -->
    </VanCellGroup>

    <!-- CONTACT PLATFORMS -->
    <VanCellGroup :title="h.translate('contact_platforms')">
      <VanCell
        v-for="cp in s.communicationPlatform.communicationPlatforms"
        :key="cp.id"
        :title="cp.name"
        is-link
        @click="m.handle.click.communicationPlatform(cp)"
      />
      <FormCommunicationPlatform
        :platform="d.currentCommunicationPlatform"
        :show="d.visibility.communicationPlatformActionSheet"
        :form="communicationForm ? (communicationForm as string[]) : []"
        :platform-values="d.form.contact_communication_platforms
          ? (d.form.contact_communication_platforms as any[])
          : []"
        @close="d.visibility.communicationPlatformActionSheet = false"
        @added="m.handle.click.confirmCommunicationPlatformPicker"
        @updated="m.handle.emits.updatedCommunicationPlatformPicker"
        @deleted="m.handle.emits.deletedCommunicationPlatformPicker"
      />
    </VanCellGroup>
    <!-- e.o CONTACT PLATFORMS -->

    <!-- FAITH MILESTONES -->
    <VanCellGroup :title="h.translate('faith_milestones')">
      <VanField
        v-model="faithMilestoneFieldValue"
        readonly
        autosize
        :label="h.translate('faith_milestones')"
        label-align="top"
        :placeholder="h.translate('choose_faith_milestones')"
        @click="d.visibility.faithMielstonePicker = true"
      />
      <VanPopup
        v-model:show="d.visibility.faithMielstonePicker"
        destroy-on-close
        closeable
        round
        position="bottom"
        style="height: 400px"
        @cancel="d.visibility.faithMielstonePicker = false"
        @confirm="m.handle.click.confirmFaithMilestonePicker"
      >
        <VanCheckboxGroup
          v-model="faithMilestoneID"
          style="margin-top: 40px"
          @change="m.handle.click.faithMilestoneCheckbox"
        >
          <VanCell
            v-for="(item, index) in s.faithMilestone.faithMilestones"
            :key="index"
          >
            <VanCheckbox :name="item.id">
              <div style="
                  display: flex;
                  align-items: center;
                  padding: 10px;
                  border: 1px solid rgba(200, 200, 200, 0.1);
                  border-radius: 4px;
                  margin-left: 10px;
                  margin-right: 10px;
                  width: calc(100vw - 100px);
                ">
                <VanImage
                  width="26"
                  height="26"
                  style="margin-right: 10px"
                  :src="config.public.rootURL + item.icon"
                />
                {{ item.name }}
              </div>
            </VanCheckbox>
          </VanCell>
        </VanCheckboxGroup>
      </VanPopup>
    </VanCellGroup>
    <!-- e.o FAITH MILESTONES -->

    <!-- BAPTISM -->

    <VanCellGroup :title="h.translate('baptism')">
      <!-- BAPTIZED BY SELECT -->
      <VanField :label="h.translate('baptized_by')">
        <template #input>
          <VanRadioGroup
            v-model="d.visibility.baptizedByRadio"
            direction="horizontal"
            @change="m.handle.click.baptizedBySelect"
          >
            <VanRadio
              style="margin-right: 10px"
              name="church_planter"
            >{{ h.translate("church_planter") }}</VanRadio>
            <VanRadio name="name">{{ h.translate("name") }}</VanRadio>
          </VanRadioGroup>
        </template>
      </VanField>
      <!-- e.o BAPTIZED BY SELECT -->

      <!-- BAPTIZED BY CONTACT -->
      <div v-if="d.visibility.baptizedByRadio === 'church_planter'">
        <VanField
          v-model="baptizedByFieldValue"
          readonly
          :label="h.translate('church_planter')"
          :placeholder="h.translate('choose_church_planter')"
          @click="d.visibility.baptizedByPicker = true"
        />

        <VanPopup
          v-model:show="d.visibility.baptizedByPicker"
          destroy-on-close
          round
          position="bottom"
        >
          <VanPicker
            :model-value="baptizedByID"
            :title="h.translate('baptized_by')"
            :columns="churchPlanterList"
            @cancel="d.visibility.baptizedByPicker = false"
            @confirm="m.handle.click.confirmBaptizedByPicker"
          />
        </VanPopup>
      </div>
      <!-- e.o BAPTIZED BY CONTACT -->

      <!-- BAPTIZED BY NAME -->
      <div v-if="d.visibility.baptizedByRadio === 'name'">
        <VanField
          v-model="d.form.baptized_by_name as string"
          :label="h.translate('name')"
          :placeholder="h.translate('enter_name')"
        />
      </div>
      <!-- e.o BAPTIZED BY NAME -->

      <!-- :model-value="baptizedByID"  -->
      <!-- BAPTISM DATE -->
      <VanField
        v-model="baptismDateFieldValue"
        readonly
        :label="h.translate('baptism_date')"
        :placeholder="h.translate('choose_baptism_date')"
        @click="d.visibility.baptismDatePicker = true"
      />

      <VanPopup
        v-model:show="d.visibility.baptismDatePicker"
        destroy-on-close
        round
        position="bottom"
      >
        <VanDatePicker
          title="BaptismDate"
          :model-value="baptizedDatePicker"
          :max-date="new Date(2030, 0, 1)"
          :columns-type="['day', 'month', 'year']"
          :formatter="m.helper.formatter.baptismDateFormat"
          @confirm="m.handle.click.confirmBaptizedDatePicker"
          @cancel="d.visibility.baptismDatePicker = false"
        />

        <!-- v-model="d.form.baptism_date"  -->
        <!-- :min-date="new Date(1800, 0, 1)" -->
      </VanPopup>
      <!-- </VanPopup> -->
      <!-- e.o BAPTISM DATE -->
    </VanCellGroup>
    <!-- e.o BAPTISM -->

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
  </div>
</template>

<script
  lang="ts"
  setup
>
  import type {
    ContactFormModel,
    CommunicationPlatformFormModel,
  } from "~/types/models"

  import { useSettingStore } from "~/stores/useSettingStore"
  import { usePeopleGroupStore } from "~/stores/usePeopleGroupStore"
  import { useCommunicationPlatformStore } from "~/stores/useCommunicationPlatformStore"
  import { useFaithMilestoneStore } from "~/stores/useFaithMilestoneStore"
  import { useContactStore } from "~/stores/useContactStore"

  import type { Numeric } from "vant/es/utils"
  import type { GenderTypes, AgeGroups } from "~/types"

  import { RoutePaths, type BrowseCondition } from "~/types/index.d"
  import { useConsumeApi } from "~/composables/useConsumeApi"
  import { useAuthStore } from "~/stores/useAuthStore"

  const consume = {
    contacts: await useConsumeApi(RoutePaths.CONTACTS),
    prayerPrompt: await useConsumeApi(RoutePaths.PRAYER_PROMPTS),
    users: await useConsumeApi(RoutePaths.USERS),
  }

  const s = {
    settings: useSettingStore(),
    peopleGroup: usePeopleGroupStore(),
    communicationPlatform: useCommunicationPlatformStore(),
    faithMilestone: useFaithMilestoneStore(),
    contact: useContactStore(),
  }

  const route = useRoute()
  const router = useRouter()
  const config = useRuntimeConfig()
  const h = useHelpers()
  const contactID = route.query.id ? Number(route.query.id) : undefined
  const helpers = useHelpers()
  const authStore = useAuthStore()
  const authUser = authStore.authUser
  const faithStatusFieldValue = ref("")
  const prayerPromptFieldValue = ref("")
  const ageGroupFieldValue = ref("")
  const peopleGroupFieldValue = ref("")
  const faithMilestoneFieldValue = ref("")
  const baptizedByFieldValue = ref("")
  const baptismDateFieldValue = ref("")

  const faithStatusID = ref<Numeric[]>([3])
  const prayerPromptID = ref<Numeric[]>([])
  const ageGroupID = ref<AgeGroups[]>([])
  const peopleGroupID = ref<Numeric[]>([])
  const faithMilestoneID = ref<Numeric[]>([])
  const baptizedByID = ref<Numeric[]>([])
  const baptizedDatePicker = ref<any[]>([])

  const faithMilestones = ref<number[]>([])
  const communicationForm = ref<string[]>([])

  const d = reactive({
    visibility: {
      contactPicker: false,
      faithStatusPicker: false,
      ageGroupPicker: false,
      peopleGroupPicker: false,
      communicationPlatformActionSheet: false,
      faithMielstonePicker: false,
      baptizedByPicker: false,
      baptismDatePicker: false,
      prayerPromptPicker: false,
      baptizedByRadio: "church_planter",
    },
    form: {
      name: "",
      is_active: true,
      position_id: null,
      gender: null,
      age: null,
      people_group: [] as number[],
      faith_milestones: [] as number[],
      contact_communication_platforms: [] as any[],
      baptized_by: null,
      baptized_by_name: "",
      baptism_date: null,
      assigned_to: null,
      current_prayers: "",
      note: "",
      user_profile_id: null,
    } as ContactFormModel,
    prayer_prompt_id: null as number | null,

    currentCommunicationPlatform: {
      name: "",
    } as CommunicationPlatformFormModel,

    churchPlanters: [],
    prayerPrompts: [],
  })

  type SelectedOptionsType = {
    text: string
    value: Numeric
  }

  const m = {
    handle: {
      click: {
        confirmFaithStatusPicker: ({
          selectedOptions,
        }: {
          selectedOptions: SelectedOptionsType[]
        }) => {
          d.form.position_id = selectedOptions[0].value as number
          faithStatusFieldValue.value = selectedOptions[0].text
          d.visibility.faithStatusPicker = false
        },

        confirmPrayerPromptPicker: ({
          selectedOptions,
        }: {
          selectedOptions: SelectedOptionsType[]
        }) => {
          d.prayer_prompt_id = selectedOptions[0].value as number
          prayerPromptFieldValue.value = selectedOptions[0].text
          prayerPromptID.value = [selectedOptions[0].value as Numeric]
          d.form.current_prayers = selectedOptions[0].text
          d.visibility.prayerPromptPicker = false
        },

        confirmAgeGroupPicker: ({
          selectedOptions,
        }: {
          selectedOptions: SelectedOptionsType[]
        }) => {
          d.form.age = selectedOptions[0].value as AgeGroups
          ageGroupFieldValue.value = selectedOptions[0].text
          d.visibility.ageGroupPicker = false
        },

        confirmPeopleGroupPicker: ({
          selectedOptions,
        }: {
          selectedOptions: SelectedOptionsType[]
        }) => {
          peopleGroupFieldValue.value = selectedOptions[0].text

          d.visibility.peopleGroupPicker = false
        },

        confirmFaithMilestonePicker: ({
          selectedOptions,
        }: {
          selectedOptions: SelectedOptionsType[]
        }) => {
          faithMilestoneFieldValue.value = selectedOptions[0].text
          d.form.faith_milestones = faithMilestoneID.value as number[]
          d.visibility.faithMielstonePicker = false
        },

        checkbox: () => {
          const options = s.peopleGroup.options as {
            text: string
            value: number
          }[]

          const matched = options
            .filter(function (pgo) {
              if ((peopleGroupID.value as number[]).includes(pgo.value)) {
                return true
              } else {
                return false
              }
            })
            .map((pgo: any) => {
              return pgo.text
            })

          peopleGroupFieldValue.value = matched.join(", ")
          if (!d.form.people_group) {
            d.form.people_group = []
          }
          d.form.people_group = peopleGroupID.value as number[]
        },

        faithMilestoneCheckbox: () => {
          const options = s.faithMilestone.options as {
            text: string
            value: number
          }[]

          const matched = options
            .filter(function (fmo) {
              if ((faithMilestoneID.value as number[]).includes(fmo.value)) {
                return true
              } else {
                return false
              }
            })
            .map((fmo: any) => {
              return fmo.text
            })
          // d.form.faith_milestones = faithMilestoneID.value as number[]
          faithMilestones.value = faithMilestoneID.value as number[]
          d.form.faith_milestones = faithMilestones.value

          faithMilestoneFieldValue.value = matched.join(", ")
        },

        communicationPlatform: (cp: any) => {
          d.visibility.communicationPlatformActionSheet = true
          d.currentCommunicationPlatform = cp
        },

        confirmCommunicationPlatformPicker: (asdf: any) => {
          communicationForm.value.push(asdf)
          if (!d.form.contact_communication_platforms) {
            d.form.contact_communication_platforms = []
          }
          d.form.contact_communication_platforms.push({
            communication_platform_id: d.currentCommunicationPlatform.id,
            value: asdf,
          })
        },

        confirmBaptizedByPicker: ({
          selectedOptions,
        }: {
          selectedOptions: SelectedOptionsType[]
        }) => {
          d.form.baptized_by = selectedOptions[0].value as number
          baptizedByFieldValue.value = selectedOptions[0].text
          d.visibility.baptizedByPicker = false
        },

        confirmBaptizedDatePicker: ({
          selectedOptions,
        }: {
          selectedOptions: SelectedOptionsType[]
        }) => {
          const day = selectedOptions[0]
          const month = selectedOptions[1]
          const year = selectedOptions[2]
          //      d.form.baptism_date = selectedOptions[0].value as string
          d.form.baptism_date = `${year.value}-${month.value}-${day.value}`

          baptismDateFieldValue.value = `${day.text} ${month.text} ${year.text}`
          baptizedDatePicker.value = [day.value, month.value, year.value]
          d.visibility.baptismDatePicker = false
        },
        baptizedBySelect: (e: any) => {
          console.log("Selected Baptized By", e)
        },
      },

      emits: {
        updatedCommunicationPlatformPicker: (e: any, editingValue: any) => {
          communicationForm.value = e
          if (!d.form.contact_communication_platforms) {
            d.form.contact_communication_platforms = []
          }
          const index = d.form.contact_communication_platforms.findIndex(
            (p) => p.value === editingValue.originalValue
          )
          if (index !== -1) {
            d.form.contact_communication_platforms[index].value =
              editingValue.value
          }
        },
        deletedCommunicationPlatformPicker: (editingValue: any) => {
          if (!d.form.contact_communication_platforms) {
            d.form.contact_communication_platforms = []
          }
          const index = d.form.contact_communication_platforms.findIndex(
            (p) => p.value === editingValue.originalValue
          )
          if (index !== -1) {
            d.form.contact_communication_platforms.splice(index, 1)
          }
        },
        updateUserProfile: (value: number) => {
          d.form.user_profile_id = value
        },
        clearUserProfile: () => {
          d.form.user_profile_id = null
        },
      },
    },

    consume: {
      churchPlanters: async () => {
        d.churchPlanters = await consume.users.browse({
          all: true,
          whereIn: {
            key: "user_role_id",
            value: [4],
          },
        })
      },

      prayerPrompt: async () => {
        d.prayerPrompts = await consume.prayerPrompt.browse(
          {
            all: true,
          },
          false
        )
      },
    },

    helper: {
      formatter: {
        baptismDateFormat: (type: any, options: any) => {
          if (type === "month") {
            switch (options.text) {
              case "01":
                options.text = "January"
                break
              case "02":
                options.text = "February"
                break
              case "03":
                options.text = "March"
                break
              case "04":
                options.text = "April"
                break
              case "05":
                options.text = "May"
                break
              case "06":
                options.text = "June"
                break
              case "07":
                options.text = "July"
                break
              case "08":
                options.text = "August"
                break
              case "09":
                options.text = "September"
                break
              case "10":
                options.text = "October"
                break
              case "11":
                options.text = "November"
                break
              case "12":
                options.text = "December"
                break
            }
          }

          return options
        },
      },
    },
  }

  onMounted(async () => {
    await s.communicationPlatform.loadFromSecureStorage()
    await s.contact.loadFromSecureStorage()
    await s.faithMilestone.loadFromSecureStorage()
    await s.peopleGroup.loadFromSecureStorage()
    await s.settings.loadFromSecureStorage()
    await m.consume.churchPlanters()

    if (contactID) {
      const bc = {
        where: JSON.stringify([
          {
            key: "id",
            value: contactID,
          },
        ]),
        with: `["faithMilestones", "status", "position", "assignedTo", "coachedBy", "peopleGroup", "baptizedBy", "contactCommunicationPlatforms"]`,
      } as BrowseCondition

      const res = await consume.contacts.browse(bc)
      console.log("Res Data", res.data)
      if (res.data && res.data.length > 0) {
        d.form = res.data[0]
        if (!d.form.baptized_by && d.form.baptized_by_name) {
          d.visibility.baptizedByRadio = "name"
        }
        if (d.form.position_id) {
          helpers.setFromOptions({
            options: s.settings.options.faith,
            selectedValue: d.form.position_id,
            textField: faithStatusFieldValue,
            idField: faithStatusID,
          })
        }
        if (d.form.age) {
          ageGroupFieldValue.value = d.form.age
        }
        if (d.form.faith_milestones && d.form.faith_milestones.length > 0) {
          const newVal = d.form.faith_milestones
            .map((item: any) => item.name)
            .join(", ")
          d.form.faith_milestones = d.form.faith_milestones.map(
            (item: any) => item.id
          )
          faithMilestoneFieldValue.value = newVal
          faithMilestoneID.value = d.form.faith_milestones
        }
        if (d.form.people_group && d.form.people_group.length > 0) {
          const newVal = d.form.people_group
            .map((item: any) => item.name)
            .join(", ")
          d.form.people_group = d.form.people_group.map((item: any) => item.id)
          peopleGroupFieldValue.value = newVal
          peopleGroupID.value = d.form.people_group
        }
        if (res.data && res.data[0].baptized_by) {
          const baptizedBy = res.data[0].baptized_by
          baptizedByFieldValue.value = baptizedBy.name
          baptizedByID.value = baptizedBy.id
          d.form.baptized_by = baptizedBy.id
          if (d.form.baptized_by) {
            helpers.setFromOptions({
              options: churchPlanterList.value,
              selectedValue: d.form.baptized_by,
              textField: baptizedByFieldValue,
              idField: baptizedByID,
            })
          }
        }
        if (d.form && d.form.baptism_date) {
          const date = new Date(d.form.baptism_date)
          const displayDate = new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }).format(date)

          const dbDate = date.toISOString().split("T")[0]
          baptismDateFieldValue.value = displayDate
          d.form.baptism_date = dbDate
          baptizedDatePicker.value = [
            date.getDate(),
            date.getMonth() + 1,
            date.getFullYear(),
          ]
        }
        if (
          d.form.contact_communication_platforms &&
          d.form.contact_communication_platforms?.length > 0
        ) {
          console.log(
            "d.form.contact_communication_platforms",
            d.form.contact_communication_platforms
          )

          communicationForm.value = d.form.contact_communication_platforms.map(
            (item: any) => item.value
          )
          d.form.contact_communication_platforms =
            d.form.contact_communication_platforms.map((item) => ({
              communication_platform_id: item.communication_platform_id,
              value: item.value,
            }))
        }
      }
    }
  })

  const churchPlanterList = computed(() => {
    return d.churchPlanters.map((cp: any) => ({
      text: cp.name ?? "",
      value: cp.id,
    }))
  })

  const prayerPromptList = computed(() => {
    return d.prayerPrompts.map((pg: any) => ({
      //    text: pg.prompt_text,
      text:
        pg.prompt_text.length > 50
          ? pg.prompt_text.slice(0, 50) + "..."
          : pg.prompt_text,
      value: pg.id,
    }))
  })

  const defaultOption = s.settings.options.faith.find((o) => o.value === 8)
  if (defaultOption) {
    faithStatusFieldValue.value = defaultOption.text
    d.form.position_id = 8
  }

  m.consume.prayerPrompt()

  const onSubmit = async () => {
    d.form.assigned_to = authUser?.id
    let response
    if (contactID) {
      const editChurchConsume = await useConsumeApi(
        RoutePaths.CONTACTS,
        contactID
      )
      response = await editChurchConsume.save(d.form)
    } else {
      response = await consume.contacts.save(d.form)
    }
    if (response) {
      router.back()
    }
  }
</script>

<style scoped>
  ::v-deep(.van-ellipsis) {
    white-space: pre-line !important;
    text-align: center;
    line-height: 1.4;
  }
</style>