import {getRandomPositiveInteger} from './utils.js';

const setComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const setDescriptions=['В комментариях придет токсичный кот','Чилл', 'Кайф', 'Рофл', 'Немножко кринжа','Хочу в качу...','Типичный скуф','Краш', 'Стиль, все ради стиля'];
const names=['Сергей', 'Семен', 'Акакий', 'Вася', 'Илья', 'Витя'];

function getRandomArrayElement(array) {
  const randomElement=array[getRandomPositiveInteger(0, array.length-1)];
  return randomElement;
}

function createComment(idComment){ //создаем объекты комментариев
  return {
    id: idComment,
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomArrayElement(setComments),
    name: getRandomArrayElement(names),
  };
}

function getComments () { //создаем массив с объектами комментов
  const numberOfComments = getRandomPositiveInteger(1, 7);
  return Array.from({length: numberOfComments}, (item, ind) => createComment(ind+1));
}

function createPicture (idPicture){ //создаем объекты фоток
  return{
    id: idPicture,
    url: `photos/${idPicture}.jpg`,
    description: getRandomArrayElement(setDescriptions),
    likes: getRandomPositiveInteger(15, 200),
    comments: getComments(),
  };
}

function getPictures(){ //финальная функция генерирующая массив 25 объектов
  return Array.from({length: 25}, (item, ind) => createPicture(ind + 1));
}

export {getPictures};
