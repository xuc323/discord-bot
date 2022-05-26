module.exports = {
    name: "error",
    execute(error, queue, client) {
        // retrive the initial message channel from the queue
        const channel = queue.data.msgChannel;
        channel.send(`ERROR: \`${error}\`.`);
        console.log(`[${queue.guild.name} | ${queue.guild.id}]: Error: ${error}`);
    }
}