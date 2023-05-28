// imports
import SimpleLightbox from 'simplelightbox';

import Notiflix from 'notiflix';
import { getElement } from './jsFiles/getElement.js';
import { receivedImages } from './jsFiles/fetchRequests.js';
import {
  displayImages,
  clearGallery,
  displayImagesForScrolling,
} from './jsFiles/displayHandlers.js';
import { scrollHandler } from './jsFiles/scrollHandler.js';
// variabiles

const searchForm = getElement('.search-form');
const formInput = getElement('.search-form input');
export const gallery = getElement('.gallery');
export const loadMoreBtn = getElement('.load-more');
export const loading = getElement('.loading');
const selectScrollingTypeBtn = getElement('.select-scrolling-btn');
const selectScrollingContainer = getElement('.select-scrolling-mode');

let typedValue = '';
let imagesPerPage = 40;
let pageNum = null;
let totalImagesFound = null;

var lightbox = new SimpleLightbox('.gallery a', {
  capttion: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionDelay: 250,
});

const fetchNextPage = async () => {
  pageNum++;
  const totalpages = Math.ceil(totalImagesFound / imagesPerPage);
  try {
    const submitResponse = await receivedImages(typedValue, pageNum);
    const newImages = submitResponse.hits;
    displayImages(newImages);
    if (pageNum === totalpages) {
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.classList.add('hidden');
    }
  } catch (err) {
    console.log(err);
  }
};

const loadNextImages = async () => {
  selectScrollingContainer.classList.add('hidden');
  fetchNextPage();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const infiniteLoading = async () => {
  pageNum++;
  const totalpages = Math.ceil(totalImagesFound / imagesPerPage);
  try {
    const submitResponse = await receivedImages(typedValue, pageNum);
    const newImages = submitResponse.hits;
    displayImagesForScrolling(newImages);
    lightbox.refresh();

    if (pageNum === totalpages) {
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
      loadMoreBtn.classList.add('hidden');
      window.removeEventListener('scroll', scrollHandler);
    }
  } catch (err) {
    console.log(err);
  }
};

const submitHandler = async e => {
  e.preventDefault();
  window.removeEventListener('scroll', scrollHandler);
  if (pageNum !== 1) {
    selectScrollingContainer.classList.remove('hidden');
  }
  pageNum = 1;
  loading.classList.remove('hidden');
  typedValue = formInput.value;
  typedValue = typedValue.trim();
  if (typedValue) {
    try {
      const submitResponse = await receivedImages(typedValue, pageNum);
      const images = submitResponse.hits;
      const numberOfImages = submitResponse.totalHits;
      loading.classList.add('hidden');
      selectScrollingContainer.classList.add('hidden');
      if (!numberOfImages) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        clearGallery();
        return;
      }
      Notiflix.Notify.info(`"Hooray! We found ${numberOfImages} images.`);
      displayImages(images);
      if (numberOfImages > imagesPerPage) {
        selectScrollingContainer.classList.remove('hidden');
        loadMoreBtn.classList.remove('hidden');
        totalImagesFound = numberOfImages;
      }
      lightbox.refresh();
    } catch (err) {
      console.log(err);
    }
  } else {
    Notiflix.Notify.failure('Please type the image you want to see');
    loading.classList.add('hidden');
  }
};

searchForm.addEventListener('submit', submitHandler);
loadMoreBtn.addEventListener('click', loadNextImages);
selectScrollingTypeBtn.addEventListener('click', () => {
  window.addEventListener('scroll', scrollHandler);
  selectScrollingContainer.classList.add('hidden');
  loadMoreBtn.classList.add('hidden');
});
