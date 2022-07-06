const { queueCheck } = require("../../utils/music");

module.exports = {
    name: "volume",
    description: "Display or adjust the volume of the music.",
    aliases: ["v"],
    args: false,
    usage: "[volume number]",
    category: "music",
    execute(message, args, client) {

        let queue; // the queue instance might be undefined
        try {
            queue = queueCheck(message, client);
        } catch (err) {
            return message.channel.send(err.message);
        }

        if (queue) {
            // the queue exists
            if (args[0] && !isNaN(args[0])) {
                const vol = parseInt(args[0]);
                const status = queue.setVolume(vol);
                if (status) {
                    message.channel.send(`MUSIC STATUS: Volume set to ${vol}%.`);
                } else {
                    message.channel.send("ERROR: Failed to set volume. Try again later.");
                }
            } else {
                message.channel.send(`MUSIC STATUS: Volume at ${queue.volume}%.`);
            }
        } else {
            // the queue doesn't exist
            message.channel.send("WARNING: Queue is empty, can't perform \`volume\`.");
        }
    }
}