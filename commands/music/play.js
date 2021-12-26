module.exports = {
    name: "play",
    description: "Play the music by name or url",
    aliases: ["p"],
    args: true,
    usage: "[song name or url]",
    execute(message, args, client, guildQueue) {
        const queue = client.player.createQueue(message.guild.id);
        queue.join(message.member.voice.channel).then(() => {
            queue.play(args.join(" "), {
                requestedBy: message.author.tag
            }).then((song) => {
                message.channel.send(`**${song.name}** has been added to the queue. ${song.url}`);
            }).catch(() => {
                if (!guildQueue) {
                    queue.stop();
                }
            });
        });
    }
}