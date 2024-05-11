import type { CookieOptions } from "#app";

export const useCookieStore = defineStore("useCookieStore", () => {
  const options: CookieOptions & { readonly?: false | undefined } = {
    maxAge: 60 * 1000 * 60 * 24 * 400,
  };

  const enum CookieNames {
    AccessToken = "__work_link__access_token",
    RefreshToken = "__work_link__refresh_token",
    AccessTokenExpirationDate = "__work_link__access_token_expiration_date__",
  }

  const accessToken = useCookie(CookieNames.AccessToken, options);
  const accessExpirationDate = useCookie(CookieNames.AccessTokenExpirationDate, options);

  const refreshToken = useCookie(CookieNames.RefreshToken, options);

  watch(accessToken, (token: string) => {
    if (token) {
      accessExpirationDate.value = getTokenExpirationTime(token).toString();
    }
  });

  return {
    accessToken,
    refreshToken,
    accessExpirationDate,
  };
});
