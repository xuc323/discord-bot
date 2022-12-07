import { Events } from "discord.js";
import { event, MyClient } from "../type";

const e: event = {
  name: Events.Error,
  execute(client: MyClient, error: Error) {
    console.log(`BOT ERROR: ${error}`);
  },
};

export = e;
