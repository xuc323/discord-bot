module.exports = {
    name: "progress",
    description: "Create a progress bar for the current song.",
    aliases: ["prog"],
    args: false,
    execute(message, args, client, guildQueue) {
        if (guildQueue) {
            const bar = guildQueue.createProgressBar();
            if (bar) {
                message.channel.send(bar.prettier);
            }
        } else {
            message.channel.send("ERROR: Queue is empty, can't perform \`progress\`.")
        }
    }
}