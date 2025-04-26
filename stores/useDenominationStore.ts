import { defineStore } from "pinia";

export const useDenominationStore = defineStore("denomination", () => {
  const denominations = JSON.parse(
    localStorage.getItem("denominations") || "{}",
  );
  return { denominations };
});
