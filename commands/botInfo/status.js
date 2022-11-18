module.exports = {
    name: "status",
    description: "Set the status of the bot",
    args: true,
    usage: "[status number] [status]",
    execute(message, args, client) {
        let type;
        switch (args[0]) {
            case "1":
                type = "PLAYING";
                break;
            case "2":
                type = "STREAMING";
                break;
            case "3":
                type = "LISTENING";
                break;
            case "4":
                type = "WATCHING";
                break;
            case "5":
                type = "COMPETING";
                break;
            default:
                break;
        }

        if (type === undefined) {
            type = "PLAYING";
        } else {
            args.shift();
        }

        client.user.setPresence({
            activity: {
                name: args.join(" "),
                type: type
            }
        });
    }
}