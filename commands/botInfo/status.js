module.exports = {
    name: "status",
    description: "Set the status of the bot",
    args: true,
    usage: "[status]",
    execute(message, args, client) {
        client.user.setPresence({
            activity: {
                name: args.join(" "),
                type: "LISTENING"
            }
        });
    }
}