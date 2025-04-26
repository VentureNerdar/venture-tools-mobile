<template>
  <VanActionSheet
    v-model:show="d.show"
    :title="p.platform.name ?? ''"
    @close="m.handle.beforeClose"
  >
    <VanCellGroup>
      <VanSwipeCell v-for="(pf, i) in platformForm" :key="pf">
        <template #left>
          <!-- <VanButton square type="primary" text="Select" /> -->
        </template>

        <VanCell :title="pf" />

        <template #right>
          <VanButton
            square
            type="primary"
            text="Edit"
            @click="m.handle.click.btn.editPlatform(pf, i)"
          />
          <VanButton square type="danger" text="Delete" />
        </template>
      </VanSwipeCell>

      <VanPopup
        v-model:show="d.visibility.editPopup"
        position="bottom"
        style="height: 30%"
        closeable
        round
      >
        <VanCellGroup title="Edit">
          <VanCell>
            <VanField
              v-model="d.editingValue.value"
              placeholder="Enter new value"
              label="Value"
            />
          </VanCell>

          <VanCell>
            <VanButton
              block
              type="warning"
              size="small"
              @click="m.handle.click.btn.edit"
            >
              Edit
            </VanButton>
          </VanCell>
        </VanCellGroup>
      </VanPopup>
    </VanCellGroup>

    <VanCell>
      <VanField
        v-if="d.visibility.addNew"
        v-model="d.newValue"
        placeholder="Enter new value"
      />
    </VanCell>

    <VanCell>
      <VanButton
        v-if="!d.visibility.addNew"
        type="success"
        block
        size="small"
        plain
        @click="d.visibility.addNew = true"
      >
        Add {{ p.platform.name }}
      </VanButton>

      <div v-else>
        <VanCell>
          <VanButton
            type="success"
            block
            size="small"
            @click="m.handle.click.btn.addNew"
          >
            Add
          </VanButton>
        </VanCell>

        <VanCell>
          <VanButton
            type="primary"
            block
            size="small"
            plain
            @click="m.handle.click.btn.cancelAddNew"
          >
            Cancel
          </VanButton>
        </VanCell>
      </div>
    </VanCell>
  </VanActionSheet>
</template>

<script lang="ts" setup>
import type { CommunicationPlatformFormModel } from "~/types"

const emit = defineEmits(["close", "added", "updated"])
const p = withDefaults(
  defineProps<{
    platform: CommunicationPlatformFormModel
    show?: boolean
    form: number[]
  }>(),
  {
    show: false,
  },
)

const platformForm = ref({})

const d = reactive({
  show: false,
  newValue: "",
  editingValue: {} as { value: string; originalValue: string; index: number },
  visibility: {
    addNew: false,
    editPopup: false,
  },
  form: [] as number[],
})

const m = {
  handle: {
    beforeClose: () => {
      console.log("beforeClose")
      emit("close")
    },

    click: {
      btn: {
        cancelAddNew: () => {
          d.visibility.addNew = false
          d.newValue = ""
        },

        addNew: () => {
          emit("added", d.newValue)
          d.visibility.addNew = false
          d.newValue = ""
        },

        editPlatform: (platform: string, index: number) => {
          d.visibility.editPopup = true
          d.editingValue = {
            value: platform,
            originalValue: platform,
            index: index,
          }
        },

        edit: () => {
          d.form[d.editingValue.originalValue as string] = d.editingValue.value

          d.visibility.editPopup = false
        },
      },
    },

    updateModelValue: () => {
      emit("updated", d.form)
    },
  },
}

watch(
  () => p.show,
  (newValue) => {
    d.show = newValue ? newValue : d.show
  },
)

watch(
  () => p.form,
  (newValue) => {
    d.form = newValue ? newValue : d.form
    platformForm.value = newValue
  },
  { immediate: true },
)
</script>
