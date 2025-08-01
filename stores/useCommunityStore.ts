import { defineStore } from "pinia"
import { ref } from "vue"
import { SecureStoragePlugin } from "capacitor-secure-storage-plugin"

export const useCommunityStore = defineStore("communities", () => {
  const communities = ref<any>({})
  const communityChecklists = ref<any>({})

  // Load both communities and checklists from secure storage
  const loadFromSecureStorage = async () => {
    try {
      const storedCommunities = await SecureStoragePlugin.get({
        key: "communities",
      })
      communities.value = JSON.parse(storedCommunities.value)
    } catch (error) {
      console.log(error)
      communities.value = {}
    }

    try {
      const storedChecklists = await SecureStoragePlugin.get({
        key: "communityChecklists",
      })
      communityChecklists.value = JSON.parse(storedChecklists.value)
    } catch (error) {
      console.log(error)
      communityChecklists.value = {}
    }
  }

  // Save communities
  const setCommunities = async (data: any) => {
    communities.value = data
    await SecureStoragePlugin.set({
      key: "communities",
      value: JSON.stringify(data),
    })
  }

  // Save community checklists
  const setCommunityChecklists = async (data: any) => {
    communityChecklists.value = data
    await SecureStoragePlugin.set({
      key: "communityChecklists",
      value: JSON.stringify(data),
    })
  }

  return {
    communities,
    communityChecklists,
    loadFromSecureStorage,
    setCommunities,
    setCommunityChecklists,
  }
})
