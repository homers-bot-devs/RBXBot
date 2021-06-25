const Discord = require("discord.js");
module.exports = {
    name: 'rules',
    description: "Rules Of Server!",
    execute(message, args, client) {
let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Rules")
        .setImage(message.guild.iconURL)
        .setDescription(`${message.guild}'s information`)
        .addField('1. Follow Discord TOS', 'Follow The TOS')
        .addField("2. No Spamming", 'Please Dont Spam')
        .addField("3. No pinging Admin or higher role more than once", 'Please Follow')
        .addField("4. No Advertising in channels other than 🎈advertising", 'Follow To U Get Warned')
        .addField("5. Don't use all CAPS", 'No One Wants You To Use CAPS')
        .addField("6. No NSFW Content",  "Do This And You Get BANNED")
message.channel.send(embed)
    }
}
