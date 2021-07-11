module.exports = {
    name: "resume",
    description: "Resume the current song.",
    aliases: ["r"],
    args: false,
    execute(message, args, client) {
        const song = client.player.resume(message);
        if (song) {
            message.channel.send(`**${song.name}** was skipped!`);
        }
    }
}