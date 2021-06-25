const Discord = require("discord.js");

module.exports = {
    name: "suggest",
    desciption: "say command",
    async run(client, message, args) {
        const messageToSuggest = args.join(" ");
        const Suggest = new Discord.MessageEmbed()
        .setTitle('Suggestion')
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        .setColor("RANDOM")
        .addField(`Suggestion: ${messageToSuggest}`, `This Was Suggested By ${message.author}`)
        .setTimestamp();
        try {
            await message.channel.send(Suggest).then(sentMessage => sentMessage.react('👍'));
        } catch (err) {
            console.log(err)
            message.channel.send('Suggest Command Didnt Work Pls Alert Owner Of Bot')
        }
        }
    }
