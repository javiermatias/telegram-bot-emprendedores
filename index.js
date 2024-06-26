const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
const schedule = require('node-schedule');
require('dotenv').config();
// Your Telegram Bot token
// Global variable to store the last read ID
let lastReadId = 0;
const token = process.env.TOKEN_BOT;
console.log(token);
// Create a new instance of the TelegramBot
const bot = new TelegramBot(token, { polling: false });

// Define the cron expression for the first Thursday of every month
const cronExpression = '0 15 19 * * 4#1'; // At 7:15 PM on the first Thursday of every month

const chatGroupId = -1001909144979;
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
        const greetingMessage = `Hola, ${member}! 🎉 ¡Bienvenido al grupo! Nos encantaría conocerte un poco más.¿Qué te trae por aquí? presentate asi te podemos conocer mejor.😊`; // Customize your greeting message
        await bot.sendMessage(chatId, greetingMessage);
        //console.log(`Greeting message sent to ${member}`);
    } catch (error) {
        console.error(`Error sending greeting message to ${member}: ${error.message}`);
    }
  
  });
  bot.onText(/\/estudio(.*)/, (msg) => {
    const chatId = msg.chat.id;
    console.log("msg " + msg.chat.id);
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

bot.onText(/\/material(.*)/, (msg) => {
  const chatId = msg.chat.id;

  // Send a link to the event
  const eventoLink = "https://bit.ly/material-emprendedor";
  bot.sendMessage(chatId, `Instagram: ${eventoLink}`);
});


bot.onText(/\/libros(.*)/, (msg) => {
  const chatId = msg.chat.id;

  // Send a link to the event
  const eventoLink = "https://docs.google.com/spreadsheets/d/1g8CZnH1Pr9rIWttTXvTD5LfgSswsK5DQ9fkml1waFSo/edit?usp=sharing";
  bot.sendMessage(chatId, `Libros: ${eventoLink}`);
});

bot.onText(/\/emprendimiento(.*)/, (msg) => {
  const chatId = msg.chat.id;

  // Send a link to the event
  const eventoLink = "https://bit.ly/club-emprendimientos";
  bot.sendMessage(chatId, `Emprendimientos: ${eventoLink}`);
});

function sendMessage() {
  //chatGroupId
  const message = 'Buenas🖐️ No te olvides de inscribirte para el evento de emprendimiento que se realizara mañana: https://bit.ly/usinaemprendedora ';
  
  bot.sendMessage(chatGroupId, message)
      .then(() => console.log('Message sent successfully'))
      .catch((err) => console.error('Error:', err));
}

function FirstThursdayEveryMonth() {
  //chatGroupId
  const message = 'Buenas Gente🖐️ Mañana haremos un encuentro informal en el espacio de Coworking focuslabcoworking, les pedimos a los que vayan que confirmen asi armamos el lugar.Gracias😊';
  
  bot.sendMessage(chatGroupId, message)
      .then(() => console.log('Message sent successfully'))
      .catch((err) => console.error('Error:', err));
}

// Start the Express server
const port = process.env.PORT || 4040;
app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});

// Set the webhook
const webhookUrl = process.env.URL// Replace with your webhook URL
bot.setWebHook(`${webhookUrl}/webhook`);
schedule.scheduleJob({hour: 19, minute: 15, dayOfWeek: 1}, sendMessage);
schedule.scheduleJob(cronExpression, FirstThursdayEveryMonth);
//