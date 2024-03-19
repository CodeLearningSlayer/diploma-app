// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  css: ["~/assets/css/base.css"],
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
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Montserrat: [400, 600, 700],
        },
        display: "swap",
      },
    ],
  ],
  postcss: {
    plugins: {
      "postcss-nested": {},
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
