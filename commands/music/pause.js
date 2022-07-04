const { queueCheck } = require("../../utils/music");

module.exports = {
    name: "pause",
    description: "Pause the queue.",
    args: false,
    execute(message, args, client) {

        let queue; // the queue instance might be undefined
        try {
            queue = queueCheck(message, client);
        } catch (err) {
            return message.channel.send(err.message);
        }

        if (queue) {
            // the queue exists
            const status = queue.setPaused(true);
            if (status) {
                message.channel.send("MUSIC STATUS: The queue is now paused!");
            } else {
                message.channel.send("ERROR: Failed to pause the queue. Try again later.");
            }
        } else {
            // the queue doesn't exist
            message.channel.send("WARNING: Queue is empty, can't perform \`pause\`.");
        }
    }
}