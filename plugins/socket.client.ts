import { io } from "socket.io-client";
export default defineNuxtPlugin(_nuxtApp => {
  const config = useRuntimeConfig();

  const { accessToken } = storeToRefs(useCookieStore());

  const socket = io(config.public.baseSocketUrl, {
    autoConnect: true,
    auth: {
      token: `Bearer ${accessToken.value}`,
    },
  });

  socket.on("connect_error", err => {
    console.log("Connection error:", err.message);
  });

  return {
    provide: {
      socket,
    },
  };
});
