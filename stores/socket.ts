import { Socket, io } from "socket.io-client";

export const useSocketStore = defineStore("useSocketStore", () => {
  const config = useRuntimeConfig();
  const { accessToken } = storeToRefs(useCookieStore());
  const { isAuth } = storeToRefs(useAuthStore());

  let socket: Socket;

  function createSocket() {
    socket = io(config.public.baseSocketUrl, {
      autoConnect: false,
      auth: {
        token: `Bearer ${accessToken.value}`,
      },
    });

    socket.on("connect_error", err => {
      console.log("Connection error:", err.message);
    });

    return socket;
  }

  // Watch for changes in the accessToken and reconnect the socket with the new token
  watch(
    [accessToken, isAuth],
    () => {
      if (socket) {
        socket.disconnect();
      }

      if (accessToken.value && isAuth.value) {
        console.log("Создаю сокет");
        socket = createSocket();
      }

      socket = createSocket();
    },
    { immediate: true },
  );

  watch(
    () => socket,
    () => {
      if (socket && isAuth.value && accessToken.value && !socket.connected) {
        console.log("коннекчу");
        socket.connect();
      }
    },
    { immediate: true },
  );

  return {
    // @ts-ignore
    $socket: socket,
  };
});
