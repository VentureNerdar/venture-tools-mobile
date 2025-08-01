import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { SecureStoragePlugin } from "capacitor-secure-storage-plugin"

export const usePeopleGroupStore = defineStore("peopleGroup", () => {
  const peopleGroups = ref<any[]>([])

  // Computed list for dropdowns etc.
  const options = computed(() => {
    return peopleGroups.value.map((pg: any) => ({
      text: pg.name,
      value: pg.id,
    }))
  })

  // Load from secure storage
  const loadFromSecureStorage = async () => {
    try {
      const stored = await SecureStoragePlugin.get({ key: "peopleGroups" })
      peopleGroups.value = JSON.parse(stored.value)
    } catch (error) {
      console.log(error)
      peopleGroups.value = []
    }
  }

  // Save to secure storage
  const setPeopleGroups = async (peopleGroupValues: any[]) => {
    peopleGroups.value = peopleGroupValues
    await SecureStoragePlugin.set({
      key: "peopleGroups",
      value: JSON.stringify(peopleGroupValues),
    })
  }

  return {
    peopleGroups,
    options,
    loadFromSecureStorage,
    setPeopleGroups,
  }
})
