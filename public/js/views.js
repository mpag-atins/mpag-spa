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