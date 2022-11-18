// import discord.js module
const Discord = require("discord.js");
// create an instance of a discord client
const client = new Discord.Client();
// file system module
const fs = require("fs");
// dotenv file
require("dotenv").config({ path: ".env" });
// const prefix = process.env.PREFIX;

// finding events
const eventFiles = fs.readdirSync("./events").filter((file) => file.endsWith(".js"));
// loop through all .js files
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    // if event only happens once
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// finding commands
client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync("./commands");
// loop through all folders in commands
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    // loop through all .js files
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

// log in using token
client.login(process.env.DISCORD_TOKEN);