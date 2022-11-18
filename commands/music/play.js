const ytdl = require("ytdl-core");

module.exports = {
    name: "play",
    description: "Play the music from Youtube link",
    aliases: ["p"],
    args: true,
    usage: "[url]",
    execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply("Seems that you are not in one of the voice channels. Join one and try again!");
        }

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            return message.reply("I need the permissions to join and speak in your current voice channel.");
        }
        
        voiceChannel.join().then((connection => {
            ytdl.getInfo(args).then((info) => {
                message.channel.send(`Song found: ${info.videoDetails.title} at ${info.videoDetails.video_url}`);
            });
            const stream = ytdl(args, { filter: "audioonly" });
            const dispatcher = connection.play(stream);
            dispatcher.on("finish", () => voiceChannel.leave());
        }));

    }
}