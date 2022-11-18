// import discord.js module
import {
  Client,
  GatewayIntentBits,
  Collection,
  ActivityType,
} from "discord.js";
// import file system module
import { readdirSync } from "fs";
// import music player module
import { Player } from "discord-music-player";
// import database module
import Database from "./database";
// dotenv file
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { command, event, MyClient, playerEvent } from "./type";

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
const commandFolders = readdirSync("./commands");
// loop through all folders in commands
for (const folder of commandFolders) {
  const commandFiles = readdirSync(`./commands/${folder}`).filter((file) =>
    file.endsWith(".ts")
  );
  // loop through all .ts files
  for (const file of commandFiles) {
    import(`./commands/${folder}/${file}`).then((e) => {
      const cmd: command = e.default;
      client.commands?.set(cmd.name, cmd);
    });
  }
}

// register events
const eventFiles = readdirSync("./events").filter((file) =>
  file.endsWith(".ts")
);
// loop through all .js files
for (const file of eventFiles) {
  import(`./events/${file}`).then((e) => {
    const event: event = e.default;
    client.on(event.name, (...args) => event.execute(client, ...args));
  });
}

// ready event to fire only once
client.once("ready", () => {
  console.log(`Bot is online! Logged in as ${client.user?.tag}!`);
});
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
const musicEventFiles = readdirSync("./music_events").filter((file) =>
  file.endsWith(".ts")
);
for (const file of musicEventFiles) {
  import(`./music_events/${file}`).then((e) => {
    const event: playerEvent = e.default;
    client.player?.on(event.name, (...args) => event.execute(client, ...args));
  });
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
