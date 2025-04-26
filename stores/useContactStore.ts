import { defineStore } from "pinia";

export const useContactStore = defineStore("contact", () => {
  const contacts = JSON.parse(localStorage.getItem("contacts") || "{}");
  return { contacts };
});
