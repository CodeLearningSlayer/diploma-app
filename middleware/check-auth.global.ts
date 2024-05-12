export default defineNuxtRouteMiddleware(async () => {
  const { isAuth, userId } = storeToRefs(useAuthStore());
  const { accessToken } = storeToRefs(useCookieStore());

  console.log(isAuth, userId.value);
  if (isAuth.value && accessToken.value) {
    console.log("ALREADY LOGGED IN");
    return;
  }

  if (accessToken.value) {
    const { profileService } = useApiStore();
    const { data, error } = await useAsyncData(() => profileService.GetMyProfile());

    if (!error.value) {
      isAuth.value = true;
      userId.value = data.value.profile.userId;
      console.log(userId.value, "MIDDLEWARE");
      return;
    }
  }

  isAuth.value = false;
});
