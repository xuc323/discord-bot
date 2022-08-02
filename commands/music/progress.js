const { Message, Client } = require("discord.js");

module.exports = {
    name: "progress",
    description: "Create a progress bar for the current song.",
    aliases: ["prog"],
    args: false,
    category: "music",
    /**
     * display the progress bar for the current song
     * @param {Message} message 
     * @param {string[]} args 
     * @param {Client} client 
     * @returns 
     */
    execute(message, args, client) {
        // check if the queue exists
        const queue = client.player.getQueue(message.guild.id);
        if (queue) { // the queue exists
            const bar = queue.createProgressBar();
            if (bar) {
                message.channel.send(`${queue.nowPlaying.name}\n${bar.prettier}`);
            } else {
                message.channel.send("ERROR: Failed to create progress bar. Try again later.");
            }
        } else { // the queue doesn't exist
            message.channel.send(`WARNING: Queue is empty, can't perform \`${this.name}\`.`);
        }
    }
}