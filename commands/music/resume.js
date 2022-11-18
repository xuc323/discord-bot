const { Message, Client } = require("discord.js");

module.exports = {
    name: "resume",
    description: "Resume the current song.",
    aliases: ["c", "continue"],
    args: false,
    category: "music",
    /**
     * 
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
            const status = queue.setPaused(false);
            if (!status) {
                message.channel.send("MUSIC STATUS: The queue is now resumed!");
            } else {
                message.channel.send("ERROR: Failed to resume the queue. Try again later.");
            }
        } else { // the queue doesn't exist
            message.channel.send(`WARNING: Queue is empty, can't perform \`${this.name}\`.`);
        }
    }
}