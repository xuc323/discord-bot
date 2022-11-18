module.exports = {
    name: "pause",
    description: "Pause the queue.",
    args: false,
    execute(message, args, client, guildQueue) {
        if (guildQueue) {
            const status = guildQueue.setPaused(true);
            if (status) {
                message.channel.send("The queue is now paused!");
            } else {
                message.channel.send("ERROR: Failed to pause the queue.");
            }
        } else {
            message.channel.send("ERROR: Queue is empty, can't perform \`pause\`.");
        }
    }
}