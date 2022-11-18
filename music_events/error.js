module.exports = {
    name: "error",
    execute(error, queue, client) {
        // retrive the initial message channel from the queue
        const channel = queue.data.msgChannel;
        channel.send(`ERROR: ${error.message}.`);
        console.log(`[${queue.guild.name} | ${queue.guild.id}]: MUSIC EVENT ERROR: ${error.stack}`);
    }
}