<template>
  <!-- Single collapse containing many items -->
  <VanCollapse v-model="activeNames">
    <VanCollapseItem
      :title="h.translate('member_count_by_people_group')"
      name="member_count_by_people_group"
    >
      <div
        v-for="peopleGroup in props.peopleGroupList"
        :key="peopleGroup.id"
      >
        <label>{{ peopleGroup.name }}</label>
        <VanField
          type="digit"
          :placeholder="h.translate('please_input')"
          :model-value="m.handle.getPeopleGroupCount(peopleGroup.id as number)"
          @update:model-value="
            (val) => m.handle.setPeopleGroupCount(peopleGroup.id as number, val)
          "
        />
      </div>
    </VanCollapseItem>
  </VanCollapse>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import type { PeopleGroupFormModel } from "~/types/index.d"

const props = defineProps({
  peopleGroupList: {
    type: Array as () => PeopleGroupFormModel[],
    default: () => [],
  },
  modelValue: {
    type: Array as () => { people_group_id: number; amount: number }[],
    default: () => [],
  },
})

const emit = defineEmits(["update:modelValue"])

const activeNames = ref<string[]>([])
const h = useHelpers()
const d = {
  model: {
    member_count_list_by_people_group: ref<
      { people_group_id: number; amount: number }[]
    >([]),
  },
}

const m = {
  handle: {
    getPeopleGroupCount: (groupID: number): number => {
      const pg = d.model.member_count_list_by_people_group.value.find(
        (pg) => pg.people_group_id === groupID,
      )
      return pg ? pg.amount : 0
    },
    setPeopleGroupCount: (groupID: number, amount: number) => {
      const list = d.model.member_count_list_by_people_group.value
      const existingIndex = list.findIndex(
        (pg) => pg.people_group_id === groupID,
      )

      if (existingIndex !== -1) {
        list[existingIndex].amount = amount
      } else {
        list.push({ people_group_id: groupID, amount: amount ?? 0 })
      }

      d.model.member_count_list_by_people_group.value = [...list]
      emit("update:modelValue", d.model.member_count_list_by_people_group.value)
    },
  },
}

watch(
  () => props.modelValue,
  (val) => {
    if (Array.isArray(val)) {
      d.model.member_count_list_by_people_group.value = [...val]
    }
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
::v-deep(.van-collapse-item__content) {
  background-color: #021526;
}
</style>
