// imports

import 'simplelightbox/dist/simple-lightbox.min.css';
import { loading, gallery, loadMoreBtn } from '../indexJs.js';

// exports

export const clearGallery = () => {
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('hidden');
  loading.classList.add('hidden');
};

export const displayImages = images => {
  gallery.innerHTML = '';
  const displayData = makeGalleryHtml(images);
  loading.classList.add('hidden');
  gallery.innerHTML = displayData;
};

export const displayImagesForScrolling = images => {
  const displayData = makeGalleryHtml(images);
  loading.classList.add('hidden');
  gallery.insertAdjacentHTML('beforeend', displayData);
};

function makeGalleryHtml(images) {
  const displayData = images
    .map(img => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = img;
      return `<div class="photo-card">
        <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>${likes}
          </p>
          <p class="info-item">
            <b>Views</b>${views}
          </p>
          <p class="info-item">
            <b>Comments</b>${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>${downloads}
          </p>
        </div>
      </div>`;
    })
    .join('');
  return displayData;
}
