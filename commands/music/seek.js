const { queueCheck } = require("../../utils/music");

module.exports = {
    name: "seek",
    description: "Fast forward the song.",
    args: true,
    aliases: ["fastforward", "ff"],
    usage: "[time in seconds]",
    execute(message, args, client) {

        let queue; // the queue instance might be undefined
        try {
            queue = queueCheck(message, client);
        } catch (err) {
            return message.channel.send(err.message);
        }

        if (queue) {
            // the queue exists
            const time = parseInt(args[0]);
            const status = queue.seek(time * 1000);
            if (status) {
                message.channel.send(`MUSIC STATUS: Fast forwarded ${time} seconds.`);
            } else {
                message.channel.send("ERROR: Failed to fast forward. Try again later.");
            }
        } else {
            // the queue doesn't exist
            message.channel.send("WARNING: Queue is empty, can't perform \`seek/fastforward\`.");
        }
    }
}