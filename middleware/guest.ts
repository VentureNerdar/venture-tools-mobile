export default defineNuxtRouteMiddleware((to) => {
  const token = localStorage.getItem("Bearer") || "";

  if (token && to.path !== "/home") {
    return navigateTo("/dashboard", { replace: true });
  }
});
