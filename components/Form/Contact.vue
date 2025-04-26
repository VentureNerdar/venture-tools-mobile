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

    <!-- {{ s.communicationPlatform.communicationPlatforms }} -->
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

import type { Numeric } from "vant/es/utils"
import type { GenderTypes, AgeGroups } from "~/types"
const s = {
  settings: useSettingStore(),
  peopleGroup: usePeopleGroupStore(),
  communicationPlatform: useCommunicationPlatformStore(),
}

const contactStatusFieldValue = ref("")
const faithStatusFieldValue = ref("")
const ageGroupFieldValue = ref("")
const peopleGroupFieldValue = ref("")

const contactStatusID = ref<Numeric[]>([])
const faithStatusID = ref<Numeric[]>([])
const ageGroupID = ref<AgeGroups[]>([])
const peopleGroupID = ref([])

const d = reactive({
  visibility: {
    contactPicker: false,
    faithStatusPicker: false,
    ageGroupPicker: false,
    peopleGroupPicker: false,
    communicationPlatformActionSheet: false,
  },
  form: {
    name: "",
    contact_status_id: null,
    faith_status_id: null,
    gender: null,
    age: null,
    people_group: [],
    contact_communication_platforms: [] as string[],
  } as ContactFormModel,

  currentCommunicationPlatform: {
    name: "",
  } as CommunicationPlatformFormModel,
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
        // d.form.people_group = selectedOptions[0].value as
        peopleGroupFieldValue.value = selectedOptions[0].text
        d.visibility.peopleGroupPicker = false
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

      communicationPlatform: (cp: any) => {
        d.visibility.communicationPlatformActionSheet = true
        d.currentCommunicationPlatform = cp
        console.log("Clicked Communication Platform:", cp)
      },

      confirmCommunicationPlatformPicker: (asdf: any) => {
        d.form.contact_communication_platforms ||= [] as string[]
        d.form.contact_communication_platforms.push(asdf)
      },
    },

    emits: {
      updatedCommunicationPlatformPicker: (e: any) => {
        console.log("Updated Communication Platform:", e)
        d.form.contact_communication_platforms = e
      },
    },
  },
}
</script>
