import { io } from "socket.io-client";

export const socket = io("https://msnger-bcknd.herokuapp.com", {
  transports: ["websocket", "polling", "flashsocket"],
});

export let socketID = "";

socket.on("connect", () => {
  socketID = socket.id;
});
