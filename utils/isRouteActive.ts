import { useRouter } from "vue-router";

export const isRouteActive = (route: string) => {
  const router = useRouter();

  if (router.currentRoute.value.path.startsWith(route)) {
    return true;
  }
  return false;
};
