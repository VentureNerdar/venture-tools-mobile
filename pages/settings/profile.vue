<template>
  <div>
    <VanCellGroup>
      <VanField v-model="form.name" label="Name" placeholder="Name" />
      <!-- <VanCell title="User Role" value="Administrator" /> -->
      <VanCell title="User Role">
        <template #value>
          <VanTag type="primary">Administrator</VanTag>
        </template>
      </VanCell>

      <VanField
        v-model="form.username"
        label="Username"
        placeholder="Username"
        readonly
      />

      <VanField v-model="form.email" label="Email" placeholder="Email" />
      <VanField v-model="form.phone" label="Phone" placeholder="Phone" />
      <VanField
        v-model="form.biography"
        label="Biography"
        placeholder="Biography"
      />

      <VanField
        v-model="form.preferredLanguage"
        label="Language"
        placeholder="Preferred Language"
        is-link
        readonly
        @click="showPicker = true"
      />

      <VanPopup v-model:show="showPicker" position="bottom" round>
        <VanPicker
          :model-value="pickerValue"
          title="Languages"
          :columns="languagePicker"
          @cancel="showPicker = false"
        />
      </VanPopup>

      <VanCell>
        <VanButton type="primary" block size="small">Update</VanButton>
      </VanCell>
    </VanCellGroup>

    <VanCellGroup title="Authentication">
      <VanCell is-link title="Change Password" />

      <VanCell title="Logout">
        <template #value>
          <VanButton
            type="danger"
            size="mini"
            plain
            block
            @click="m.handle.click.logout"
            >Logout</VanButton
          >
        </template>
      </VanCell>
    </VanCellGroup>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/stores/useAuthStore"
import { showNotify } from "vant"

definePageMeta({
  layout: "application",
})

const showPicker = ref(false)
const pickerValue = ref<number[]>([])

const form = {
  name: "Jill Hamza",
  username: "jill",
  email: "jill@demo.com",
  phone: "+6661658220",
  biography:
    "Jill is a creative and driven individual known for her passion for problem-solving and innovation. With a knack for organization and detail, she thrives in fast-paced environments. Outside work, Jill enjoys hiking, reading, listening to metal bands like Architects and Poppy, and exploring new cuisines.",
  preferredLanguage: "English",
}

const languagePicker = [
  { text: "English", value: "English" },
  { text: "Nepali", value: "Nepali" },
  { text: "Myanmar", value: "Myanmar" },
]

const m = {
  handle: {
    click: {
      logout: async () => {
        await useAuthStore().logout()

        showNotify({
          type: "success",
          message: "See you again!",
          duration: 2000,
        })
      },
    },
  },
}
</script>
