import { $fetch } from "ofetch";
import UserService from "~/api/modules/user";

export const useApiStore = defineStore("useApiStore", () => {
  const $fetcherOptions = {};

  const $fetcher = $fetch.create($fetcherOptions);

  return {
    userService: new UserService($fetcher),
  };
});
