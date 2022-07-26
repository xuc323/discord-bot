// import discord.js module
import {
  Client,
  GatewayIntentBits,
  Collection,
  ActivityType,
} from "discord.js";
// import music player module
import { Player } from "./music_player/player";
// import database module
import Database from "./database/database";
import { readdirSync } from "fs";
// dotenv file
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { client as botClient, command } from "./client/client";

// create an instance of a discord client
const client: botClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// create an instance of music player by passing in discord client, client now has player attribute
client.player = new Player(client);

// create an instance of database, client now has database attribute
client.postgres = new Database(process.env.DATABASE_URL!);

// COMMANDS
// register commands
client.commands = new Collection();
const commandFolders = readdirSync("./client/commands");
// loop through all folders in commands
for (const folder of commandFolders) {
  const commandFiles = readdirSync(`./client/commands/${folder}`);

  // loop through all .js files
  for (const file of commandFiles) {
    const command: command = require(`./client/commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

// EVENTS
const eventFiles = readdirSync("./client/events");
// loop through all .js files
for (const file of eventFiles) {
  const event = require(`./client/events/${file}`);
  client.on(event.name, (...args) => event.execute(...args, client));
}

// ready event to fire only once
client.once("ready", () => {
  console.log(`Bot is online! Logged in as ${client.user!.tag}!`);
});
client.once("guildCreate", (guild) => {
  guild.systemChannel?.send(
    "Thanks for inviting me to your server!\nCommands start with `!`. Type `!help` for more information."
  );
});

// log in using token
client.login(process.env.DISCORD_TOKEN!).then(() => {
  client.user?.setActivity("!help for help", {
    type: ActivityType.Watching,
  });
});
