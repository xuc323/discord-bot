const { Message, Client } = require("discord.js");

module.exports = {
    name: "shuffle",
    description: "Shuffle the queue.",
    aliases: ["shuf"],
    args: false,
    category: "music",
    /**
     * shuffle the queue
     * @param {Message} message 
     * @param {string[]} args 
     * @param {Client} client 
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
            const songs = queue.shuffle();
            if (songs) {
                message.channel.send("MUSIC STATUS: Queue is now shuffled!");
            } else {
                message.channel.send("ERROR: Failed to shuffle the queue. Try again later.");
            }
        } else { // the queue doesn't exist
            message.channel.send(`WARNING: Queue is empty, can't perform \`${this.name}\`.`);
        }
    }
}