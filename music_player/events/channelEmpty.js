module.exports = {
    name: "channelEmpty",
    execute(queue) {
        // retrive the initial message channel from the queue
        const channel = queue.data.msgChannel;
        channel.send("Everyone left the Voice Channel, queue ended.");
    }
}