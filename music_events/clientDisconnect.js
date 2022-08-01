module.exports = {
    name: "clientDisconnect",
    execute(queue) {
        queue.data?.msgChannel?.send("I was kicked from the Voice Channel, queue ended.");
    }
}