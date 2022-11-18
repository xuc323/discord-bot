module.exports = {
    name: "songAdd",
    execute(queue, song) {
        console.log(`Song ${song} was added to the queue.`);
    }
}