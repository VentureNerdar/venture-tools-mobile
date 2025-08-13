// import { useAuthStore } from "~/stores/useAuthStore"

export default defineNuxtRouteMiddleware((to, from) => {
  /*
  const token = localStorage.getItem("Bearer") || "";
  if (!token && to.path !== "/") {
    return navigateTo("/", { replace: true });
  }
  */
})

// export default defineNuxtRouteMiddleware((to, from) => {
//   const authStore = useAuthStore()
//   if (!authStore.authUser && to.path === "/profile") {
//     return navigateTo("/")
//   }
// })
