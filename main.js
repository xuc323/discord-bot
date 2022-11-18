// import discord.js module
const { Client, Intents, Collection } = require("discord.js");
// file system module
const { readdirSync } = require("fs");

// dotenv file
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

// create an instance of a discord client
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});

// music player
const { Player } = require("discord-music-player");
const player = new Player(client, {
    leaveOnEnd: true,
    leaveOnStop: false,
    leaveOnEmpty: true,
    deafenOnJoin: false,
    timeout: 5000,
    volume: 100,
    quality: 'high'
});

// client now has player attribute
client.player = player;

// music player events
const musicEventFiles = readdirSync("./music_events").filter((file) => file.endsWith(".js"));
for (const file of musicEventFiles) {
    const event = require(`./music_events/${file}`);
    client.player.on(event.name, (...args) => event.execute(...args));
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
// finding events
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