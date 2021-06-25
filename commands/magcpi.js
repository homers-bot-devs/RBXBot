const Discord = require('discord.js')
module.exports = {
    name: 'magcpi',
    async execute(client, message, args) {
        let embed = new Discord.MessageEmbed()
        .setTitle('MagCPI')
        .addField('Partner', 'MagCPI Is One Of Our Partners')
        .addField('MagCPI', 'Welcome to MagCPI')
        .addField('Ad', 'MagCPI is a free Minecraft Pi magazine designed for players Inside, you can find scripts, builds, and seeds.')
        message.channel.send(embed)
    
    }
}

