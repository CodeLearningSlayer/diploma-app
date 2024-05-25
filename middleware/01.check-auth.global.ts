export default defineNuxtRouteMiddleware(async () => {
  const { isAuth, userId, profileSlug, profile } = storeToRefs(useAuthStore());
  const { accessToken } = storeToRefs(useCookieStore());

  console.log(isAuth, userId.value);
  if (isAuth.value && accessToken.value) {
    console.log("ALREADY LOGGED IN");
    return;
  }

  if (accessToken.value) {
    const { profileService } = useApiStore();
    const { data, error } = await useAsyncData(() => profileService.GetMyProfile());

    if (!error.value && data.value?.profile) {
      isAuth.value = true;
      profile.value = data.value.profile;
      userId.value = data.value?.profile.userId;

      if (!data.value?.profile.isPrimaryInformationFilled) {
        return navigateTo("/auth/start");
      }

      profileSlug.value = data.value?.profile.slug;
      return;
    }
  }

  isAuth.value = false;
});
