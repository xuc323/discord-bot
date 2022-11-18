module.exports = {
    name: "pause",
    description: "Pause the current song.",
    args: false,
    execute(message, args, client) {
        const song = client.player.pause(message);
        if (song) {
            message.channel.send(`**${song.name}** was paused!`);
        }
    }
}