module.exports = {
    name: "queueEnd",
    execute(queue) {
        console.log(`[${queue.guild.name} | ${queue.guild.id}]: The queue has ended.`);
    }
}