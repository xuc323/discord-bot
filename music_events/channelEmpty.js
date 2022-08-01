module.exports = {
    name: "channelEmpty",
    execute(queue) {
        queue.data?.msgChannel?.send("Everyone left the Voice Channel, queue ended.");
    }
}