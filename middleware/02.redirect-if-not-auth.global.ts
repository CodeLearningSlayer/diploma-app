import { unprotectedRoutes } from "~/consts/auth";

export default defineNuxtRouteMiddleware(to => {
  const { isAuth } = storeToRefs(useAuthStore());

  const isPathUnpotected = unprotectedRoutes.includes(to.path);

  if (!isAuth.value && !isPathUnpotected) {
    return navigateTo("/auth");
  }
});
