module.exports = {
    name: "status-list",
    description: "Display the list of status the bot can be set to.",
    args: false,
    execute(message, args, client) {
        message.channel.send("Here is the list of status:\n1: PLAYING (default)\n2: STREAMING\n3: LISTENING\n4: WATCHING\n5: COMPETING\nPlease use the number to indicate the status.");
    }
}