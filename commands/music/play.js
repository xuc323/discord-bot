module.exports = {
    name: "play",
    description: "Play the music by name or url",
    aliases: ["p"],
    args: true,
    usage: "[song name or url]",
    execute(message, args, client) {
        client.player.play(message, {
            search: args.join(" "),
            requestedBy: message.author.tag
        }).then((song) => {
            if (song) {
                console.log(`Playing ${song.name}`);
            }
        });
    }
}