const Discord = require("discord.js");
const disbut = require('discord-buttons');
module.exports = {
    name: 'support',
    description: "support for bot",
    execute(message, args, client) {
       const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Support")
        .setDescription(`The Bot's Support`)
        .addField('Support Discord', 'Use Buttons Below For Support')
       .addField('Support Email', 'homers-bot-devs@protonmail.com')
        const button = new disbut.MessageButton()
  .setStyle('url')
  .setURL('https://discord.gg/hENqswuajP') 
  .setLabel('Discord') 
  const button2 = new disbut.MessageButton()
  .setStyle('url')
  .setURL('https://www.homersbotdev.tk') 
  .setLabel('Site') 
  const button3 = new disbut.MessageButton()
  .setStyle('url')
  .setURL('https://www.homersbotdev.tk/support.html') 
  .setLabel('Support Page') 

  let row = new disbut.MessageActionRow()
        .addComponent(button)
        .addComponent(button2);
  let row2 = new disbut.MessageActionRow()
  .addComponent(button3);
message.channel.send("", { embed: embed, components: [row, row2] })
    }
}
