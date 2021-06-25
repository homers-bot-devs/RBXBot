const Discord = require('discord.js')
module.exports = {
    name: 'poll',
    async execute(client, message, args) {
        let pollChannel = message.mentions.channels.first();
        let pollDescription = args.join(' ');

        let embedPoll = new Discord.MessageEmbed()
        .setTitle('😲 New Poll! 😲')
        .setDescription(pollDescription)
        .setColor('YELLOW')
        let msgEmbed = await message.channel.send(embedPoll);
        await msgEmbed.react('👍')
        await msgEmbed.react('👎')
    }
}
