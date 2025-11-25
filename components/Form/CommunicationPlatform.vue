<template>
  <VanActionSheet
    v-model:show="d.show"
    :title="p.platform.name ?? ''"
    @close="m.handle.beforeClose"
  >
    <VanCellGroup>
      <VanSwipeCell
        v-for="(pf, i) in platformForm"
        :key="pf"
      >
        <template #left>
          <!-- <VanButton square type="primary" text="Select" /> -->
        </template>

        <VanCell :title="pf" />

        <template #right>
          <VanButton
            square
            type="primary"
            :text="h.translate('edit')"
            @click="m.handle.click.btn.editPlatform(pf, i)"
          />
          <VanButton
            square
            type="danger"
            :text="h.translate('delete')"
            @click="m.handle.click.btn.deletePlatform(pf, i)"
          />
        </template>
      </VanSwipeCell>

      <VanPopup
        v-model:show="d.visibility.editPopup"
        position="bottom"
        style="height: 30%"
        closeable
        round
      >
        <VanCellGroup :title="h.translate('edit')">
          <VanCell>
            <VanField
              v-model="d.editingValue.value"
              :placeholder="h.translate('enter_new_value')"
              :label="h.translate('value')"
            />
          </VanCell>

          <VanCell>
            <VanButton
              block
              type="warning"
              size="small"
              @click="m.handle.click.btn.edit"
            >
              {{ h.translate("edit") }}
            </VanButton>
          </VanCell>
        </VanCellGroup>
      </VanPopup>
    </VanCellGroup>

    <VanCell>
      <VanField
        v-if="d.visibility.addNew"
        v-model="d.newValue"
        :placeholder="h.translate('enter_new_value')"
      />
    </VanCell>

    <VanCell>
      <div v-if="!d.visibility.addNew">
        <VanCell>
          <VanButton
            type="success"
            block
            size="small"
            @click="d.visibility.addNew = true"
          >
            {{ h.translate("add") }} {{ p.platform.name }}
          </VanButton>
        </VanCell>

        <VanCell>
          <VanButton
            type="primary"
            block
            plain
            size="small"
            @click="d.show = false"
          >
            {{ h.translate("close") }}
          </VanButton>
        </VanCell>
      </div>

      <div v-else>
        <VanCell>
          <VanButton
            type="success"
            block
            size="small"
            @click="m.handle.click.btn.addNew"
          >
            {{ h.translate("add") }}
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
            {{ h.translate("cancel") }}
          </VanButton>
        </VanCell>
      </div>
    </VanCell>
  </VanActionSheet>
</template>

<script lang="ts" setup>
import type { CommunicationPlatformFormModel } from "~/types"

const emit = defineEmits(["close", "added", "updated", "deleted"])
const h = useHelpers()
const p = withDefaults(
  defineProps<{
    platform: CommunicationPlatformFormModel
    show?: boolean
    form: any[]
  }>(),
  {
    show: false,
  }
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
  form: [] as any[],
})

const m = {
  handle: {
    beforeClose: () => {
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
        deletePlatform: (platform: string, index: number) => {
          d.form.splice(index, 1)
          d.editingValue = {
            value: platform,
            originalValue: platform,
            index: index,
          }
          emit("deleted", d.editingValue)
          console.log("editingValue ", d.editingValue)
        },

        edit: () => {
          d.form[d.editingValue.index] = d.editingValue.value
          emit("updated", d.form, d.editingValue)

          d.visibility.editPopup = false
        },
      },
    },

    updateModelValue: () => {
      emit("updated", d.form, p.form)
    },
  },
}

watch(
  () => p.show,
  (newValue) => {
    d.show = newValue ? newValue : d.show
  }
)

watch(
  () => p.form,
  (newValue) => {
    d.form = newValue ? newValue : d.form
    platformForm.value = newValue
  },
  { immediate: true }
)
</script>
