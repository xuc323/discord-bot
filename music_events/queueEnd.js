module.exports = {
    name: "queueEnd",
    execute(queue) {
        queue.data?.msgChannel?.send("The queue has ended.");
    }
}