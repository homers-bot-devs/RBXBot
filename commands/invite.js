const Discord = require("discord.js");
module.exports = {
    name: 'invite',
    description: "Invite Bot!",
    execute(message, args, client) {
const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle('Invite Me')
        .setDescription('Invite me To Your Discord Server')
        .addField('My Invite Link', 'dsc.gg/rbxbot')
        message.channel.send(embed)
    }
}
