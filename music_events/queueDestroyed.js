module.exports = {
    name: "queueDestroyed",
    execute(queue) {
        console.log(`[${queue.guild.name} | ${queue.guild.id}]: The queue was destroyed.`);
    }
}