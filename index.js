const TelegramBot = require('node-telegram-bot-api');

// Podmień token poniżej na swój token bota
const token = '7993640032:AAGSDVE3Dxwq39E1ebTX7Z7CMjWd1VlLsJY';

// Tworzymy bota w trybie polling
const bot = new TelegramBot(token, { polling: true });

// Nasłuchujemy na komendę /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Cześć! HydraBlackBot działa poprawnie.');
});

console.log('Bot uruchomiony. Czekam na wiadomości...');
