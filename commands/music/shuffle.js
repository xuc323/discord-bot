const { queueCheck } = require("../../utils/music");

module.exports = {
    name: "shuffle",
    description: "Shuffle the queue.",
    aliases: ["shuf"],
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
            queue.shuffle();
            message.channel.send("MUSIC STATUS: Queue is now shuffled!");
        } else {
            // the queue doesn't exist
            message.channel.send("WARNING: Queue is empty, can't perform \`shuffle\`.");
        }
    }
}