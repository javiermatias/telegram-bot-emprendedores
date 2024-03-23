const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
// Your Telegram Bot token

const token = process.env.TOKEN_BOT;
console.log(token);
// Create a new instance of the TelegramBot
const bot = new TelegramBot(token, { polling: false });

// Create an Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Webhook endpoint
app.post('/webhook', (req, res) => {
  try{
    bot.processUpdate(req.body);
    res.sendStatus(200);
  }catch(error){
    console.error(`Error sending greeting message to ${member}: ${error.message}`);
  }
 
});

app.get('/webhook', (req, res) => {
  try{
    //bot.processUpdate(req.body);
    res.send("hello word")
  }catch(error){
    console.error(`Error sending greeting message`);
  }
 
});
// Listen for new chat members
bot.on('new_chat_members', async (msg) => {

    let member = "Nuevo"
    try {
        // Send the greeting message
        const chatId = msg.chat.id;
        member = msg.new_chat_member?.first_name; // Get the new user's first name
        const greetingMessage = `Hola, ${member}! 🎉\n
        ¡Bienvenido al grupo! Nos encantaría conocerte un poco más. 
        ¿Qué te trae por aquí? presentate asi te podemos conocer mejor.😊`; // Customize your greeting message
        await bot.sendMessage(chatId, greetingMessage);
        //console.log(`Greeting message sent to ${member}`);
    } catch (error) {
        console.error(`Error sending greeting message to ${member}: ${error.message}`);
    }
  
  });
  bot.onText(/\/estudio(.*)/, (msg) => {
    const chatId = msg.chat.id;
    console.log("hola");
    // Send a link to the event
    const eventoLink = "https://drive.google.com/drive/folders/1r-qZZNHglCx1bN5gnqpKpyb2sRqSFm0S";
    bot.sendMessage(chatId, `Contenido: ${eventoLink}`);
});


  bot.onText(/\/evento(.*)/, (msg) => {
    const chatId = msg.chat.id;

    // Send a link to the event
    const eventoLink = "https://bit.ly/usinaemprendedora";
    bot.sendMessage(chatId, `Link del evento: ${eventoLink}`);
});

bot.onText(/\/web(.*)/, (msg) => {
    const chatId = msg.chat.id;

    // Send a link to the event
    const eventoLink = "https://bit.ly/usinaemprendedora";
    bot.sendMessage(chatId, `Web : ${eventoLink}`);
});

bot.onText(/\/instagram(.*)/, (msg) => {
    const chatId = msg.chat.id;

    // Send a link to the event
    const eventoLink = "https://www.instagram.com/clubdeemprendedorescba/";
    bot.sendMessage(chatId, `Instagram: ${eventoLink}`);
});

bot.onText(/\/libros(.*)/, (msg) => {
  const chatId = msg.chat.id;

  // Send a link to the event
  const eventoLink = "https://docs.google.com/spreadsheets/d/1g8CZnH1Pr9rIWttTXvTD5LfgSswsK5DQ9fkml1waFSo/edit?usp=sharing";
  bot.sendMessage(chatId, `Libros: ${eventoLink}`);
});

// Start the Express server
const port = process.env.PORT || 4040;
app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});

// Set the webhook
const webhookUrl = process.env.URL// Replace with your webhook URL
bot.setWebHook(`${webhookUrl}/webhook`);

//