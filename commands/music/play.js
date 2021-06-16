const ytdl = require("ytdl-core");

module.exports = {
    name: "play",
    description: "List all commands or info about a specific command.",
    aliases: ["p"],
    args: true,
    usage: "[url]",
    execute(message, args) {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
            message.reply("Seems that you are not in any voice channel. Join one and try again!");
        } else {
            voiceChannel.join().then((connection => {
                const stream = ytdl(args, { filter: "audioonly" });
                const dispatcher = connection.play(stream);
                dispatcher.on("finish", () => voiceChannel.leave());
            }));
        }
    }
}