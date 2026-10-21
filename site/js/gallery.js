const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxAvif = document.getElementById('lightbox-avif');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxCounter = document.getElementById('lightbox-counter');

let images = [];
let current = 0;
let lastFocused = null;

function render() {
  gallery.innerHTML = '';
  images.forEach((image, index) => {
    const item = document.createElement('li');
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'card';
    card.innerHTML = `
      <picture>
        <source srcset="images/${image.file}.avif" type="image/avif">
        <img src="images/${image.file}.png" alt="${image.alt}" width="200" height="200" loading="lazy" decoding="async">
      </picture>
      <h2>${image.title}</h2>
      <p>${image.description}</p>`;
    card.addEventListener('click', () => open(index));
    item.append(card);
    gallery.append(item);
  });
  gallery.setAttribute('aria-busy', 'false');
}

function show(index) {
  current = (index + images.length) % images.length;
  const image = images[current];
  lightboxAvif.srcset = `images/${image.file}.avif`;
  lightboxImg.src = `images/${image.file}.png`;
  lightboxImg.alt = image.alt;
  lightboxTitle.textContent = image.title;
  lightboxDescription.textContent = image.description;
  lightboxCounter.textContent = `${current + 1} of ${images.length}`;
}

function open(index) {
  lastFocused = document.activeElement;
  show(index);
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  document.getElementById('lightbox-next').focus();
}

function close() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

document.getElementById('lightbox-close').addEventListener('click', close);
document.getElementById('lightbox-prev').addEventListener('click', () => show(current - 1));
document.getElementById('lightbox-next').addEventListener('click', () => show(current + 1));

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) close();
});

document.addEventListener('keydown', (event) => {
  if (lightbox.hidden) return;
  if (event.key === 'Escape') close();
  if (event.key === 'ArrowLeft') show(current - 1);
  if (event.key === 'ArrowRight') show(current + 1);
});

fetch('data/images.json')
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then((data) => {
    images = data.images;
    render();
  })
  .catch((error) => {
    gallery.innerHTML = '<li class="gallery-empty">Could not load the gallery.</li>';
    console.error('Failed to load data/images.json:', error);
  });
