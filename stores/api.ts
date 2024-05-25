import { $fetch, type FetchOptions } from "ofetch";
import { AuthService } from "~/api/modules/auth";
import { FileService } from "~/api/modules/files";
import { FriendshipService } from "~/api/modules/friendship";
import { PostsService } from "~/api/modules/posts";
import { ProfileService } from "~/api/modules/profile";
import UserService from "~/api/modules/user";

export const useApiStore = defineStore("useApiStore", () => {
  const {
    public: { baseApiUrl },
  } = useRuntimeConfig();

  const { isAuth } = storeToRefs(useAuthStore());
  const {
    accessToken,
    accessExpirationDate: expirationDate,
    refreshToken,
  } = storeToRefs(useCookieStore());

  let isRefreshing = false;

  interface IResolverItem {
    resolve: (value?: any) => void;
  }

  const retryRequestsQueue: IResolverItem[] = [];

  const postRefresh = async (token: string) => {
    const { accessToken: access } = await $fetch("/auth/refresh", {
      baseURL: baseApiUrl,
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: {
        refresh: refreshToken.value,
      },
    });

    return access;
  };

  const $fetcherOptions: FetchOptions = {
    baseURL: baseApiUrl,

    // ! Обработка параллельных запросов
    async onRequest({ options }) {
      if (!isAuth.value && !accessToken.value) {
        await navigateTo("/auth");
        return;
      }

      if (!isAuth.value && !accessToken.value) return;

      if (+expirationDate.value! - Date.now() < 0) {
        try {
          if (!isRefreshing) {
            isRefreshing = true;
            const newToken = await postRefresh(accessToken.value!);
            accessToken.value = newToken;
            retryRequestsQueue.forEach(({ resolve }) => {
              resolve(newToken);
            });
            retryRequestsQueue.length = 0;
          } else {
            const resolveRefreshPromise = new Promise<void>(resolve => {
              retryRequestsQueue.push({ resolve });
            });
            await resolveRefreshPromise;
          }
        } catch (e) {
          accessToken.value = null;
        } finally {
          isRefreshing = false;
        }
      }
      options.headers = { ...options.headers, Authorization: `Bearer ${accessToken.value}` };
    },

    async onResponseError({ response }) {
      if (response.status === 401) {
        isAuth.value = false;
        expirationDate.value = null;
        accessToken.value = null;

        await navigateTo("/auth");
      }

      // Насчёт этого пока что подумать, мб не редиректить никуда
      if (response.status === 403) {
        await navigateTo(`/auth`);
      }
    },
  };

  const $fetcher = $fetch.create($fetcherOptions);

  return {
    userService: new UserService($fetcher),
    authService: new AuthService($fetcher),
    filesService: new FileService($fetcher),
    profileService: new ProfileService($fetcher),
    postsService: new PostsService($fetcher),
    friendshipServce: new FriendshipService($fetcher),
  };
});
