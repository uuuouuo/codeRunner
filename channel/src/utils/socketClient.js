import { Client, Message } from "@stomp/stompjs";
import useStompClient from "@stomp/stompjs";

const client = new Client({
  brokerURL: "ws://localhost:8083/ws-stomp",
  connectHeaders: {
    login: "user",
    passcode: "password",
  },
  debug: function (str) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

client.onConnect = function (frame) {
  console.log("connected!");
};

client.onStompError = function (frame) {
  console.log("Broker reported error: " + frame.headers["message"]);
  console.log("Additional details: " + frame.body);
};

client.activate();
