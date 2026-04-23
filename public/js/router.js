let pageUrls = {
about: '/index.html?about',
contact:'/index.html?contact',
gallery: '/index.html?gallery'
};
function OnStartUp() {
popStateHandler();
}
OnStartUp();
document.querySelector('#about-link').addEventListener('click', (event) => {
let stateObj = { page: 'about' };
document.title = 'About';
history.pushState(stateObj, "about", "?about");
RenderAboutPage();
});

document.querySelector('#contact-link').addEventListener('click', (event) => {
let stateObj = { page: 'contact' };
document.title = 'Contact';
history.pushState(stateObj, "contact", "?contact");
RenderContactPage();
});

document.querySelector('#gallery-link').addEventListener('click', (event) => {
let stateObj = { page: 'gallery' };
document.title = 'gallery';
history.pushState(stateObj, "gallery", "?gallery");
RenderGalleryPage();
});

function RenderAboutPage() {
document.querySelector('main').innerHTML = `
<h1 class="title">About Me</h1>
<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>`;
}

function RenderContactPage() {
  document.querySelector('main').innerHTML = `
    <h1 class="title">Contact with me</h1>

    <form id="contact-form" novalidate>

      <div class="form-group">
        <label for="name">Imię</label>
        <input type="text" id="name" placeholder="Jan Kowalski" />
        <span class="error" id="name-error"></span>
      </div>

      <div class="form-group">
        <label for="email">E-mail</label>
        <input type="email" id="email" placeholder="jan@example.com" />
        <span class="error" id="email-error"></span>
      </div>

      <div class="form-group">
        <label for="message">Wiadomość</label>
        <textarea id="message" rows="5" placeholder="Twoja wiadomość..."></textarea>
        <span class="error" id="message-error"></span>
      </div>

      <div class="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"></div>
      <span class="error" id="captcha-error"></span>

      <button type="submit" id="submit-btn">Wyślij</button>
      <p id="form-success" class="success-msg" style="display:none;">
        ✓ Wiadomość wysłana!
      </p>

    </form>
  `;

  if (window.grecaptcha) grecaptcha.render(
    document.querySelector('.g-recaptcha'),
    { sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' }
  );

  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name    = document.getElementById('name');
    const email   = document.getElementById('email');
    const message = document.getElementById('message');

    const nameErr    = document.getElementById('name-error');
    const emailErr   = document.getElementById('email-error');
    const messageErr = document.getElementById('message-error');
    const captchaErr = document.getElementById('captcha-error');

    // reset błędów
    [nameErr, emailErr, messageErr, captchaErr].forEach(el => el.textContent = '');
    [name, email, message].forEach(el => el.classList.remove('invalid'));

    // walidacja imienia
    if (name.value.trim().length < 2) {
      nameErr.textContent = 'Imię musi mieć co najmniej 2 znaki.';
      name.classList.add('invalid');
      valid = false;
    }

    // walidacja e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      emailErr.textContent = 'Podaj poprawny adres e-mail.';
      email.classList.add('invalid');
      valid = false;
    }

    // walidacja wiadomości
    if (message.value.trim().length < 10) {
      messageErr.textContent = 'Wiadomość musi mieć co najmniej 10 znaków.';
      message.classList.add('invalid');
      valid = false;
    }

    // walidacja reCAPTCHA
    const captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse) {
      captchaErr.textContent = 'Potwierdź, że nie jesteś robotem.';
      valid = false;
    }

    if (valid) {
      document.getElementById('form-success').style.display = 'block';
      e.target.reset();
      grecaptcha.reset();
    }
  });
}

function RenderGalleryPage() {
  document.querySelector('main').innerHTML = `
    <h1 style="text-align:center; margin-top:2rem;">Galeria</h1>
    <div class="gallery-grid" id="grid"></div>
    <div id="modal">
      <button id="modal-close">✕ Zamknij</button>
      <img id="modal-img" src="" alt="Powiększone zdjęcie" />
    </div>
  `;

  // Ten kod wykona się od razu po ustawieniu innerHTML
  const IMAGES = ['photo1.jpg','photo2.jpg','photo3.jpg',
                  'photo4.jpg','photo5.jpg','photo6.jpg',
                  'photo7.jpg','photo8.jpg','photo9.jpg'];

  const grid = document.getElementById('grid');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');

  async function loadAsBlob(src) {
    const res = await fetch(src);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  }

  IMAGES.forEach((filename) => {
    const img = document.createElement('img');
    img.alt = filename;
    img.dataset.src = `./images/${filename}`;  // względna ścieżka
    grid.appendChild(img);

    img.addEventListener('click', async () => {
      modalImg.src = await loadAsBlob(img.dataset.src);
      modal.classList.add('open');
    });
  });

  const observer = new IntersectionObserver(async (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const img = entry.target;
      img.src = await loadAsBlob(img.dataset.src);
      img.onload = () => img.classList.add('loaded');
      observer.unobserve(img);
    }
  }, { rootMargin: '100px' });

  document.querySelectorAll('#grid img').forEach(img => observer.observe(img));

  document.getElementById('modal-close').addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.classList.remove('open'); });
}


function popStateHandler() {
let loc = window.location.href.toString().split(window.location.host)[1];
if (loc === pageUrls.contact){ RenderContactPage(); }
if(loc === pageUrls.about){ RenderAboutPage(); }
if(loc === pageUrls.gallery){ RenderGalleryPage(); }
}

window.onpopstate = popStateHandler;
// na końcu router.js
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});