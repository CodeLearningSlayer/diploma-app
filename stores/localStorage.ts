import { useLocalStorage } from "@vueuse/core";

export const useLocalStore = defineStore("useLocalStore", () => {
  const enum AuthNames {
    RefreshLocalStorageName = "__work_link__refresh_token__",
  }

  const refreshToken = useLocalStorage(AuthNames.RefreshLocalStorageName, "");
  return { refreshToken };
});
