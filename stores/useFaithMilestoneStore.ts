import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { SecureStoragePlugin } from "capacitor-secure-storage-plugin"

export const useFaithMilestoneStore = defineStore("faithMilestone", () => {
  const faithMilestones = ref<any[]>([])

  // Computed list of options
  const options = computed(() => {
    return faithMilestones.value.map((pg: any) => ({
      text: pg.name,
      value: pg.id,
    }))
  })

  // Load from secure storage
  const loadFromSecureStorage = async () => {
    try {
      // const stored = await SecureStoragePlugin.get({ key: "faithMilestones" })
      const stored = await secureGet("faithMilestones")
      if (stored.value) {
        faithMilestones.value = JSON.parse(stored.value)
      }
    } catch (error) {
      console.log(error)
      faithMilestones.value = []
    }
  }

  // Save to secure storage
  const setFaithMilestones = async (faithMilestoneValues: any[]) => {
    faithMilestones.value = faithMilestoneValues
    await secureSet("faithMilestones", JSON.stringify(faithMilestoneValues))
    // await SecureStoragePlugin.set({
    //   key: "faithMilestones",
    //   value: JSON.stringify(faithMilestoneValues),
    // })
  }

  return {
    faithMilestones,
    options,
    loadFromSecureStorage,
    setFaithMilestones,
  }
})
