const Discord = require('discord.js');

module.exports = {
    name: "achievement",
    description: "MC Achievement",
    async run (client, message, args) {
      let text = args.join(" ");
      const jimp = require('jimp');
      let font = await jimp.loadFont(jimp.FONT_SANS_32_WHITE) // there is WHITE too
      let theimage = await jimp.read('https://mcgen.herokuapp.com/a.php?i=3&h=Achievement+Get%21&t=') // Load the Main Image
      theimage.print(font, 57, 25, `${text}`) // Place Text on the Image and Position it
      theimage.write('achivement.png') // Output the Image
      message.channel.send(``, { files: ["./achivement.png"] })
    }
}
