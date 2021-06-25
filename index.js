const Discord = require("discord.js");

const client = new Discord.Client();

const welcome = require("@oxmc/welcomejs");

const AntiSpam = require('discord-anti-spam');

const talkedRecently = new Set();

const fs = require('fs');
client.commands = new Discord.Collection();

const comamndFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of comamndFiles){
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command);
}

const config = require("./config.js");
client.config = config;

const { MusicBot } = require('discord-music-system'); // Require the best package ever created on NPM (= require discord-music-system)

client.musicBot = new MusicBot(client, {
  prefix: config.prefix,  
  ytApiKey: 'AIzaSyC1gqWkeQFyc4sj2syUw3PRiLLtT2NfE_8',
    language: 'en' // fr, en, es, pt
});

const { DiscordTicket } = require('discord_ticket_maker')
const ticket = new DiscordTicket()

const db = require("quick.db");

const disbut = require('discord-buttons');
disbut(client);

const { GiveawaysManager } = require('discord-giveaways');
// Starts updating currents giveaways
const manager = new GiveawaysManager(client, {
    storage: './giveaways.json',
    updateCountdownEvery: 10000,
    hasGuildMembersIntent: false,
    default: {
        botsCanWin: false,
        exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
        embedColor: '#FF0000',
        embedColorEnd: '#000000',
        reaction: '🎉'
    }
});
// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;

const Chat = require("easy-discord-chatbot");
const chat = new Chat({ name: "RBXBot" });

client.on("message", async message => {
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === 'cb') {
      const say = args.join(" ");

    let reply = await chat.chat(say)
    message.channel.send(reply)
  
}
});

 const ms = require('ms'); 

// Login To The Bot With A Token
client.login(config.token);

antiSpam = new AntiSpam({
	warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
	muteThreshold: 4, // Amount of messages sent in a row that will cause a mute
	kickThreshold: 7, // Amount of messages sent in a row that will cause a kick.
	banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
	maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
	warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
	kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
	muteMessage: '**{user_tag}** has been muted for spamming.',// Message that will be sent in chat upon muting a user.
	banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
	maxDuplicatesWarning: 6, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesMute: 8, // Ammount of duplicate message that trigger a mute.
	ignoredPermissions: [ 'ADMINISTRATOR'], // Bypass users with any of these permissions.
	ignoreBots: false, // Ignore bot messages.
	verbose: true, // Extended Logs from module.
	ignoredMembers: [], // Array of User IDs that get ignored.
	muteRoleName: "Muted", // Name of the role that will be given to muted users!
	removeMessages: true // If the bot should remove all the spam messages when taking action on a user!
	// And many more options... See the documentation.
});

client.on('message', async message => {
  if(message.author.bot) {
      return;
  };
  client.musicBot.onMessage(message);
});

client.on('guildCreate', guild => {
  const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
  let embed = new Discord.MessageEmbed()
  .setTitle('Hello My Fellow People')
  .setDescription('Thank You For Inviting Me To Your Server')
  .addField('Prefix', 'My Prefix Is r-')
  .addField('Need Help', 'If You Need Help With Me Join The Support Discord With The Button')
  .addField('Need  To See Commands', 'Use r-help To See Commands')
  .addField('Enjoy The Bot', 'I Hope You Enjoy RBXBot')
  const button = new disbut.MessageButton()
  .setStyle('url')
  .setURL('https://discord.gg/6kf4H9dYmR') 
  .setLabel('Discord') 
  channel.send(embed)
})

client.on('message', (message) => antiSpam.message(message)); 
//status
const activities_list = [
    `Prefix Is ${config.prefix}| Webiste: www.homersbotdev.tk`,
    `Get Help With ${config.prefix}help | Bot Made By Homers-Bot-Devs`,
    `This Bot Is A Mod And Fun Bot Prefix Is ${config.prefix} | Im Made By Homers-Bot-Devs`
]

client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        client.user.setActivity(activities_list[index]);
    }, 15000);
    console.log('Connected!')
    console.log(`Logged in as ${client.user.tag}!`);
    welcome(client);
}); 

