module.exports = {
    name: "disconnect",
    once: true,
    execute(client) {
        console.log(`Disconnect bot ${client.user.tag}`);
    }
}