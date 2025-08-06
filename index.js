const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const TelegramBot = require('node-telegram-bot-api');
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

// Token bota z Render jako zmienna środowiskowa
const token = process.env.TELEGRAM_BOT_TOKEN;

// Twoja konfiguracja Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD2t9ZsPOX16nfrzfpzPxfthD0puXKrm1M",
  authDomain: "hydra-black-global.firebaseapp.com",
  projectId: "hydra-black-global",
  storageBucket: "hydra-black-global.firebasestorage.app",
  messagingSenderId: "800376499112",
  appId: "1:800376499112:web:454e3921ffa6ac2dba8b9d"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const userName = msg.from.username || '';
  const firstName = msg.from.first_name || '';

  try {
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

app.get('/', (req, res) => {
  res.send('HydraBlackBot działa poprawnie!');
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

console.log('Bot z Firebase uruchomiony.');
