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
<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>`;
}

function RenderGalleryPage() {
document.querySelector('main').innerHTML = `
<h1 style="text-align:center; margin-top:2rem;">Galeria</h1>

  <div class="gallery-grid" id="grid"></div>

  <div id="modal">
    <button id="modal-close">✕ Zamknij</button>
    <img id="modal-img" src="" alt="Powiększone zdjęcie" />
  </div>

  <script>
    // Lista zdjęć z lokalnego folderu /images/
    // Dodaj swoje pliki do public/images/ i wpisz nazwy poniżej
    const IMAGES = [
      'photo1.jpg',
      'photo2.jpg',
      'photo3.jpg',
      'photo4.jpg',
      'photo5.jpg',
      'photo6.jpg',
      'photo7.jpg',
      'photo8.jpg',
      'photo9.jpg',
    ];

    const grid = document.getElementById('grid');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');

    // Pobierz obraz jako BLOB i zwróć objectURL
    async function loadAsBlob(src) {
      const res = await fetch(src);
      const blob = await res.blob();
      return URL.createObjectURL(blob);
    }

    // Buduj miniatury
    IMAGES.forEach((filename) => {
      const img = document.createElement('img');
      img.alt = filename;
      img.dataset.src = "/images/${filename}";
      grid.appendChild(img);

      // Po kliknięciu otwórz modal z pełnym zdjęciem
      img.addEventListener('click', async () => {
        modalImg.src = await loadAsBlob(img.dataset.src);
        modal.classList.add('open');
      });
    });

    // Lazy loading — ładuj BLOB dopiero gdy miniatura jest widoczna
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

    // Zamknij modal — przycisk lub kliknięcie w tło
    document.getElementById('modal-close').addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.classList.remove('open'); });

    // Dark mode
    document.getElementById('theme-toggle').addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  </script>
`;
}

function popStateHandler() {
let loc = window.location.href.toString().split(window.location.host)[1];
if (loc === pageUrls.contact){ RenderContactPage(); }
if(loc === pageUrls.about){ RenderAboutPage(); }
if(loc === pageUrls.gallery){ RendergalleryPage(); }
}

window.onpopstate = popStateHandler;
// na końcu router.js
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});