const Auditlog = require("discord-auditlog");
  // will send all event to #audit-logs channel
  // will send movement (join/leave) to #in-out channel if the channel exist
  Auditlog(client);
const prefix = config.prefix;

client.on("message", async message => {
if (message.author.bot) return;
	if(!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
        //Getting the data from the model

    if (command === 'about') {
      client.commands.get('about').execute(message,args,client);
    }
     if (command === 'achievement') {
        client.commands.get('achievement').run(client,message,args);
     }
     if (command === 'ascii') {
      client.commands.get('ascii').execute(message,args);
    }
      if (command === 'addemoji') {
        client.commands.get('addemoji').execute(message,args);
      }

      if(command === "ban") {
                 // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.cache.some(r=>["Admin", "Mod", "Owner", "Staff"].includes(r.name)))
    return message.reply("Sorry, you don't have permissions to use this!");
  
  let member = message.mentions.members.first();
  if(!member)
    return message.reply("Please mention a valid member of this server");
  if(!member.bannable) 
    return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

  let reason = args.slice(1).join(" ");
  if(!reason) reason = "No reason provided";
  
  await member.ban(reason)
    .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
  message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
        }

        if(command === 'calculator') { 
          const { Calculator } = require('weky')
          await Calculator(message)
        }
        if (command === 'clear') {
          client.commands.get('clear').execute(message,args,client);
        }
        if (command === 'close') {
          const args = message.content.slice(6)
          const channel = message.mentions.channels.first() || message.guild.channels.cache.find(c => c.id == args || c.name == args) || message.channel
   
          ticket.closeTicket(message, channel)
      }

        if (command === 'delemoji') {
          client.commands.get('delemoji').execute(message,args);
        }

        if (command === 'embed') {
          client.commands.get('embed').run(client, message, args);
          }
	if (command === 'end') {
            const messageID = args[0];
            client.giveawaysManager.end(messageID).then(() => {
                message.channel.send('Success! Giveaway ended!');
            }).catch(() => {
                message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
            });
        }

          if (command === 'give-role') {
            client.commands.get('give-role').execute(client,message,args);
          }

          if (command === 'help') {
            client.commands.get('help').execute(message,args,client);
          }

          if (command === 'invite') {
            client.commands.get('invite').execute(message, args, client);
            }
            if (command === 'info') {
              client.commands.get('info').execute(message,args);
            }

            if(command === "kick") {
                               // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.cache.some(r=>["Admin", "Mod", "Owner", "Staff"].includes(r.name)))
    return message.reply("Sorry, you don't have permissions to use this!");
  
  // Let's first check if we have a member and if we can kick them!
  // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
  // We can also support getting the member by ID, which would be args[0]
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!member)
    return message.reply("Please mention a valid member of this server");
  if(!member.kickable) 
    return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
  
  // slice(1) removes the first part, which here should be the user mention or ID
  // join(" ") takes all the various parts to make it a single string.
  let reason = args.slice(1).join(" ");
  if(!reason) reason = "No reason provided";
  
  // Now, time for a swift kick in the nuts!
  await member.kick(reason)
    .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
  message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
                }
                
                if (command === 'mute') {
                  if (!message.member.hasPermission("MANAGE_ROLES")) {
                    return message.channel.send(
                      "Sorry but you do not have permission to unmute anyone"
                    );
                  }
              
                  if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
                    return message.channel.send("I do not have permission to manage roles.");
                  }
                  const user = message.mentions.members.first();
            
                  if (!user) {
                    return message.channel.send(
                      "Please mention the member to who you want to mute"
                    );
                  }
               
                  if(user.id === message.author.id) {
                    return message.channel.send("I won't mute you -_-");
                  }
                 
                  let reason = args.slice(1).join(" ")
                
                
                  if(!reason) {
                    return message.channel.send("Please Give the reason to mute the member")
                  }
                    
                let muterole = message.guild.roles.cache.find(x => x.name === "Muted")
                
                
                if(!muterole) {
                return message.channel.send("This server do not have role with name `Muted`")
              }
              if(user.roles.cache.has(muterole)) {
                return message.channel.send("Given User is already muted")
              }
               
              user.roles.add(muterole)
                
              await message.channel.send(`You muted **${message.mentions.users.first().username}** For \`${reason}\``)
                  
                  user.send(`You are muted in **${message.guild.name}** For \`${reason}\``)
                 }
                 if (command === 'meme') {
                  client.commands.get('meme').run(client,message,args);
                }
	if (command === 'magcpi') {
                  client.commands.get('magcpi').execute(client,message,args);
                }

                 if (command === 'ping') {
                  client.commands.get('ping').execute(client, message, args);
                  }
	if(command === 'pi-ware') {
                client.commands.get('pi-ware').execute(client, message, args);
              }
	if (command === 'poll') {
                  client.commands.get('poll').execute(client, message, args);
              }

                  if (command === 'rps') {
                    client.commands.get('rps').execute(message,args,client);
                  }
	if (command === 'reroll') {
                    const messageID = args[0];
                    client.giveawaysManager.reroll(messageID).then(() => {
                        message.channel.send('Success! Giveaway rerolled!');
                    }).catch(() => {
                        message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
                    });
                }

                  if (command === 'serverinfo') {
                    client.commands.get('serverinfo').execute(message,args,client);
                   }
                if (command === 'support') {
                    client.commands.get('support').execute(message, args, client);
                }
                  if(command === 'snake') {
                    const { Snake } = require('weky');
                                    new Snake({
                    message: message,
                      embed: {
                        title: 'Snake', //embed title
                        color: "#gt4668", //embed color
                        gameOverTitle: "Game Over", //game over embed title
                        },
                        emojis: {
                          empty: '⬛', //zone emoji
                          snakeBody: '🐍', //snake
                          food: '🏃‍♀️', //food emoji
                          //control
                          up: '⬆️', 
                          right: '⬅️',
                          down: '⬇️',
                          left: '➡️',
                          },
                        }).start()
                    }
                  if (command === 'suggest') {
                    client.commands.get('suggest').run(client,message,args);
                  }
                  if (command === 'slowmode') {
                    client.commands.get('slowmode').execute(client,message,args);
                  }
                if(command === "say") {
              client.commands.get('say').execute(client,message,args);
                }
	if (command === 'start-giveaway') {
                  // g!start-giveaway 2d 1 Awesome prize!
                  // Will create a giveaway with a duration of two days, with one winner and the prize will be "Awesome prize!"
          
                  client.giveawaysManager.start(message.channel, {
                      time: ms(args[0]),
                      winnerCount: parseInt(args[1]),
                      prize: args.slice(2).join(' ')
                  })
                  // And the giveaway has started!
              }
	
              if (command === 't-role') {
                const role = message.mentions.roles.first()
         
                ticket.setRole(message, role) //Set the support role, that gets pinged when a new ticket is created!
            }
            if (command === 'ticket') {
                const reason = message.content.slice(7)
         
                ticket.makeTicket(message, reason, "swrf")//Creates a new ticket, the reason is optional!
            }
	if (command === 'translate') {
              client.commands.get('translate').execute(client,message,args);
            }

                  if(command === "unmute") {
                    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
                      return message.channel.send("I do not have permission to manage roles.");
                    }
                    const user = message.mentions.members.first();
              
                    if (!user) {
                      return message.channel.send(
                        "Please mention the member to who you want to unmute"
                      );
                    }
                    let muterole = message.guild.roles.cache.find(x => x.name === "Muted")
                  
                  
               if(user.roles.cache.has(muterole)) {
                    return message.channel.send("Given User do not have mute role so what i am suppose to take")
                  }
                  user.roles.remove(muterole)
                  
                  await message.channel.send(`**${message.mentions.users.first().username}** is unmuted`)
                  
                  user.send(`You are now unmuted from **${message.guild.name}**`)
                        }
                        if (command === 'userinfo') {
                          client.commands.get('userinfo').execute(client, message, args);
                          }

                          if (command === 'wb') {
                            client.commands.get('wb').run(client,message,args);
                          }

                          if (command === '8ball') {
                            client.commands.get('8ball').execute(client,message,args);
                          }

                        });          

                        
                     
