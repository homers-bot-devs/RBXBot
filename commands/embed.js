const Discord = require("discord.js");

module.exports = {
    name: "embed",
    desciption: "say command",
    async run(client, message, args) {
        const messageToSay = args.join(" ");
        const SayEmbed = new Discord.MessageEmbed()
        .setTitle(`${messageToSay}`)
        .setColor("RANDOM")
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        .setImage(message.author.displayAvatarURL)
        .setTimestamp();
        
        try {
            await message.channel.send(SayEmbed)
        } catch (err) {
            console.log(err)
            message.channel.send('Im Not Able To Send Message Pls Alert The Owner')
        }

        }
    }