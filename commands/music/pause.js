const { Message, Client } = require("discord.js");

module.exports = {
    name: "pause",
    description: "Pause the queue.",
    args: false,
    category: "music",
    /**
     * pause whatever is playing
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
            const status = queue.setPaused(true);
            if (status) {
                message.channel.send("MUSIC STATUS: The queue is now paused!");
            } else {
                message.channel.send("ERROR: Failed to pause the queue. Try again later.");
            }
        } else { // the queue doesn't exist
            message.channel.send(`WARNING: Queue is empty, can't perform \`${this.name}\`.`);
        }
    }
}