import { defineStore } from 'pinia'

export const useCommunicationPlatformStore = defineStore('communicationPlatform', () => {
  const communicationPlatforms = ref<any>(JSON.parse(localStorage.getItem('communicationPlatforms') || '{}'))
  function setCommunicationPlatforms(communicationPlatformValues: any) {
    communicationPlatforms.value = communicationPlatformValues
    localStorage.setItem('communicationPlatforms', JSON.stringify(communicationPlatformValues))
  }
  return {
    communicationPlatforms,
    setCommunicationPlatforms
  }
})
