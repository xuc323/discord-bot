module.exports = {
    name: "next",
    description: "Skip to the next song.",
    aliases: ["n", "skip"],
    args: false,
    execute(message, args, client, guildQueue) {
        if (guildQueue) {
            const song = guildQueue.skip();
            if (song) {
                message.channel.send(`**${song.name}** is skipped!`);
            }
        } else {
            message.channel.send("ERROR: Queue is empty, can't perform \`skip/next\`.")
        }

    }
}