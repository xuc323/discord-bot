import { Message } from "discord.js";
import { command, MyClient } from "../../type";

const cmd: command = {
  name: "ping",
  description: "Return bot's latency in ms.",
  args: false,
  execute(message: Message, args: string[], client: MyClient) {
    // create ping
    const ping = client.ws.ping;
    // send the placeholder
    message.channel.send("Pinging...").then((sent) => {
      // modify the message with latency status
      sent.edit(
        `Websocket heartbeat: ${ping}ms.\nRoundtrip latency: ${
          sent.createdTimestamp - message.createdTimestamp
        }ms.`
      );
    });
  },
};

export default cmd;
