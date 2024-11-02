import {previewImage} from './form-upload.js';
const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const scaleInputValue = document.querySelector('.scale__control--value');
const STEP_SCALE = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;

function scaleImage(valueScale = DEFAULT_SCALE) {
  previewImage.style.transform = `scale(${valueScale/100})`;
  scaleInputValue.value = `${valueScale}%`;
}

function onSmallerButtonClick() {
  const currentValueScale = parseInt(scaleInputValue.value, 10);
  let newValueScale = currentValueScale - STEP_SCALE;
  if (newValueScale < MIN_SCALE) {
    newValueScale = MIN_SCALE;
  }
  scaleImage(newValueScale);
}

function onBiggerButtonClick() {
  const currentValueScale = parseInt(scaleInputValue.value, 10);
  let newValueScale = currentValueScale + STEP_SCALE;

  if (newValueScale > MAX_SCALE) {
    newValueScale = MAX_SCALE;
  }
  scaleImage(newValueScale);
}

function resetScaleDefault() {
  scaleImage(DEFAULT_SCALE);
}

buttonSmaller.addEventListener('click', onSmallerButtonClick);
buttonBigger.addEventListener('click', onBiggerButtonClick);

export {resetScaleDefault};
