const { queueCheck } = require("../../utils/music");

module.exports = {
    name: "play",
    description: "Play the music by name or url.",
    aliases: ["p"],
    args: true,
    usage: "[song name or url]",
    category: "music",
    execute(message, args, client) {

        let queue; // the queue instance might be undefined
        try {
            queue = queueCheck(message, client);
        } catch (err) {
            return message.channel.send(err.message);
        }

        if (!queue) {
            // if queue doesn't exist, create one
            queue = client.player.createQueue(message.guild.id, {
                data: {
                    msgChannel: message.channel
                }
            });
        }

        queue.join(message.member.voice.channel).then(() => {
            // add music to the queue
            queue.play(args.join(" "), {
                requestedBy: message.author
            }).catch((err) => {
                console.log(`MUSIC PLAY ERROR: ${err.stack}`);
                message.channel.send(err.message);
            });
        }).catch((err) => {
            console.log(`MUSIC JOIN ERROR: ${err.stack}`);
            message.channel.send(err.message);
        });
    }
}