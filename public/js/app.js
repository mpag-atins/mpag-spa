// ==========================================
// js/app.js — inicjalizacja aplikacji SPA-JS
// ==========================================

import { Router } from './router.js';
import { HomeView, AboutView, ContactView, NotFoundView } from './views.js';

const app = document.getElementById('app');

// ---- Rendering ----

function render(viewFn) {
  app.innerHTML = viewFn();
  updateActiveNav();
  bindEvents();
}

// ---- Aktualizacja aktywnego linku ----

function updateActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.path === path);
  });
}

// ---- Podpinanie eventów po każdym renderze ----

function bindEvents() {
  // Sprawdzenie statusu API na stronie głównej
  const statusEl = document.getElementById('api-status');
  if (statusEl) checkApiStatus(statusEl);

  // Formularz kontaktowy
  const form = document.getElementById('contact-form');
  if (form) form.addEventListener('submit', handleContactForm);
}

// ---- Wywołanie API: status serwera ----

async function checkApiStatus(el) {
  try {
    const res = await fetch('/api/status');
    const data = await res.json();
    el.textContent = `✅ Serwer odpowiada: ${data.message}`;
    el.className = 'status-badge ok';
  } catch {
    el.textContent = '❌ Brak połączenia z serwerem';
    el.className = 'status-badge error';
  }
}

// ---- Wywołanie API: formularz kontaktowy ----

async function handleContactForm(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const status = document.getElementById('form-status');
  const data = Object.fromEntries(new FormData(e.target));

  btn.disabled = true;
  btn.textContent = 'Wysyłanie...';

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.error);

    status.textContent = `✅ ${result.message}`;
    status.className = 'success';
    e.target.reset();
  } catch (err) {
    status.textContent = `⚠️ ${err.message}`;
    status.className = 'error';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Wyślij';
  }
}

// ---- Router ----

const router = new Router({
  '/':        () => { router.navigate('/home'); },
  '/home':    () => render(HomeView),
  '/about':   () => render(AboutView),
  '/contact': () => render(ContactView),
  '*':        () => render(NotFoundView),
});

router.start();

document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});