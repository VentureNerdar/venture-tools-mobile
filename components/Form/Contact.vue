<template>
  <div>
    <VanCellGroup title="Statuses">
      <!-- CONTACT STATUS -->
      <VanField
        v-model="contactStatusFieldValue"
        readonly
        label="Contact"
        placeholder="Choose Contact Status"
        @click="d.visibility.contactPicker = true"
      />
      <VanPopup
        v-model:show="d.visibility.contactPicker"
        destroy-on-close
        round
        position="bottom"
      >
        <VanPicker
          :model-value="contactStatusID"
          title="Title"
          :columns="s.settings.options.contact"
          @cancel="d.visibility.contactPicker = false"
          @confirm="m.handle.click.confirmContactStatusPicker"
        />
      </VanPopup>
      <!-- e.o CONTACT STSATUS -->

      <!-- FAITH STATUS -->
      <VanField
        v-model="faithStatusFieldValue"
        readonly
        label="Faith"
        placeholder="Choose Faith Status"
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
          title="Title"
          :columns="s.settings.options.faith"
          @cancel="d.visibility.faithStatusPicker = false"
          @confirm="m.handle.click.confirmFaithStatusPicker"
        />
      </VanPopup>
      <!-- e.o FAITH STATUS -->
    </VanCellGroup>

    <VanCellGroup title="General Information">
      <!-- NAME -->
      <VanField
        v-model="d.form.name"
        label="Name"
        placeholder="Enter Name"
        required
      />
      <!-- e.o NAME -->

      <!-- e.o NICKNAME -->
      <VanField
        v-model="d.form.nickname"
        label="Nickname"
        placeholder="Enter Nickname"
      />
      <!-- e.o NICKNAME -->

      <!-- GENDER -->
      <VanCellGroup title="Gender">
        <VanRadioGroup v-model="d.form.gender">
          <VanCellGroup
            v-for="g in s.settings.options.genders"
            :key="g.value"
            inset
          >
            <VanCell
              :title="g.text"
              clickable
              @click="d.form.gender = g.value as GenderTypes"
            >
              <template #right-icon>
                <van-radio :name="g.value" />
              </template>
            </VanCell>
          </VanCellGroup>
        </VanRadioGroup>

        <!-- </VanField> -->
      </VanCellGroup>
      <!-- e.o GENDER -->

      <!-- AGE GROUPS -->
      <VanField
        v-model="ageGroupFieldValue"
        readonly
        label="Age Group"
        placeholder="Choose Age"
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
          title="Title"
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
        label="People Group"
        label-align="top"
        placeholder="Choose People Group"
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
          <VanCell v-for="(item, index) in s.peopleGroup.options" :key="index">
            <VanCheckbox :name="item.value">
              {{ item.text }}
            </VanCheckbox>
          </VanCell>
        </VanCheckboxGroup>
      </VanPopup>
      <!-- e.o PEOPLE GROUP -->
    </VanCellGroup>

    <!-- CONTACT PLAGFORMS -->
    <VanCellGroup title="Contact Platforms">
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
        :form="
          d.form.contact_communication_platforms
            ? (d.form.contact_communication_platforms as number[])
            : []
        "
        @close="d.visibility.communicationPlatformActionSheet = false"
        @added="m.handle.click.confirmCommunicationPlatformPicker"
        @updated="m.handle.emits.updatedCommunicationPlatformPicker"
      />
    </VanCellGroup>
    <!-- e.o CONTACT PLATFORMS -->

    <!-- FAITH MILESTONES -->
    <VanCellGroup title="Faith Milestones">
      <VanField
        v-model="faithMilestoneFieldValue"
        readonly
        autosize
        label="Faith Milestones"
        label-align="top"
        placeholder="Choose Faith Milestones"
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
              <div
                style="
                  display: flex;
                  align-items: center;
                  padding: 10px;
                  border: 1px solid rgba(200, 200, 200, 0.1);
                  border-radius: 4px;
                  margin-left: 10px;
                  margin-right: 10px;
                  width: calc(100vw - 100px);
                "
              >
                <VanImage
                  width="26"
                  height="26"
                  style="margin-right: 10px"
                  :src="useRuntimeConfig().public.rootURL + item.icon"
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
    <VanCellGroup title="Baptism">
      <!-- BAPTIZED BY -->
      <VanField
        v-model="baptizedByFieldValue"
        readonly
        label="Baptized By"
        placeholder="Choose Baptized By"
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
          title="Baptized By"
          :columns="contactList"
          @cancel="d.visibility.baptizedByPicker = false"
          @confirm="m.handle.click.confirmBaptizedByPicker"
        />
      </VanPopup>
      <!-- e.o BAPTIZED BY -->

      <!-- BAPTISM DATE -->
      <VanField
        v-model="baptizedByFieldValue"
        readonly
        label="Baptism Date"
        placeholder="Choose Baptism Date"
        @click="d.visibility.baptismDatePicker = true"
      />

      <VanPopup
        v-model:show="d.visibility.baptismDatePicker"
        destroy-on-close
        round
        position="bottom"
      >
        <VanDatePicker
          v-mode="d.form.baptism_date"
          title="BaptismDate"
          :max-date="new Date(2030, 0, 1)"
          :columns-type="['day', 'month', 'year']"
          :formatter="m.helper.formatter.baptismDateFormat"
        />
        <!-- v-model="d.form.baptism_date"  -->
        <!-- :min-date="new Date(1800, 0, 1)" -->
      </VanPopup>
      <!-- </VanPopup> -->
      <!-- e.o BAPTISM DATE -->
    </VanCellGroup>
    <!-- e.o BAPTISM -->
  </div>
