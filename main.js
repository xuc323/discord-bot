// import discord.js module
const { Client, GatewayIntentBits, Collection, ActivityType } = require("discord.js");
// import file system module
const { readdirSync } = require("fs");
// import music player module
const { Player } = require("discord-music-player");
// import database module
const Database = require("./database");
// dotenv file
require("dotenv").config({ path: ".env" });

/**
 * START CREATING BOT CLIENT
 */
// create an instance of a discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ],
    presence: {
        activities: [
            { name: "| !help for help", type: ActivityType.Watching }
        ],
        status: "online"
    }
});

// register commands
client.commands = new Collection();
const commandFolders = readdirSync("./commands");
// loop through all folders in commands
for (const folder of commandFolders) {
    const commandFiles = readdirSync(`./commands/${folder}`).filter((file) => file.endsWith(".js"));
    // loop through all .js files
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

// register events
const eventFiles = readdirSync("./events").filter((file) => file.endsWith(".js"));
// loop through all .js files
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
}

// ready event to fire only once
client.once('ready', () => {
    console.log(`Bot is online! Logged in as ${client.user.tag}!`);
});
/**
 *  END CREATING BOT CLIENT
 */

/**
 * START CREATING PLAYER CLIENT
 */
// create an instance of music player by passing in discord client and attach to bot client
client.player = new Player(client);

// register events
const musicEventFiles = readdirSync("./music_events").filter((file) => file.endsWith(".js"));
for (const file of musicEventFiles) {
    const event = require(`./music_events/${file}`);
    client.player.on(event.name, (...args) => event.execute(...args, client));
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
