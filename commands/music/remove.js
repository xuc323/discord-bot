module.exports = {
    name: "remove",
    description: "Remove the music from the queue.",
    aliases: ["delete", "d"],
    args: true,
    usage: "[music number]",
    execute(message, args, client) {
        // get queue for the guild id
        const guildQueue = client.player.getQueue(message.guild.id);

        if (guildQueue) {
            // the queue exists
            // retrive the initial message channel from the queue
            const channel = guildQueue.data.msgChannel;
            if (message.channel === channel) {
                // the message is from the same channel the queue was created
                if (isNaN(args[0])) {
                    return message.channel.send("ERROR: The argument can only be number.");
                }

                const num = parseInt(args[0]);
                if (num < 1) {
                    return message.channel.send("ERROR: Song number can only be greater than 1.");
                } else if (num === 1) {
                    return message.channel.send("Can't remove the song that is currently playing. Use \`skip\` instead.");
                }

                const song = guildQueue.remove(num - 1);
                if (song) {
                    message.channel.send(`Song ${song.name} is removed from the queue.`);
                } else {
                    message.channel.send(`ERROR: Can't remove the song at index \`${num}\``);
                }
            } else {
                // the message is not from the same channel the queue was created
                message.channel.send(`The queue was created in another text channel.\nPlease head to channel ${channel} for music commands.`);
            }
        } else {
            // the queue doesn't exist
            message.channel.send("ERROR: Queue is empty, can't perform \`delete/remove\`.");
        }
    }
}