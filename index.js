// index.js
import TelegramBot from "node-telegram-bot-api";
import fetch from "node-fetch";

const token = "8568259435:AAG7EPjQCRLhTXw5w15zygpqLmEiUAXmbzg";

// Activar el bot en modo polling
const bot = new TelegramBot(token, { polling: true });

// Función para IA gratis (Llama 3 en Vercel AI)
async function chatIA(input) {
  const response = await fetch("https://ai.vercel.sh/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      prompt: input
    })
  });

  const data = await response.json();
  return data.text;
}

// Comando /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "¡Hola Ricardo! 🤖 Tu bot ya está conectado a una IA gratuita y responde como humano 🚀\n\nEscribime lo que querás."
  );
});

// Responde mensajes con IA
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") return;

  try {
    // Respuesta de la IA
    const respuestaIA = await chatIA(text);
    bot.sendMessage(chatId, respuestaIA);
  } catch (error) {
    console.error("Error con la IA:", error);
    bot.sendMessage(chatId, "Hubo un problema consultando la IA 😓 Inténtalo de nuevo.");
  }
});

console.log("Bot con IA funcionando...");
