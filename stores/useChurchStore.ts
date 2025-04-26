import { defineStore } from "pinia";

export const useChurchStore = defineStore("church", () => {
  const churches = JSON.parse(localStorage.getItem("churches") || "{}");
  return { churches };
});
