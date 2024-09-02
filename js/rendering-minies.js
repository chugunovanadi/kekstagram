import {getPictures} from './mock-data.js';
import {openBigPicture} from './rendering-big.js';

const pictureContainer= document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const randomUserImages = getPictures();

randomUserImages.forEach( ({url, comments, likes, description}) => {
  const picture=templatePicture.cloneNode(true);
  picture.querySelector('.picture__img').src=url;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;
  pictureContainer.append(picture);

  picture.onclick = () => {
    openBigPicture(({url, comments, likes, description}));
  };
});

