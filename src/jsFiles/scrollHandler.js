import { gallery } from '../indexJs.js';

export const scrollHandler = () => {
  const { height: imgHeight } =
    gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: imgHeight * 2,
    behavior: 'smooth',
  });
};
