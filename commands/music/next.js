module.exports = {
    name: "next",
    description: "Skip the next song.",
    aliases: ["n"],
    args: false,
    execute(message, args, client) {
        const song = client.player.skip(message);
        if (song) {
            message.channel.send(`**${song.name}** was skipped!`);
        }
    }
}