module.exports = {
    name: "reconnecting",
    once: true,
    execute(client) {
        console.log(`Reconnecting bot ${client.user.tag}`);
    }
}