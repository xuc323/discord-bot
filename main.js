// import discord.js module
const { Client, Intents, Collection } = require("discord.js");
// import file system module
const { readdirSync } = require("fs");
// import music player module
const { Player } = require("./music_player/player");
// import database module
const Database = require("./utils/database");
// dotenv file
require("dotenv").config({ path: ".env" });

// create an instance of a discord client
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});

// create an instance of music player by passing in discord client
const player = Player(client);
// client now has player attribute
client.player = player;

// // create an instance of database
// const db = new Database(process.env.DATABASE_URL);
// // client now has database attribute
// client.postgres = db;

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

// ready event to fire only once
client.once('ready', () => {
    console.log(`Bot is online! Logged in as ${client.user.tag}!`);
});
client.once('guildCreate', (guild) => {
    guild.systemChannel.send("Thanks for inviting me to your server!\nCommands start with `!`. Type `!help` for more information.");
});

// log in using token
client.login(process.env.DISCORD_TOKEN).then(() => {
    client.user.setActivity("| !help for help", { type: "WATCHING" });
});
