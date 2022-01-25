module.exports = {
    name: "status",
    description: "Set the activity of the bot.",
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
            // default type is PLAYING
            client.user.setActivity(args.join(" "));
        } else {
            // set the activity with the indicated type
            args.shift();
            client.user.setActivity(args.join(" "), { type: type });
        }
    }
}