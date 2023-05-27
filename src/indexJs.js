// imports

import Notiflix from 'notiflix';
import { getElement } from './jsFiles/getElement.js';
import { receivedImages } from './jsFiles/fetchRequests.js';
import { clearGallery, displayImages } from './jsFiles/displayHandlers.js';
// variabiles

const searchForm = getElement('.search-form');
const formInput = getElement('.search-form input');
export const gallery = getElement('.gallery');
const loadMoreBtn = getElement('.load-more');
export const loading = getElement('.loading');

let typedValue = '';
let imagesPerPage = 40;
let pageNum = 1;
let totalImagesFound = null;

const loadNextImages = async () => {
  pageNum++;
  try {
    const submitResponse = await receivedImages(typedValue, pageNum);
    const newImages = submitResponse.hits;
    gallery.innerHTML = '';
    displayImages(newImages);
  } catch (err) {
    console.log(err);
  }
};

const submitHandler = async e => {
  e.preventDefault();
  loading.classList.remove('hidden');
  typedValue = formInput.value;

  try {
    const submitResponse = await receivedImages(typedValue, pageNum);
    const images = submitResponse.hits;
    const numberOfImages = submitResponse.totalHits;
    loading.classList.add('hidden');
    if (!numberOfImages) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      return;
    }
    Notiflix.Notify.info(`"Hooray! We found ${numberOfImages} images.`);
    displayImages(images);
    if (numberOfImages > imagesPerPage) {
      loadMoreBtn.classList.remove('hidden');
      totalImagesFound = numberOfImages;
    }
  } catch (err) {
    console.log(err);
  }
};

searchForm.addEventListener('submit', submitHandler);
loadMoreBtn.addEventListener('click', loadNextImages);
