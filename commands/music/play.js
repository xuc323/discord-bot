module.exports = {
    name: "play",
    description: "Play the music by name or url",
    aliases: ["p"],
    args: true,
    usage: "[song name or url]",
    execute(message, args, client, guildQueue) {
        let queue = client.player.createQueue(message.guild.id);
        console.log(queue);
        queue.join(message.member.voice.channel).then(() => {
            queue.play(args.join(" "), { requestedBy: message.author.tag }).then((song) => {
                console.log(song);
            }).catch((err) => {
                console.log(err);
                if (!guildQueue) {
                    queue.stop();
                }
            });
        });
    }
}