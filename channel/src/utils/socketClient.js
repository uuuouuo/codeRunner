import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const sock = new SockJS("http://localhost:8083/ws-stomp");
sock.onopen = function () {
  console.log("open");
  sock.send("test");
};

sock.onmessage = function (e) {
  console.log("message", e.data);
  sock.close();
};

sock.onclose = function () {
  console.log("close");
};
export let stompClient = Stomp.over(sock);
