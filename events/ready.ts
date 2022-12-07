import { Events } from "discord.js";
import { event, MyClient } from "../type";

const e: event = {
  name: Events.ClientReady,
  once: true,
  execute(client: MyClient) {
    console.log(`Bot is online! Logged in as ${client.user?.tag}!`);
  },
};

export = e;
