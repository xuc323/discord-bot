module.exports = {
    name: "resume",
    description: "Resume the current song.",
    aliases: ["c", "continue"],
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
                const status = guildQueue.setPaused(false);
                if (!status) {
                    message.channel.send("The queue is now resumed!");
                } else {
                    message.channel.send("ERROR: Failed to resume the queue.");
                }
            } else {
                // the message is not from the same channel the queue was created
                message.channel.send(`The queue was created in another text channel.\nPlease head to channel ${channel} for music commands.`);
            }
        } else {
            // the queue doesn't exist
            message.channel.send("ERROR: Queue is empty, can't perform \`resume/continue\`.");
        }
    }
}