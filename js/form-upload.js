import {isEscapeKey} from './utils.js';

const form = document.querySelector('.img-upload__form');
const uploadFile = form.querySelector('#upload-file');
const cancelButton = form.querySelector('#upload-cancel');
const commentField = form.querySelector('.text__description');
const hashtagField = form.querySelector('.text__hashtags');

function onCancelButtonClick() {
  closePublication();
}
function onPublicationKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePublication();
  }
}
function onFieldKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
}
function onCommentFieldInput() {
  if (commentField.value.length === 140) {
    form.querySelector('.error_description').classList.remove('hidden');
  }
  else {
    form.querySelector('.error_description').classList.add('hidden');
  }
}
function onHashtagFieldInput() {
  if (!validateHashtag()){
    form.querySelector('.error_hashtag').classList.remove('hidden');
  }
  else {
    form.querySelector('.error_hashtag').classList.add('hidden');
  }
}
function onFormSubmit(evt) {
  if (!validateHashtag()){
    evt.preventDefault();
    form.querySelector('.error_hashtag').classList.remove('hidden');
  }
  else {
    form.querySelector('.error_hashtag').classList.add('hidden');
  }
}

function openPublication() {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.body.classList.add('modal-open');
  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onPublicationKeydown);
  commentField.addEventListener('keydown', onFieldKeydown);
  hashtagField.addEventListener('keydown', onFieldKeydown);
  commentField.addEventListener('input', onCommentFieldInput);
  hashtagField.addEventListener('input', onHashtagFieldInput);
  form.addEventListener('submit', onFormSubmit);
}

uploadFile.addEventListener('change', () => {
  openPublication();
});

function closePublication() {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPublicationKeydown);
  commentField.removeEventListener('keydown', onFieldKeydown);
  hashtagField.removeEventListener('keydown', onFieldKeydown);
  commentField.removeEventListener('input', onCommentFieldInput);
  hashtagField.removeEventListener('input', onHashtagFieldInput);
  form.removeEventListener('submit', onFormSubmit);
  form.reset();
}

function validateHashtag() {
  const hashtagPattern = /^(|#[a-zA-Zа-яА-Я0-9]{1,19})$/;
  const hashtagArray = hashtagField.value.toLowerCase().trim().split(/\s+/);

  for (const hashtag of hashtagArray) {
    if (!hashtagPattern.test(hashtag)) {
      return false;
    }
  }

  if (hashtagArray.length > 5) {
    return false;
  }

  const uniqueElements = new Set(hashtagArray);
  if (uniqueElements.size !== hashtagArray.length) {
    return false;
  }

  return true;
}
