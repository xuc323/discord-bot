module.exports = {
    name: "next",
    description: "Skip the next song.",
    aliases: ["n", "skip"],
    args: false,
    execute(message, args, client, guildQueue) {
        const song = guildQueue.skip();
        if (song) {
            message.channel.send(`**${song.name}** is now skipped!`);
        }
    }
}