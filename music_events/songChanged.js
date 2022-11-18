module.exports = {
    name: "songChanged",
    execute(queue, newSong, oldSong) {
        // retrive the initial message channel from the queue
        const channel = queue.data.msgChannel;
        channel.send(`**${newSong}** is now playing.`);
    }
}