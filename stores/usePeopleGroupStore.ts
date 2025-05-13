import { defineStore } from "pinia"

export const usePeopleGroupStore = defineStore("peopleGroup", () => {
  const peopleGroups = ref<any[]>(JSON.parse(localStorage.getItem("peopleGroups") || "{}") )

  const options = computed(() => {
    return peopleGroups.value.map((pg: any) => ({ text: pg.name, value: pg.id }))
  })

  const setPeopleGroups = (peopleGroupValues: any[]) => {
    peopleGroups.value = peopleGroupValues
    localStorage.setItem("peopleGroups", JSON.stringify(peopleGroupValues))
  }

  return { 
    peopleGroups, 
    options, 
    setPeopleGroups 
  }
})
