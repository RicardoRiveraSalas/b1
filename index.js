// index.js
import TelegramBot from "node-telegram-bot-api";

const token = "8568259435:AAG7EPjQCRLhTXw5w15zygpqLmEiUAXmbzg";

// Activar el bot en modo polling
const bot = new TelegramBot(token, { polling: true });

// Comando /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "¡Hola Ricardo! 👋 Tu bot de Telegram ya está funcionando en Node.js 🚀"
  );
});

// Responde a cualquier mensaje
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text !== "/start") {
    bot.sendMessage(chatId, `Recibí tu mensaje: "${text}" `);
  }
});

console.log("Bot de Telegram funcionando...");
