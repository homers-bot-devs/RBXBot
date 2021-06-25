const translate = require('@iamtraction/google-translate');
module.exports = {
    name: 'translate',
    async execute(client, message, args){
        const query = args.join(" ");
        if (!query) return message.channel.send('Please Specify A Text To Translate');

        const translated = await translate(query, { to: 'en'});
     
    message.channel.send(translated.text)
    
    }
}
