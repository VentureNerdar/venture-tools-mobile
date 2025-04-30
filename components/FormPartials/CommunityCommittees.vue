<template>
  <div>
     <VanField center clearable label="Committees">
      <template #input>
        <VanButton icon="plus" type="primary" @click="m.handle.click.modal"/>
      </template>
    </VanField>
    
    <VanDialog 
      v-model:show="d.visibility.modal" 
      title="Add Community Committee" 
      show-cancel-button
      @confirm="m.handle.click.save"
      @cancel="m.handle.click.close"
    >
      <div style="max-height: 400px; overflow: auto">
        <VanList>
          <VanCell>
            <template #title>
              <div>
                <VanField
                  v-model="d.form.name"
                  label="Name"
                  placeholder="Name"
                />
              </div>
            </template>
          </VanCell>
        </VanList>
      </div>
    </VanDialog>
    <div>
      <VanList>
        <VanCellGroup>
          <template #title>
            <div  v-if="p.committees && p.committees.length > 0">
              <VanList>
                <VanCell
                  v-for="committee in p.committees"
                  :key="committee.id"
                  :title="committee.name"
                >
                  <!-- <template #title>
                    <div>
                      <div><strong>Name:</strong> {{ person.name }}</div>
                    </div>
                  </template> -->
                      <template #right-icon>
                        <VanIcon size="20" color="#17badf" name="edit" @click="m.handle.click.edit(committee)" />
                        <VanIcon size="20" color="#17badf" style="margin-left: 10px;" name="delete-o" @click="m.handle.click.delete(committee)" />
                      </template> 
                </VanCell>
              </VanList>
            </div>
            <div  v-else>
              <VanList>
                <VanCell title="No community committee" />
              </VanList>
            </div>
          </template>

        </VanCellGroup>
      </VanList>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {  CommunityCommittee} from '~/types/index.d';

const p = defineProps<{
  committees: CommunityCommittee[]
}>()

const emits = defineEmits(['added', 'updated', 'deleted'])

const d = reactive({
  visibility: {
    modal: false
  },
  form: {
    name: "", 
    originalName: "",
  } as CommunityCommittee,
  mode: "add" as "add" | "edit"
})


const m = {
  handle: {
    click: {
      modal: () => {
        d.mode === "add"
        d.visibility.modal = true
      },
      save: () => {
        d.visibility.modal = false
        const peacePerson = { ...d.form }
        emits(d.mode === "add" ? "added" : "updated" , peacePerson)
        d.form.name = ""
        d.form.originalName = ""
      },
      close: () => {
        d.visibility.modal = false
        d.form.name = ""
        d.form.originalName = ""
      },
      edit: (pp:CommunityCommittee) => {
          d.mode = "edit"
          d.form.name = pp.name
          d.form.originalName = pp.originalName ? pp.originalName : pp.name
          d.visibility.modal = true

      },
      delete: (pp:CommunityCommittee) => {
        emits("deleted", pp)
      }
    }
  }
}

watch(
  () => p.committees,
  (committees) => {
    const pp = [...committees] as CommunityCommittee[]

    pp.forEach((pp: CommunityCommittee) => {
      pp.originalName = pp.name
    })

    d.form = JSON.parse(JSON.stringify(pp))
  },
  { deep: true },
)

</script> 