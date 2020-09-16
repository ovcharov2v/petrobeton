import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';
Swiper.use([Navigation, Pagination, Thumbs]);
window.Swiper = Swiper;

require('lightgallery.js');
require('lg-video.js');

var MicroModal = require('micromodal');

require('../../node_modules/inputmask/dist/inputmask.min');

import rangeSlider from 'rangeslider-pure';
window.rangeSlider = rangeSlider;
