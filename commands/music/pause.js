module.exports = {
    name: "pause",
    description: "Pause the queue.",
    args: false,
    execute(message, args, client, guildQueue) {
        if (guildQueue) {
            guildQueue.setPaused(true);
            message.channel.send("The queue is now paused!");
        } else {
            message.channel.send("ERROR: Queue is empty, can't perform \`pause\`.")
        }
    }
}