const Discord = require("discord.js");
module.exports = {
    name: 'clear',
    description: "Clear Messages!",
    async execute(message, args, client) {
                if (!message.member.hasPermission('ADMINISTARTOR')) return message.channel.send(`You do not have Administartor permission`).then(m => m.delete({ timeout: 5000 }));
        if (!args[0]) return message.reply("Please Enter A Amount Of Messages")
        if (isNaN(args[0])) return message.reply("Please Enter A Real Number")
        if (args[0] > 100) return message.reply("You Cant Delete More Then 100 Messages!")
        if (args[0] < 1) return message.reply("You Cant Not Do Any Number Less Then 1!")
        
        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages)
        });
    }
}
