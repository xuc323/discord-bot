module.exports = {
    name: "resume",
    description: "Resume the current song.",
    aliases: ["r"],
    args: false,
    execute(message, args, client, guildQueue) {
        guildQueue.setPaused(false);
        message.channel.send("The queue is now resumed!");
    }
}