</template>

<script lang="ts" setup>
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

import { RoutePaths } from "~/types/index.d"
import { useConsumeApi } from "~/composables/useConsumeApi"

const consume = {
  contacts: useConsumeApi(RoutePaths.CONTACTS),
}

const s = {
  settings: useSettingStore(),
  peopleGroup: usePeopleGroupStore(),
  communicationPlatform: useCommunicationPlatformStore(),
  faithMilestone: useFaithMilestoneStore(),
  contact: useContactStore(),
}

const contactStatusFieldValue = ref("")
const faithStatusFieldValue = ref("")
const ageGroupFieldValue = ref("")
const peopleGroupFieldValue = ref("")
const faithMilestoneFieldValue = ref("")
const baptizedByFieldValue = ref("")
const baptismDateFieldValue = ref("")

const contactStatusID = ref<Numeric[]>([])
const faithStatusID = ref<Numeric[]>([])
const ageGroupID = ref<AgeGroups[]>([])
const peopleGroupID = ref([])
const faithMilestoneID = ref([])
const baptizedByID = ref<Numeric[]>([])

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
  },
  form: {
    name: "",
    contact_status_id: null,
    faith_status_id: null,
    gender: null,
    age: null,
    people_group: [],
    contact_communication_platforms: [] as string[],
    baptized_by: null,
    baptism_date: null,
  } as ContactFormModel,

  currentCommunicationPlatform: {
    name: "",
  } as CommunicationPlatformFormModel,

  contacts: [],
})

type SelectedOptionsType = {
  text: string
  value: Numeric
}

const m = {
  handle: {
    click: {
      confirmContactStatusPicker: ({
        selectedOptions,
      }: {
        selectedOptions: SelectedOptionsType[]
      }) => {
        d.form.contact_status_id = selectedOptions[0].value as number
        contactStatusFieldValue.value = selectedOptions[0].text
        d.visibility.contactPicker = false
      },

      confirmFaithStatusPicker: ({
        selectedOptions,
      }: {
        selectedOptions: SelectedOptionsType[]
      }) => {
        d.form.faith_status_id = selectedOptions[0].value as number
        faithStatusFieldValue.value = selectedOptions[0].text
        d.visibility.faithStatusPicker = false
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
        console.log(selectedOptions[0])
        faithMilestoneFieldValue.value = selectedOptions[0].text
        d.visibility.faithMielstonePicker = false
      },

      checkbox: () => {
        console.log(peopleGroupID.value)

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

        console.log("Matched Options:", matched)
      },

      faithMilestoneCheckbox: () => {
        console.log(faithMilestoneID.value)

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

        faithMilestoneFieldValue.value = matched.join(", ")
        console.log("Matched Options:", matched)
      },

      communicationPlatform: (cp: any) => {
        d.visibility.communicationPlatformActionSheet = true
        d.currentCommunicationPlatform = cp
        console.log("Clicked Communication Platform:", cp)
      },

      confirmCommunicationPlatformPicker: (asdf: any) => {
        d.form.contact_communication_platforms ||= [] as string[]
        d.form.contact_communication_platforms.push(asdf)
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
    },

    emits: {
      updatedCommunicationPlatformPicker: (e: any) => {
        d.form.contact_communication_platforms = e
      },
    },
  },

  consume: {
    contacts: async () => {
      d.contacts = await consume.contacts.browse(
        {
          all: true,
        },
        false,
      )
    },
  },

  helper: {
    formatter: {
      baptismDateFormat: (type: any, options: any) => {
        if (type === "month") {
          console.log(options.text)

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

const contactList = computed(() => {
  return d.contacts.map((pg: any) => ({ text: pg.name, value: pg.id }))
})

m.consume.contacts()
</script>
