import type { IUser } from "~/api/specs/user";

export const useUserStore = defineStore("userStore", () => {
  const myAccount = ref<IUser>();

  return { myAccount };
});
