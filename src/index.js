require('dotenv').config();
const {Client, IntentsBitField}= require('discord.js');
const {Translate} = require('@google-cloud/translate').v2;


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

const translate = new Translate({
    key:process.env.TOKEN1

})

client.on('ready', (c) => {
    console.log(`${c.user.username} is online.`);
});


client.on('messageCreate', (msg) => {
    if(msg.author.bot) {
        return;
    }

    if (msg.content === 'hello'| msg.content === 'Hello' | msg.content === 'Hey'| msg.content === 'hey'| msg.content === 'Hi'|msg.content === 'hi'){
        msg.reply('Im Fluentify, a bot to help you translate any message!\n In order to translate a message please type your message in this format\n "!translate [Language to translate to] [Text to be Translated]');
    }

});

client.on('messageCreate', async (message) => {
    if(msg.author.bot) {
        return;
    }
    if (!message.content.startsWith('!translate')) return; // Only respond to messages starting with !translate
  
    // Extract the target language code and text to translate
    const args = message.content.slice(11).split(' ');
    const targetLanguage = args.shift().toLowerCase();
    const textToTranslate = args.join(' ');
  
    try {
      // Translate the text
      const [translation] = await translate.translate(textToTranslate, targetLanguage);
      
      // Send the translated text to the Discord channel
      message.reply(`Translated text (${targetLanguage}): ${translation}`);
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while translating.');
    }
  });

client.login(process.env.TOKEN);
