const { Message, Client } = require("discord.js");

module.exports = {
    name: "seek",
    description: "Fast forward the song.",
    args: true,
    aliases: ["fastforward", "ff"],
    usage: "[time in seconds]",
    category: "music",
    /**
     * fast forward the song
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
            const time = Number(args[0]);
            const status = queue.seek(time * 1000);
            if (status) {
                message.channel.send(`MUSIC STATUS: Fast forwarded ${time} seconds.`);
            } else {
                message.channel.send("ERROR: Failed to fast forward. Try again later.");
            }
        } else { // the queue doesn't exist
            message.channel.send(`WARNING: Queue is empty, can't perform \`${this.name}\`.`);
        }
    }
}