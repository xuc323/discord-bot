// import discord.js module
import {
  Client,
  GatewayIntentBits,
  Collection,
  ActivityType,
} from "discord.js";
// import file system module
import fs from "node:fs";
import path from "node:path";
// import music player module
import { Player } from "discord-music-player";
// import database module
import Database from "./database";
// dotenv file
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { command, event, MyClient, playerEvent, slashCmd } from "./type";

/**
 * START CREATING BOT CLIENT
 */
// create an instance of a discord client
const client: MyClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
  presence: {
    activities: [{ name: "| !help for help", type: ActivityType.Watching }],
    status: "online",
  },
});

// register commands
client.commands = new Collection();
client.slashCommands = new Collection();
const commandFolderPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(commandFolderPath);
// loop through all folders in commands
for (const folder of commandFolders) {
  const commandSubFolderPath = path.join(commandFolderPath, folder);
  const commandFiles = fs
    .readdirSync(commandSubFolderPath)
    .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));
  // loop through all .ts files
  for (const file of commandFiles) {
    const commandFilePath = path.join(commandSubFolderPath, file);
    const command = require(commandFilePath);
    const basic: command = command.basic;
    const slash: slashCmd = command.slash;
    client.commands.set(basic.name, basic);
    if (slash) {
      client.slashCommands.set(slash.data.name, slash);
    }
  }
}

// register events
const eventFolderPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventFolderPath)
  .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));
for (const file of eventFiles) {
  const eventFilePath = path.join(eventFolderPath, file);
  const event: event = require(eventFilePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(client, ...args));
  } else {
    client.on(event.name, (...args) => event.execute(client, ...args));
  }
}

/**
 * END CREATING BOT CLIENT
 */

/**
 * START CREATING PLAYER CLIENT
 */
// create an instance of music player by passing in discord client and attach to bot client
client.player = new Player(client, {
  leaveOnEmpty: true,
  leaveOnEnd: false,
  leaveOnStop: false,
  quality: "high",
  timeout: 300,
});

// register events
const musicEventFolderPath = path.join(__dirname, "music_events");
const musicEventFiles = fs
  .readdirSync(musicEventFolderPath)
  .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));
for (const file of musicEventFiles) {
  const musicEventFilePath = path.join(musicEventFolderPath, file);
  const event: playerEvent = require(musicEventFilePath);
  client.player?.on(event.name, (...args) => event.execute(client, ...args));
}
/**
 * END CREATING PLAYER CLIENT
 */

/**
 * START CREATING POSTGRES DATABASE CLIENT
 */
// create an instance of database and attach to bot client
client.postgres = new Database(process.env.DATABASE_URL);
/**
 * END CREATING POSTGRES DATABASE CLIENT
 */

// after everything, log in using token
client.login(process.env.DISCORD_TOKEN);