const { Message, Client } = require("discord.js");

module.exports = {
    name: "next",
    description: "Skip to the next song.",
    aliases: ["n", "skip"],
    args: false,
    category: "music",
    /**
     * skip the current song
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
            const song = queue.skip();
            if (song) {
                message.channel.send(`MUSIC STATUS: **${song}** is skipped!`);
            } else {
                message.channel.send("ERROR: Failed to skip a song. Try again later.");
            }
        } else { // the queue doesn't exist
            message.channel.send(`WARNING: Queue is empty, can't perform \`${this.name}\`.`);
        }
    }
}