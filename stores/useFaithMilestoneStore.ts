import { defineStore } from "pinia";

export const useFaithMilestoneStore = defineStore("faithMilestone", () => {
  const faithMilestones = JSON.parse(
    localStorage.getItem("faithMilestones") || "{}",
  );
  return { faithMilestones };
});
