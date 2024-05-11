export default defineNuxtRouteMiddleware(async () => {
  const { isAuth } = storeToRefs(useAuthStore());
  const { accessToken } = storeToRefs(useCookieStore());

  if (isAuth.value && accessToken.value) return;

  if (accessToken.value) {
    const { userService } = useApiStore();
    const { error } = await useAsyncData(() => userService.GetMyProfile());

    if (!error.value) {
      isAuth.value = true;
      return;
    }
  }

  isAuth.value = false;
});
