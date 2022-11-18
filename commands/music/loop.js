const { RepeatMode } = require("discord-music-player");
const { queueCheck } = require("../../utils/music");

module.exports = {
    name: "loop",
    description: "Loop the queue.",
    aliases: ["l"],
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
            const status = queue.setRepeatMode(RepeatMode.QUEUE); // set repeat mode to QUEUE
            if (status) {
                message.channel.send("MUSIC STATUS: Now looping the queue!");
            } else {
                message.channel.send("ERROR: Failed to set loop. Try again later.");
            }
        } else {
            // the queue doesn't exist
            message.channel.send("WARNING: Queue is empty, can't perform \`loop\`.");
        }
    }
}