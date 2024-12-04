import {isEscapeKey} from './utils.js';
import {resetScaleDefault} from './image-scale.js';
import { sendData } from './api.js';

const form = document.querySelector('.img-upload__form');
const previewImage = document.querySelector('.img-upload__preview');
const uploadFile = form.querySelector('#upload-file');
const cancelButton = form.querySelector('#upload-cancel');
const commentField = form.querySelector('.text__description');
const hashtagField = form.querySelector('.text__hashtags');
const submitButton = form.querySelector('.img-upload__submit');
const successTitle = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const successTitleBox = successTitle.querySelector('.success__inner');
const successSendButton = successTitle.querySelector('.success__button');
const errorTitle = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorTitleBox = errorTitle.querySelector('.error__inner');
const errorSendButton = errorTitle.querySelector('.error__button');
const MAX_VALID_LENGTH_HASHTAG = 5;
const MAX_VALID_LENGTH_DESCRIPTION = 140;

function onCancelButtonClick() {
  closePublication();
}
function onPublicationKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (errorTitle.classList.contains('hidden')) {
      closePublication();
    }
  }
}
function onFieldKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
}
function onCommentFieldInput() {
  if (commentField.value.length === MAX_VALID_LENGTH_DESCRIPTION) {
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
function onSuccessSendButtonClick() {
  successTitle.classList.add('hidden');
}
function onSuccessTitleKeydown(evt) {
  if (isEscapeKey(evt)) {
    successTitle.classList.add('hidden');
  }
}
function onSuccessTitleClick(evt){
  if (!successTitleBox.contains(evt.target)) {
    successTitle.classList.add('hidden');
  }
}
function onErrorSendButtonClick(){
  errorTitle.classList.add('hidden');
}
function onErrorTitleKeydown(evt){
  if (isEscapeKey(evt)) {
    errorTitle.classList.add('hidden');
    evt.stopPropagation();
  }
}
function onErrorTitleClick(evt){
  if (!errorTitleBox.contains(evt.target)) {
    errorTitle.classList.add('hidden');
  }
}

function onSendSuccess() {
  document.body.append(successTitle);
  successTitle.classList.remove('hidden');
  successSendButton.addEventListener('click', onSuccessSendButtonClick);
  document.addEventListener('keydown', onSuccessTitleKeydown);
  document.addEventListener('click', onSuccessTitleClick);
}

function onSendError() {
  document.body.append(errorTitle);
  errorTitle.classList.remove('hidden');
  errorSendButton.addEventListener('click', onErrorSendButtonClick);
  document.addEventListener('keydown', onErrorTitleKeydown);
  document.addEventListener('click', onErrorTitleClick);
}

function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
}

function unblockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}

function onFormSubmit(evt) {
  evt.preventDefault();
  if (!validateHashtag()){
    form.querySelector('.error_hashtag').classList.remove('hidden');
  }
  else {
    form.querySelector('.error_hashtag').classList.add('hidden');

    const formData = new FormData(evt.target);
    blockSubmitButton();
    sendData(
      () => {
        closePublication();
        unblockSubmitButton();
        onSendSuccess();
      },
      () => {
        unblockSubmitButton();
        onSendError();
      },
      formData
    );
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
  successSendButton.removeEventListener('click', onSuccessSendButtonClick);
  document.removeEventListener('keydown', onSuccessTitleKeydown);
  document.removeEventListener('click', onSuccessTitleClick);
  errorSendButton.removeEventListener('click', onErrorSendButtonClick);
  document.removeEventListener('keydown', onErrorTitleKeydown);
  document.removeEventListener('click', onErrorTitleClick);
  form.removeEventListener('submit', onFormSubmit);
  form.reset();
  resetScaleDefault();
}

function validateHashtag() {
  const hashtagPattern = /^(|#[a-zA-Zа-яА-Я0-9]{1,19})$/;
  const hashtagArray = hashtagField.value.toLowerCase().trim().split(/\s+/);

  for (const hashtag of hashtagArray) {
    if (!hashtagPattern.test(hashtag)) {
      return false;
    }
  }

  if (hashtagArray.length > MAX_VALID_LENGTH_HASHTAG) {
    return false;
  }

  const uniqueElements = new Set(hashtagArray);
  if (uniqueElements.size !== hashtagArray.length) {
    return false;
  }

  return true;
}

export {form, previewImage};
