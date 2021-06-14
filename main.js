// import discord.js module
const Discord = require("discord.js");
// create an instance of a discord client
const client = new Discord.Client();
const prefix = "-";

// dotenv file
require("dotenv").config({ path: ".env" });

client.on("ready", function () {
    console.log("Bot is online!");
});

// create an event listener for new guild members
client.on("guildMemberAdd", function (mem) {
    // assign new members as "member" role
    const role = mem.guild.roles.cache.find(role => role.name === "member");
    mem.roles.add(role);
    // send the message to "welcome" channel
    mem.guild.channels.cache.find(ch => ch.name === "welcome").send(`Welcome ${mem}, your are now the member of this server!`);
});

// create an event listener for messages
client.on("message", function (message) {
    // bot will not respond to message without prefix "-" or message from itself
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }
    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    if (command == "ping") {
        message.reply("pong!");
    } else {
        message.reply("Unknown command: " + message.content);
    }
});

// log in using token
client.login(process.env.DISCORD_TOKEN);