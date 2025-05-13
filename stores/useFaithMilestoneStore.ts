import { defineStore } from "pinia"

export const useFaithMilestoneStore = defineStore("faithMilestone", () => {
  const faithMilestones = ref<any[]>(JSON.parse(
    localStorage.getItem("faithMilestones") || "{}",
  ))
  const options = computed(() => {
    return faithMilestones.value.map((pg: any) => ({ text: pg.name, value: pg.id }))
  })
  const setFaithMilestones = (faithMilestoneValues: any[]) => {
    faithMilestones.value = faithMilestoneValues
    localStorage.setItem("faithMilestones", JSON.stringify(faithMilestoneValues))
  }

  return { faithMilestones, options, setFaithMilestones }
})
