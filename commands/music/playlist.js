const { queueCheck } = require("../../utils/music");

module.exports = {
    name: "playlist",
    description: "Play the music in the playlist by url.",
    aliases: ["pl"],
    args: true,
    usage: "[playlist url]",
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
            // add playlist to the queue
            queue.playlist(args.join(" "), {
                requestedBy: message.author,
                shuffle: true
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