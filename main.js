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

// create an event listener for messages
client.on("message", function (message) {
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

/*
bot invitation link:
https://discord.com/oauth2/authorize?client_id=853751983683928114&scope=bot+applications.commands
*/