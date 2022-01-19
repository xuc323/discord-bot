module.exports = {
    name: "progress",
    description: "Create a progress bar for the current song.",
    aliases: ["prog"],
    args: false,
    execute(message, args, client, guildQueue) {
        if (guildQueue) {
            // the queue exists
            // retrive the initial message channel from the queue
            const channel = guildQueue.data.msgChannel;
            if (message.channel === channel) {
                // the message if from the same channel the queue was created
                const bar = guildQueue.createProgressBar();
                if (bar) {
                    message.channel.send(bar.prettier);
                } else {
                    message.channel.send("ERROR: Failed to create progress bar.");
                }
            } else {
                // the message is not from the same channel the queue was created
                message.channel.send(`The queue was created in another text channel.\nPlease head to channel ${channel} for music commands.`);
            }
        } else {
            // the queue doesn't exist
            message.channel.send("ERROR: Queue is empty, can't perform \`progress\`.");
        }
    }
}