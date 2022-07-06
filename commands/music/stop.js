const { queueCheck } = require("../../utils/music");

module.exports = {
    name: "stop",
    description: "Stop the music and leave the voice channel.",
    aliases: ["s"],
    args: false,
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
            queue.stop();
            message.channel.send("MUSIC STATUS: Music stopped, queue is cleared!");
        } else {
            // the queue doesn't exist
            message.channel.send("WARNING: Queue is empty, can't perform \`stop\`.");
        }
    }
}