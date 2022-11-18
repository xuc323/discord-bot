const { Message, Client } = require("discord.js");
const { RepeatMode } = require("discord-music-player");

module.exports = {
    name: "repeat",
    description: "Repeat the current song.",
    aliases: ["r"],
    args: false,
    category: "music",
    /**
     * repeat the current song
     * @param {Message} message 
     * @param {string[]} args 
     * @param {Client} client 
     * @returns 
     */
    execute(message, args, client) {
        // check if the queue exists
        const queue = client.player.getQueue(message.guild.id);
        if (queue) { // the queue exists
            if (queue.connection.channel != message.member.voice.channel) {
                // the user is not in the same voice channel as the bot
                return message.channel.send(`Music is playing in ${queue.connection.channel}. Join or wait for it to finish.`);
            }
            // the user is in the same voice channel as the bot
            const status = queue.setRepeatMode(RepeatMode.SONG); // set repeat mode to SONG
            if (status) {
                message.channel.send("MUSIC STATUS: Now repeating the current song!");
            } else {
                message.channel.send("ERROR: Failed to repeat the current song. Try again later.");
            }
        } else { // the queue doesn't exist
            message.channel.send(`WARNING: Queue is empty, can't perform \`${this.name}\`.`);
        }
    }
}