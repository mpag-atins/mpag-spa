// ==========================================
// server.js — Serwer Express dla SPA-JS
// ==========================================

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));
app.use(express.static('public'));
// ---- API Routes ----

// GET /api/status — przykładowy endpoint
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'SPA-JS działa!', time: new Date().toISOString() });
});

// POST /api/contact — obsługa formularza kontaktowego
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Wypełnij wszystkie pola.' });
  }

  // Tutaj możesz dodać np. wysyłkę maila lub zapis do bazy
  console.log(`📩 Wiadomość od ${name} <${email}>: ${message}`);

  res.json({ success: true, message: `Dziękujemy, ${name}! Wiadomość odebrana.` });
});

// Wszystkie pozostałe trasy → index.html (obsługa SPA routing)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '/', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Serwer działa na http://localhost:${PORT}`);
});