const Discord = require('discord.js')
module.exports = {
    name: 'pi-ware',
    async execute(client, message, args) {
        let embed = new Discord.MessageEmbed()
        .setTitle('Pi-Ware')
        .setDescription('Pi-Ware A Raspberry Pi App Store')
        .addField('Partner', 'Pi-Ware Is One Of Our Partners')
        .addField('Ad', 'We are the official community for the new Raspberry Pi app store, Pi-Ware! We provide apps that you can’t get using sudo apt-get install in the Terminal. We are always working to make it better.')
        .addField('Join Now', 'https://discord.gg/QFfq4fP9DA')
        message.channel.send(embed)
    }
}
