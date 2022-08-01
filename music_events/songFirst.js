module.exports = {
    name: "songFirst",
    execute(queue, song) {
        queue.data?.msgChannel?.send(`Started playing **${song}**.`);
    }
}