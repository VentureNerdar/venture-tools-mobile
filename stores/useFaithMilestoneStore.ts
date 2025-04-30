import { defineStore } from "pinia"

export const useFaithMilestoneStore = defineStore("faithMilestone", () => {
  const faithMilestones = JSON.parse(
    localStorage.getItem("faithMilestones") || "{}",
  )
  const options = computed(() => {
    return faithMilestones.map((pg: any) => ({ text: pg.name, value: pg.id }))
  })

  return { faithMilestones, options }
})
