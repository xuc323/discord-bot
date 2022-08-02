const { Message, Client } = require("discord.js");
const { RepeatMode } = require("discord-music-player");

module.exports = {
    name: "loop",
    description: "Loop the queue.",
    aliases: ["l"],
    args: false,
    category: "music",
    /**
     * loop the queue
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
            const status = queue.setRepeatMode(RepeatMode.QUEUE); // set repeat mode to QUEUE
            if (status) {
                message.channel.send("MUSIC STATUS: Now looping the queue!");
            } else {
                message.channel.send("ERROR: Failed to set to loop mode. Try again later.");
            }
        } else { // the queue doesn't exist
            message.channel.send(`WARNING: Queue is empty, can't perform \`${this.name}\`.`);
        }
    }
}