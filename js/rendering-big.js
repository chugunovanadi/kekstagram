import {isEscapeKey} from './utils.js';

const bigPictureСontainer=document.querySelector('.big-picture');
const buttonPictureCancel=document.querySelector('#picture-cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsList=document.querySelector('.social__comments');

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
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');

  renderPictureData({url, comments, likes, description});
  renderComments({comments});

  buttonPictureCancel.addEventListener('click', onButtonPictureCancelClick);
  document.addEventListener('keydown', onPopupKeydown);
}

function renderPictureData({url, comments, likes, description}) {
  bigPictureСontainer.querySelector('.big-picture__img').querySelector('img').src=url;
  bigPictureСontainer.querySelector('.likes-count').textContent=likes;
  bigPictureСontainer.querySelector('.comments-count').textContent=comments.length;
  bigPictureСontainer.querySelector('.social__caption').textContent=description;
}

function renderComments({comments}) {
  comments.forEach((element) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = element.avatar;
    comment.querySelector('.social__picture').alt = element.name;
    comment.querySelector('.social__text').textContent = element.message;
    commentsList.append(comment);
  });
}

function closeBigPicture() {
  bigPictureСontainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsList.innerHTML = '';
  buttonPictureCancel.removeEventListener('click', onButtonPictureCancelClick);
  document.removeEventListener('keydown', onPopupKeydown);
}

export {openBigPicture};
