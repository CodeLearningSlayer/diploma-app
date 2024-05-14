export const useAuthStore = defineStore("useAuthStore", () => {
  const isAuth = ref();
  const userId = ref();
  const profileSlug = ref();

  const isMyProfile = (id: number) => {
    console.log(userId.value, id);
    return userId.value === id;
  };

  return {
    isAuth,
    userId,
    profileSlug,
    isMyProfile,
  };
});
