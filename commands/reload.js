const fs = require('fs')

module.exports = {
    name: 'reload',
    description: 'Reload Commands',
    args: true,
    execute(message, args) {
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases.includes(commandName));
        
        if (!command) return message.channel.send('There is no command with name or alias \`${commandName}\`.')     
        const commandFolders = fs.readdirSync('../commands/');
        const folderName = commandFolders.find(folder => fs.readdirSync(`../commands/${folder}`).includes(`${commandName}.js`))
        delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];
        try {
const newCommand = require(`../${folderName}/${command.name}.js`);;
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`The Command \`${command.name}\` Was Reloaded.`)
        } catch (e) {
console.log(e);
        message.channel.send('Check Console Owner To See The Issue')}
        }  
    }
