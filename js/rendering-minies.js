import {openBigPicture} from './rendering-big.js';

const pictureContainer= document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

function renderMinies(userImages) {
  pictureContainer.querySelectorAll('.picture').forEach((element) => element.remove());
  userImages.forEach( ({url, comments, likes, description}) => {
    const picture=templatePicture.cloneNode(true);
    picture.querySelector('.picture__img').src=url;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.querySelector('.picture__likes').textContent = likes;
    pictureContainer.append(picture);
    picture.addEventListener('click', () => {
      openBigPicture({url, comments, likes, description});
    });
  });
}

export {renderMinies};
