module.exports = {
    name: "play",
    description: "Play the music by name or url",
    aliases: ["p"],
    args: true,
    usage: "[song name or url]",
    async execute(message, args, client) {
        const song = await client.player.play(message, {
            search: args.join(" "),
            requestedBy: message.author.tag
        });
        if (song) {
            console.log(`Playing ${song.name}`);
        }
    }
}