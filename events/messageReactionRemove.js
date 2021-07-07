const ruleId = "862098688935067658";
const roleId = "853821008682811392";
const mesId = "862113905387372615";
const check = "👌";

module.exports = {
    name: "messageReactionRemove",
    execute(reaction, user, client) {
        // remove "VIP" role
        if (reaction.message.channel.id === ruleId && reaction._emoji.name === check && reaction.message.id === mesId) {
            const role = reaction.message.channel.guild.roles.cache.get(roleId);
            reaction.message.channel.guild.members.cache.get(user.id).roles.remove(role);
        }
    }
}