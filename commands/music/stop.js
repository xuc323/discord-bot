module.exports = {
    name: "stop",
    description: "Stop the music and leave the voice channel",
    aliases: ["s"],
    args: false,
    execute(message, args) {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
        } else {
            voiceChannel.leave();
        }
    }
}