import '@babel/polyfill';
//import svg4everybody from 'svg4everybody';
//import $ from 'jquery';

//svg4everybody();

//window.$ = $;
//window.jQuery = $;

//require('ninelines-ua-parser');

// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';
Swiper.use([Navigation, Pagination, Thumbs]);
window.Swiper = Swiper;

require('lightgallery.js');
require('lg-video.js');

import rangeSlider from 'rangeslider-pure';
window.rangeSlider = rangeSlider;

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}
