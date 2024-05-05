// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  css: ["~/assets/css/main.css"],
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", config => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxtjs/eslint-module",
    "dayjs-nuxt",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Montserrat: [400, 500, 600, 700],
        },
        display: "swap",
      },
    ],
  ],
  imports: {
    dirs: ["stores"],
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  postcss: {
    plugins: {
      "postcss-nested": {},
    },
  },
  dayjs: {
    locales: ["en", "fr"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "en",
    defaultTimezone: "America/New_York",
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
