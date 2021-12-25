module.exports = {
    name: "pause",
    description: "Pause the current song.",
    args: false,
    execute(message, args, client, guildQueue) {
        guildQueue.setPaused(true);
        message.channel.send("The queue is now paused!");
    }
}