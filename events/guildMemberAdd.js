module.exports = {
    name: "guildMemberAdd",
    execute(mem) {
        // assign new members as "member" role
        const role = mem.guild.roles.cache.find((ro) => ro.name === "VIP");
        mem.roles.add(role);
        // send the message to "welcome" channel
        mem.guild.channels.cache.find((ch) => ch.name === "welcome").send(`Welcome ${mem}, now you have the \`VIP\` role of this server!`);
    }
}