import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const gallery = document.querySelector('.gallery');

const genLiItem = ({ preview, original, description }) =>
  `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
  </a>
  </li>
`;

const getImages = img => img.map(item => genLiItem(item)).join('');
gallery.innerHTML = getImages(galleryItems);
gallery.addEventListener('click', onClickGallery);

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function onClickGallery(e) {
  e.preventDefault();
}

console.log(galleryItems);
