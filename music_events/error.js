module.exports = {
    name: "error",
    execute(error, queue) {
        console.log(`Error: ${error} in ${queue.guild.name}`);
    }
}