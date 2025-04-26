import { defineStore } from "pinia"

export const usePeopleGroupStore = defineStore("peopleGroup", () => {
  const peopleGroups = JSON.parse(localStorage.getItem("peopleGroups") || "{}")

  const options = computed(() => {
    return peopleGroups.map((pg: any) => ({ text: pg.name, value: pg.id }))
  })

  return { peopleGroups, options }
})
