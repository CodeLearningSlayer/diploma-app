import { $fetch } from "ofetch";
import UserApi from "~/api/modules/user";

export const useAPI = () => {
  const $fetcherOptions = {};

  const $fetcher = $fetch.create($fetcherOptions);

  return {
    userService: new UserApi($fetcher),
  };
};
