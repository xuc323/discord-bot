module.exports = {
    name: "guildMemberAdd",
    execute(mem) {
        // assign new members as "member" role
        const role = mem.guild.roles.cache.get("853821008682811392");
        mem.roles.add(role);
        // send the message to "welcome" channel
        mem.guild.channels.cache.get("853793532627648512").send(`Welcome ${mem}, now you have the \`${role.name}\` role of this server!`);
    }
}