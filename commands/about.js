const Discord = require("discord.js");
const config = require('../config.js');
const moment = require("moment");
module.exports = {
    name: 'about',
    description: "about bot",
    async execute(message, args, client) {
       const duration = moment.duration(message.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("About Bot")
        .setDescription(`About Me`)
        .addField(`${config.prefix}`, `My Prefix Is ${config.prefix} Use -help For Commands`)
        .addField("`⌚️` Uptime ", `${duration}`, true)
        .addField('Devs', 'HomersRebuttal#9018 RaspberryRBX#9446, oxmc#7769')  
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        .addField('The Team', 'RBXBot Is Apart Of A Team Called Homers-Bot-Devs And This Team Has Manufactured A Few Bots Already')
        .addField('Version', 'RBXBot Version Is 3')
message.channel.send(embed)
    }
}
