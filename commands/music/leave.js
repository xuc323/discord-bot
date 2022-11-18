const { Message, Client } = require("discord.js");

module.exports = {
    name: "leave",
    description: "Leave the voice channel.",
    aliases: ["disconnect", "dis"],
    args: false,
    category: "music",
    /**
     * disconnect the bot from the voice channel
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
            queue.leave();
            message.channel.send("MUSIC STATUS: Disconnected from the voice channel!");
        } else { // the queue doesn't exist
            message.channel.send(`WARNING: Queue is empty, can't perform \`${this.name}\`.`);
        }
    }
}