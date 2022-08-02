const { Message, Client } = require("discord.js");

module.exports = {
    name: "volume",
    description: "Display or adjust the volume of the music.",
    aliases: ["v"],
    args: false,
    usage: "[volume number]",
    category: "music",
    /**
     * display or adjust the volume of the music
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
            const vol = args[0] && Number(args[0]);
            if (vol) {
                const status = queue.setVolume(vol);
                if (status) {
                    message.channel.send(`MUSIC STATUS: Volume set to ${vol}%.`);
                } else {
                    message.channel.send("ERROR: Failed to set volume. Try again later.");
                }
            } else {
                message.channel.send(`MUSIC STATUS: Volume at ${queue.volume}%.`);
            }
        } else { // the queue doesn't exist
            message.channel.send(`WARNING: Queue is empty, can't perform \`${this.name}\`.`);
        }
    }
}