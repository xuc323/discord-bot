module.exports = {
    name: "next",
    description: "Skip to the next song.",
    aliases: ["n", "skip"],
    args: false,
    execute(message, args, client) {
        // get queue for the guild id
        const guildQueue = client.player.getQueue(message.guild.id);

        if (guildQueue) {
            // the queue exists
            // retrive the initial message channel from the queue
            const channel = guildQueue.data.msgChannel;
            if (message.channel === channel) {
                // the message is from the same channel the queue was created
                const song = guildQueue.skip();
                if (song) {
                    message.channel.send(`**${song}** is skipped!`);
                } else {
                    message.channel.send("ERROR: Failed to skip a song.");
                }
            } else {
                // the message is not from the same channel the queue was created
                message.channel.send(`The queue was created in another text channel.\nPlease head to channel ${channel} for music commands.`);
            }
        } else {
            // the queue doesn't exist
            message.channel.send("ERROR: Queue is empty, can't perform \`skip/next\`.");
        }
    }
}