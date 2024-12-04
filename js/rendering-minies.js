import {openBigPicture} from './rendering-big.js';

const pictureContainer= document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

function renderMinies(userImages) {
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
/** ДЕЛЕГИРОВАНИЕ
pictureContainer.addEventListener('click', (evt) => {
  if (evt.target.closest('a.picture')) {
    openBigPicture({url, comments, likes, description});}
});
**/

