module.exports = {
    name: "clientDisconnect",
    execute(queue, client) {
        // retrive the initial message channel from the queue
        const channel = queue.data.msgChannel;
        channel.send("I was kicked from the Voice Channel, queue ended.");
    }
}