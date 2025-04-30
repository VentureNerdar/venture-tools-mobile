<template>
  <div>
     <VanField center clearable label="Person of Peace">
      <template #input>
        <VanButton icon="plus" type="primary" @click="m.handle.click.modal"/>
      </template>
    </VanField>
    
    <VanDialog 
      v-model:show="d.visibility.modal" 
      title="Add Person of Peace" 
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
                <VanField
                  v-model="d.form.email"
                  label="Email"
                  placeholder="Email"
                />
                <VanField
                  v-model="d.form.phone"
                  label="Phone"
                  placeholder="Phone"
                />
                  <!-- @click="selectChurchPlanter(churchPlanter)" -->
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
            <div  v-if="p.peacePersons && p.peacePersons.length > 0">
              <VanList>
                <VanCell
                  v-for="person in p.peacePersons"
                  :key="person.id"
                >
                  <template #title>
                    <div>
                      <div><strong>Name:</strong> {{ person.name }}</div>
                      <div><strong>Email:</strong> {{ person.email }}</div>
                      <div><strong>Phone:</strong> {{ person.phone }}</div>
                    </div>
                  </template>
                      <template #right-icon>
                        <VanIcon size="20" color="#17badf" name="edit" @click="m.handle.click.edit(person)" />
                        <VanIcon size="20" color="#17badf" style="margin-left: 10px;" name="delete-o" @click="m.handle.click.delete(person)" />
                      </template> 
                </VanCell>
              </VanList>
            </div>
            <div  v-else>
              <VanList>
                <VanCell title="No person of peace" />
              </VanList>
            </div>
          </template>

        </VanCellGroup>
      </VanList>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Peace } from '@vicons/fa';
import type { CommunityPeacePersonFormModel } from '~/types/index.d';

const p = defineProps<{
  peacePersons: CommunityPeacePersonFormModel[]
}>()

const emits = defineEmits(['added', 'updated', 'deleted'])

const d = reactive({
  visibility: {
    modal: false
  },
  form: {
    name: "", 
    email: "",
    phone: "",
    originalName: "",
  } as CommunityPeacePersonFormModel,
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
        d.form.email = ""
        d.form.phone = ""
        d.form.originalName = ""
      },
      close: () => {
        d.visibility.modal = false
        d.form.name = ""
        d.form.email = ""
        d.form.phone = ""
        d.form.originalName = ""
      },
      edit: (pp:CommunityPeacePersonFormModel) => {
          d.mode = "edit"
          d.form.name = pp.name
          d.form.email = pp.email
          d.form.phone = pp.phone
          d.form.originalName = pp.originalName ? pp.originalName : pp.name
          d.visibility.modal = true
      },
      delete: (pp:CommunityPeacePersonFormModel) => {
        emits("deleted", pp)
      }
    }
  }
}

watch(
  () => p.peacePersons,
  (peacePersons) => {
    const pp = [...peacePersons] as CommunityPeacePersonFormModel[]

    pp.forEach((pp: CommunityPeacePersonFormModel) => {
      pp.originalName = pp.name
    })

    d.form = JSON.parse(JSON.stringify(pp))
  },
  { deep: true },
)

</script> 