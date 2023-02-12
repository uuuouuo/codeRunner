import { Client } from "@stomp/stompjs";

export const client = new Client({
  brokerURL: "ws://localhost:8083/ws-stomp",
  debug: function (str) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

client.onStompError = function (frame) {
  console.log("Broker reported error: " + frame.headers["message"]);
  console.log("Additional details: " + frame.body);
};

client.activate();
