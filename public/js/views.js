// ==========================================
// js/views.js — Widoki (strony) aplikacji
// ==========================================

export const HomeView = () => `
  <section class="view">
    <h1>Witaj w SPA-JS 👋</h1>
    <p>Single Page Application uruchomiona na <strong>Node.js + Express</strong>.</p>
    <p id="api-status" class="status-badge">Sprawdzanie serwera...</p>
    <div class="card-grid">
      <div class="card">
        <h2>⚡ History API</h2>
        <p>Routing oparty o <code>pushState</code> — czyste URLe bez znaku <code>#</code>.</p>
      </div>
      <div class="card">
        <h2>🖥️ Node.js + Express</h2>
        <p>Serwer obsługuje API i serwuje pliki statyczne z katalogu <code>public/</code>.</p>
      </div>
      <div class="card">
        <h2>🧩 ES Modules</h2>
        <p>Zarówno serwer (<code>server.js</code>) jak i frontend używają składni <code>import/export</code>.</p>
      </div>
    </div>
  </section>
`;

export const AboutView = () => `
  <section class="view">
    <h1>O projekcie</h1>
    <p>SPA-JS to aplikacja edukacyjna pokazująca architekturę Single Page App z backendem Node.js.</p>
    <h2>Struktura projektu</h2>
    <pre><code>SPA-JS-Node/
├── server.js          ← serwer Express (backend)
├── package.json
└── public/            ← pliki statyczne (frontend)
    ├── index.html
    ├── css/
    │   └── style.css
    └── js/
        ├── app.js     ← główna logika
        ├── router.js  ← History API router
        └── views.js   ← widoki</code></pre>
    <h2>Jak działa routing?</h2>
    <p>Frontend używa <code>window.history.pushState()</code> do zmiany URL bez przeładowania strony. Serwer Express przekierowuje <strong>wszystkie</strong> ścieżki do <code>index.html</code>, dzięki czemu odświeżenie strony też działa poprawnie.</p>
  </section>
`;

export const ContactView = () => `
  <section class="view">
    <h1>Kontakt</h1>
    <p>Formularz wysyła dane do <code>POST /api/contact</code> na serwerze Express.</p>
    <form id="contact-form" novalidate>
      <label>
        Imię
        <input type="text" name="name" placeholder="Jan Kowalski" required />
      </label>
      <label>
        E-mail
        <input type="email" name="email" placeholder="jan@example.com" required />
      </label>
      <label>
        Wiadomość
        <textarea name="message" rows="4" placeholder="Twoja wiadomość..." required></textarea>
      </label>
      <button type="submit" id="submit-btn">Wyślij</button>
      <p id="form-status"></p>
    </form>
  </section>
`;

export const NotFoundView = () => `
  <section class="view not-found">
    <h1>404</h1>
    <p>Nie znaleziono strony.</p>
    <button data-path="/home">← Wróć na stronę główną</button>
  </section>
`;

export const gallery = () => `
<!doctype html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gallery</title>
  <link rel="stylesheet" href="/css/style.css">
  <style>
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      max-width: 900px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .gallery-grid img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .gallery-grid img.loaded {
      opacity: 1;
    }

    /* Modal */
    #modal {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.8);
      z-index: 100;
      align-items: center;
      justify-content: center;
    }

    #modal.open { display: flex; }

    #modal img {
      max-width: 90vw;
      max-height: 90vh;
      object-fit: contain;
    }

    #modal-close {
      position: fixed;
      top: 1rem;
      right: 1rem;
      background: white;
      border: none;
      padding: 0.4rem 0.8rem;
      cursor: pointer;
      font-size: 1rem;
    }
  </style>
</head>
<body>
  <header class="header">
    <ul class="Header-links-ul">
      <li class="header-link" onclick="history.back()">← Wróć</li>
    </ul>
    <button id="theme-toggle">Toggle Theme</button>
  </header>

  
</body>
</html>
`;