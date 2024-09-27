import {isEscapeKey} from './utils.js';

const bigPictureСontainer=document.querySelector('.big-picture');
const buttonPictureCancel=document.querySelector('#picture-cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsList=document.querySelector('.social__comments');
const loadCommentsButton = document.querySelector('.social__comments-loader');
const commentsСount=document.querySelector('.comments-count');
const currentCommentsСount = document.querySelector('.current-comments-count');
const COMMENTS_PER_PAGE = 5;
let currentCommentsDisplayed = 0;
let globalCommentsBeforeDisplay = []; //глобальная переменная с массивом для хранения данных с комментариями перед их отображением

function onButtonPictureCancelClick() {
  closeBigPicture();
}
function onPopupKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function openBigPicture({url, comments, likes, description}) {
  bigPictureСontainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  renderPictureData({url, comments, likes, description});

  globalCommentsBeforeDisplay = comments;
  renderComments();
  loadCommentsButton.addEventListener('click', renderComments); //иначе (без глобальной переменной) в этом обработчике не будет доступа к данным

  buttonPictureCancel.addEventListener('click', onButtonPictureCancelClick);
  document.addEventListener('keydown', onPopupKeydown);
}

function renderPictureData({url, comments, likes, description}) {
  bigPictureСontainer.querySelector('.big-picture__img').querySelector('img').src=url;
  commentsСount.textContent = comments.length;
  bigPictureСontainer.querySelector('.likes-count').textContent=likes;
  bigPictureСontainer.querySelector('.social__caption').textContent=description;
}


function renderComments() {
  const domLocalArray = []; //локальный массив для хранения dom объектов
  globalCommentsBeforeDisplay.forEach((element) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = element.avatar;
    comment.querySelector('.social__picture').alt = element.name;
    comment.querySelector('.social__text').textContent = element.message;
    domLocalArray.push(comment);
  });

  //отрисовывваю не сразу все комменты, а по условию
  if (domLocalArray.length <= COMMENTS_PER_PAGE) {
    loadCommentsButton.classList.add('hidden');
    currentCommentsСount.textContent = commentsСount.textContent;
    domLocalArray.forEach((value) => {
      commentsList.append(value);
    });
  }

  else {
    const partComments = domLocalArray.slice(currentCommentsDisplayed, currentCommentsDisplayed + COMMENTS_PER_PAGE);
    partComments.forEach((value) => {
      commentsList.append(value);
    });
    currentCommentsDisplayed = currentCommentsDisplayed + COMMENTS_PER_PAGE;
    currentCommentsСount.textContent=currentCommentsDisplayed;
    if (currentCommentsDisplayed >= domLocalArray.length) {
      currentCommentsСount.textContent=domLocalArray.length;
      loadCommentsButton.classList.add('hidden');
    }
  }
}

function closeBigPicture() {
  bigPictureСontainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsList.innerHTML = '';
  currentCommentsDisplayed = 0;
  loadCommentsButton.classList.remove('hidden');
  buttonPictureCancel.removeEventListener('click', onButtonPictureCancelClick);
  document.removeEventListener('keydown', onPopupKeydown);
  loadCommentsButton.removeEventListener('click', renderComments);
}

export {openBigPicture};
