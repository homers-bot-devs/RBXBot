const db = require("quick.db");
const config = require("./../config.js");
module.exports = {
    name: 'blacklist',
    description: 'Block People Using Bot',
    usage: 'blacklist',
    async execute(client, message, args) {
  if(message.author.id === config.owner) {
    let user = await client.users.fetch(args[0]);
    if(!user) return message.channel.send(`Invalid user or id ._.`);
    
    let fetched = db.get(`blacklist_${user.id}`)
    
    if(!fetched) {
      db.set(`blacklist_${user.id}`, true)
      message.channel.send(`Blacklisted!`);
    }else{ 
      return message.channel.send(`This user is already blacklisted!`);
    }
  }else{
    return message.channel.send(`No no`);
  }
}
}