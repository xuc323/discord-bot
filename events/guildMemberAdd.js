module.exports = {
    name: "guildMemberAdd",
    execute(member) {
        // assign new members as "member" role
        const role = member.guild.roles.cache.get("853821008682811392");
        member.roles.add(role);
        // send the message to "welcome" channel
        member.guild.channels.cache.get("853793532627648512").send(`Welcome ${member}, now you have the \`${role.name}\` role of this server!`);
    }
}