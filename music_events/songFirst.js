module.exports = {
    name: "songFirst",
    execute(queue, song, client) {
        // retrive the initial message channel from the queue
        const channel = queue.data.msgChannel;
        channel.send(`Started playing **${song}**.`);
    }
}