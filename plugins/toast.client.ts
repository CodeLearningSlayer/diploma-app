import Toast, {
  TYPE as ToastType,
  POSITION as ToastPosition,
  type PluginOptions,
} from "vue-toastification";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Toast, {
    toastDefaults: {
      [ToastType.SUCCESS]: {
        position: ToastPosition.BOTTOM_RIGHT,
      },
      [ToastType.ERROR]: {
        position: ToastPosition.BOTTOM_RIGHT,
      },
    },
    hideProgressBar: true,
  } as PluginOptions);
});
