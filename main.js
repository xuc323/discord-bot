// import discord.js module
const Discord = require("discord.js");
// create an instance of a discord client
const client = new Discord.Client();
// file system module
const fs = require("fs");
const prefix = "-";

// dotenv file
require("dotenv").config({ path: ".env" });

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once("ready", function () {
    console.log("Bot is online!");
});

// create an event listener for new guild members
client.on("guildMemberAdd", function (mem) {
    // assign new members as "member" role
    const role = mem.guild.roles.cache.find(ro => ro.name === "member");
    mem.roles.add(role);
    // send the message to "welcome" channel
    mem.guild.channels.cache.find(ch => ch.name === "welcome").send(`Welcome ${mem}, now you have the member role of this server!`);
});

// create an event listener for messages
client.on("message", function (message) {
    // bot will not respond to message without prefix "-" or message from itself
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) {
        message.reply("Unknown command: " + message.content + ". Type `-help` for more information.");
        return;
    }

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("There was an error trying to execute that command..");
    }
});

// log in using token
client.login(process.env.DISCORD_TOKEN);