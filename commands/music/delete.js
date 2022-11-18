const { Message, Client } = require("discord.js");

module.exports = {
    name: "delete",
    description: "Remove the music from the queue.",
    aliases: ["remove", "d"],
    args: true,
    usage: "[music number]",
    category: "music",
    /**
     * delete a song from the queue based on the index
     * @param {Message} message 
     * @param {string[]} args 
     * @param {Client} client 
     * @returns 
     */
    execute(message, args, client) {
        // check if the queue exists
        const queue = client.player.getQueue(message.guild.id);
        if (queue) { // the queue exists
            const num = Number(args[0]);
            if (!num) {
                return message.channel.send("ERROR: The argument can only be a number.");
            }

            if (num < 1) {
                return message.channel.send("ERROR: Song number can only be greater than 1.");
            } else if (num === 1) { //TODO: get to know how splice works
                return message.channel.send("WARNING: Can't remove the song that is currently playing. Use \`skip\` instead.");
            }

            const song = queue.remove(num - 1);
            if (song) {
                message.channel.send(`Song ${song.name} is removed from the queue.`);
            } else {
                message.channel.send(`ERROR: Can't remove the song at index \`${num}\`. Try again later.`);
            }
        } else { // the queue doesn't exist
            message.channel.send(`WARNING: Queue is empty, can't perform \`${this.name}\`.`);
        }
    }
}