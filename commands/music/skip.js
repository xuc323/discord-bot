module.exports = {
    name: "skip",
    description: "Skip the current song.",
    aliases: ["s"],
    args: false,
    execute(message, args, client) {
        const song = client.player.skip(message);
        if (song) {
            message.channel.send(`**${song.name}** was skipped!`);
        }
    }
}