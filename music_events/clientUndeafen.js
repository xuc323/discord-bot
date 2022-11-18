module.exports = {
    name: "clientUndeafen",
    execute(queue) {
        // retrive the initial message channel from the queue
        const channel = queue.data.msgChannel;
        channel.send("I got undefeanded.");
    }
}