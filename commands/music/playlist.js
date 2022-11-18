module.exports = {
    name: "playlist",
    description: "Play the music in the playlist by name or url.",
    args: true,
    usage: "[playlist name or url]",
    execute(message, args, client, guildQueue) {
        const queue = client.player.createQueue(message.guild.id);
        if (message.member.voice.channel) {
            queue.join(message.member.voice.channel).then(() => {
                queue.playlist(args.join(" "), {
                    requestedBy: message.author.tag
                }).then((song) => {
                    // console.log(song);
                    message.channel.send("Playlist has been added to the queue.");
                }).catch(() => {
                    if (!guildQueue) {
                        queue.stop();
                    }
                });
            });
        } else {
            message.channel.send("ERROR: Please join one of the voice channels before playing music.");
        }
    }
}