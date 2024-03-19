export const useAuth = defineStore("useAuthStore", () => {
  const isAuth = ref();

  return {
    isAuth,
  };
});
