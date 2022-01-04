module.exports = {
    name: "resume",
    description: "Resume the current song.",
    aliases: ["r"],
    args: false,
    execute(message, args, client, guildQueue) {
        if (guildQueue) {
            const status = guildQueue.setPaused(false);
            if (!status) {
                message.channel.send("The queue is now resumed!");
            } else {
                message.channel.send("ERROR: Failed to resume the queue.");
            }
        } else {
            message.channel.send("ERROR: Queue is empty, can't perform \`resume\`.");
        }
    }
}