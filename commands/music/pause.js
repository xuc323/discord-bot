module.exports = {
    name: "pause",
    description: "Pause the current song.",
    args: false,
    async execute(message, args, client) {
        const song = await client.player.pause(message);
        if (song) {
            message.channel.send(`**${song.name}** was paused!`);
        }
    }
}