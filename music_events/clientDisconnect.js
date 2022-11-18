module.exports = {
    name: "clientDisconnect",
    execute(queue) {
        console.log(`I was kicked from the Voice Channel, queue ended.`);
    }
}