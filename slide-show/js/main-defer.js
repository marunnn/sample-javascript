'use strict';

import * as oshinoko from './oshinoko.js';

const imageGenre = oshinoko.genre;
const pathsOfImages = oshinoko.images;
let current = 0;

function insertMainImage(pathOfMainImage) {
    const mainImage = `<img id="main-image" src=${pathOfMainImage}>`
    document.getElementById('main-image-parent').insertAdjacentHTML('afterbegin', mainImage);
};

function insertSubImages(pathsOfSubImages, imageGenre) {
    for (const image of pathsOfSubImages) {
        const splitImage = image.split('/');
        const subImage = `<li><img class="thumb" src=${image} data-${imageGenre}=${splitImage[splitImage.length - 1]}></li>`;
        document.getElementById('sub-images').insertAdjacentHTML('beforeend', subImage);
    }
};

function pageNum() {
    document.getElementById('page').textContent = `${current + 1}/${pathsOfImages.length}`;
};

insertMainImage(pathsOfImages[0]);
insertSubImages(pathsOfImages, imageGenre);
pageNum();

const thumbs = document.querySelectorAll('.thumb');
thumbs.forEach(function (item, index) {
    item.onclick = function () {
        console.log(document.getElementById('main-image'));
        console.log(document.getElementById('main-image').src);
        console.log(this);
        console.log(this.src);
        current = index;
        console.log(`current: ${current}`);
        document.getElementById('main-image').src = this.src;
        pageNum();
    }
});

function changeImage(num) {
    if (current + num >= 0 && current + num < pathsOfImages.length) {
        current += num;
        console.log(`current: ${current}`);
        document.getElementById('main-image').src = pathsOfImages[current];
        pageNum();
    }
};

document.getElementById('prev').onclick = function () {
    console.log(document.getElementById('prev'));
    console.log(`current: ${current}`);
    changeImage(-1);
};

document.getElementById('next').onclick = function () {
    console.log(document.getElementById('next'));
    console.log(`current: ${current}`);
    changeImage(1);
};