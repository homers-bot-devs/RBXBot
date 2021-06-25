const Discord = require("discord.js");
module.exports = {
    name: 'help',
    description: "Help On Bot!",
    execute(message, args, client) {
       const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Help")
        .setImage(message.guild.iconURL)
        .setDescription(`The Bot's Help Economy Message`)
        .addField('💸 Economy', 'Disabled Till Further Notice')
        .addField("🌠 Fun", 'Say, 8Ball, Ascii, Meme, WB, RPS, Embed, Achievement, Snake')
        .addField("🎀 General", 'Invite, Serverinfo, Info, Avatar, Ping, Support, Poll, Translate')
        .addField("🤖 ChatBot", 'cb')
        .addField('✔️ Partners', 'MagCPI, Pi-Ware')
        .addField("🎫 Ticket", 't-role, ticket, close')
        .addField("🎶 Music", 'join, leave, play, stop')
        .addField("🎉 Giveaway", 'start-giveaway, end, reroll')
        .addField("🛠️ Admin", 'Give-Role, Delemoji, Addemoji, Mute, Unmute, Ban, Kick')
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        message.channel.send(embed)
    }
}
