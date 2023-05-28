import { gallery, infiniteLoading } from '../indexJs';
import _ from 'lodash';

export const scrollHandler = _.throttle(() => {
  const { height: galleryHeight } = gallery.getBoundingClientRect();
  let scrollHeight = window.scrollY;
  const DisplayHeight = window.innerHeight;

  if (galleryHeight - scrollHeight < DisplayHeight) {
    infiniteLoading();
  }
}, 300);
