const ytdl = require("ytdl-core");

module.exports = {
    name: "play",
    description: "Play the music from Youtube link",
    aliases: ["p"],
    args: true,
    usage: "[url]",
    execute(message, args) {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
            message.reply("Seems that you are not in one of the voice channels. Join one and try again!");
        } else {
            voiceChannel.join().then((connection => {
                const stream = ytdl(args, { filter: "audioonly" });
                const dispatcher = connection.play(stream);
                dispatcher.on("finish", () => voiceChannel.leave());
            }));
        }
    }
}