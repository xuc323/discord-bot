module.exports = {
    name: "error",
    execute(error, queue) {
        queue.data?.msgChannel?.send(`ERROR: ${error}`);
        console.log(`[${queue.guild.name} | ${queue.guild.id}]: MUSIC EVENT ERROR: ${error}`);
    }
}