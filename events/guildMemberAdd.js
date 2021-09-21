const channelId = "853793532627648512";
const ruleId = "862098688935067658";

module.exports = {
    name: "guildMemberAdd",
    execute(member, client) {
        // fins the rule channel
        const ruleChannel = member.guild.channels.cache.get(ruleId);
        // send the message to "welcome" channel
        const welcomeChannel = member.guild.channels.cache.get(channelId);
        if (welcomeChannel) {
            // if the welcome channel exists
            welcomeChannel.send(`Welcome ${member}, please check and agree to the ${ruleChannel}`);
        }
    }
}