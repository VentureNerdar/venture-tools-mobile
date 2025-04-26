import { defineStore } from "pinia";

export const useCommunicationPlatformStore = defineStore(
  "communicationPlatform",
  () => {
    const communicationPlatforms = JSON.parse(
      localStorage.getItem("communicationPlatforms") || "{}",
    );
    return { communicationPlatforms };
  },
);
