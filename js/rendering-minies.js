import {getPictures} from './mock-data.js';

const pictureContainer= document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const randomUserImages = getPictures();

randomUserImages.forEach( ({url, comments, likes}) => {
  const cloneTemplatePicture=templatePicture.cloneNode(true);
  cloneTemplatePicture.querySelector('.picture__img').src=url;
  cloneTemplatePicture.querySelector('.picture__comments').textContent = comments.length;
  cloneTemplatePicture.querySelector('.picture__likes').textContent = likes;
  pictureContainer.append(cloneTemplatePicture);
});

