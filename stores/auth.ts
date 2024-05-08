export const useAuthStore = defineStore("useAuthStore", () => {
  const isAuth = ref(true);

  return {
    isAuth,
  };
});
