const { Message, Client } = require("discord.js");

module.exports = {
    name: "stop",
    description: "Stop the music and leave the voice channel.",
    aliases: ["s"],
    args: false,
    category: "music",
    /**
     * clear the queue
     * @param {Message} message 
     * @param {string[]} args 
     * @param {Client} client 
     * @returns 
     */
    execute(message, args, client) {
        // check if the queue exists
        const queue = client.player.getQueue(message.guild.id);
        if (queue) {
            // the queue exists
            if (queue.connection.channel != message.member.voice.channel) {
                // the user is not in the same voice channel as the bot
                return message.channel.send(`Music is playing in ${queue.connection.channel}. Join or wait for it to finish.`);
            }
            queue.stop();
            message.channel.send("MUSIC STATUS: Music stopped, queue is cleared!");
        } else {
            // the queue doesn't exist
            message.channel.send(`WARNING: Queue is empty, can't perform \`${this.name}\`.`);
        }
    }
}