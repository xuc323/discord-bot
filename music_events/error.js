module.exports = {
    name: "error",
    execute(error, queue) {
        console.log(`[${queue.guild.name} | ${queue.guild.id}]: Error: ${error}`);
    }
}