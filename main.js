// import discord.js module
const Discord = require("discord.js");
// create an instance of a discord client
const client = new Discord.Client();
// file system module
const fs = require("fs");
// dotenv file
require("dotenv").config({ path: ".env" });
const prefix = process.env.PREFIX;

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

client.once("ready", () => console.log("Bot is online!"));

// create an event listener for new guild members
client.on("guildMemberAdd", (mem) => {
    // assign new members as "member" role
    const role = mem.guild.roles.cache.find((ro) => ro.name === "member");
    mem.roles.add(role);
    // send the message to "welcome" channel
    mem.guild.channels.cache.find((ch) => ch.name === "welcome").send(`Welcome ${mem}, now you have the member role of this server!`);
});

// create an event listener for messages
client.on("message", (message) => {
    // bot will not respond to message without prefix "!" or message from itself
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }
    // if commands are sent through dm
    if (!message.guild) {
        return message.channel.send("Commands can only be executed in one of the channels.");
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    // if unknown command
    if (!command) {
        return message.reply(`Unknown command: \`${message.content}\`. Type \`${prefix}help\` for more information.`);
    }

    // if command needs argument but there's none
    if (command.args && !args.length) {
        let reply = message.reply("You did not provide any arguments.");
        if (command.usage) {
            reply += `\nThe proper usage is: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.reply(reply);
    }

    // execute command
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("There was an error trying to execute that command..");
    }
});

// log in using token
client.login(process.env.DISCORD_TOKEN);