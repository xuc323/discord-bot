import { Client } from "discord.js";

export const name = "error";
export function execute(error: Error, client: Client) {
  console.log(`BOT ERROR: ${error.name} ${error.message}`);
}
