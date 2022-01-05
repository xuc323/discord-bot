module.exports = {
    name: "queueEnd",
    execute(queue) {
        // retrive the initial message channel from the queue
        const channel = queue.data.msgChannel;
        channel.send("The queue has ended.");
    }
}