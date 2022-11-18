// import discord.js module
const { Client, Intents, Collection } = require("discord.js");
// import music player
const { Player } = require("discord-music-player");
// import file system module
const { readdirSync } = require("fs");
// dotenv file
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
// postgres database
const Database = require("./database/database.js");

// create an instance of a discord client
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});

// create an instance of music player by passing in discord client
const player = new Player(client);
// client now has player attribute
client.player = player;

// create an instance of postgres database by passing in database url
const database = new Database(process.env.DATABASE_URL);
// client now has postgres attribute
client.database = database;

// MUSIC PLAYER EVENTS
const musicEventFiles = readdirSync("./music_events").filter((file) => file.endsWith(".js"));
for (const file of musicEventFiles) {
    const event = require(`./music_events/${file}`);
    client.player.on(event.name, (...args) => event.execute(...args, client));
}

// COMMANDS
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

// EVENTS
const eventFiles = readdirSync("./events").filter((file) => file.endsWith(".js"));
// loop through all .js files
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
}

client.once('ready', () => {
    console.log(`Bot is online! Logged in as ${client.user.tag}!`);
});

// log in using token
client.login(process.env.DISCORD_TOKEN);