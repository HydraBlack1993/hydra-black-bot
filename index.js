const TelegramBot = require('node-telegram-bot-api');
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

// Token bota z zmiennej środowiskowej Render
const token = process.env.TELEGRAM_BOT_TOKEN;

// Konfiguracja Firebase (Twoja)
const firebaseConfig = {
  apiKey: "AIzaSyD2t9ZsPOX16nfrzfpzPxfthD0puXKrm1M",
  authDomain: "hydra-black-global.firebaseapp.com",
  projectId: "hydra-black-global",
  storageBucket: "hydra-black-global.firebasestorage.app",
  messagingSenderId: "800376499112",
  appId: "1:800376499112:web:454e3921ffa6ac2dba8b9d"
};

// Inicjalizacja Firebase i Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Inicjalizacja bota
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const userName = msg.from.username || '';
  const firstName = msg.from.first_name || '';

  try {
    // Zapisz użytkownika w Firestore pod dokumentem o ID userId
    await setDoc(doc(db, "users", String(userId)), {
      userName,
      firstName,
      chatId,
      joinedAt: new Date().toISOString()
    });

    bot.sendMessage(chatId, 'Cześć! Zarejestrowałem Cię w systemie HydraBlackBot.');
  } catch (error) {
    console.error("Błąd zapisu do Firestore:", error);
    bot.sendMessage(chatId, 'Ups, coś poszło nie tak podczas rejestracji.');
  }
});

console.log('Bot z Firebase uruchomiony. Czekam na wiadomości...');
