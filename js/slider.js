import {form, previewImage, uploadFile} from './form-upload.js';
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

const sliderEffectParameters = [
  {
    name: 'none',
    filter:'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
];
const defaultEffect = sliderEffectParameters[0];
let chosenEffect = defaultEffect;
sliderElement.classList.add('hidden');

noUiSlider.create(sliderElement, {
  range: {
    min: defaultEffect.min,
    max: defaultEffect.max,
  },
  start: defaultEffect.max,
  step: defaultEffect.step,
  connect: 'lower',
});

function updateSliderByChosenEffect() {
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    start: chosenEffect.max,
    step: chosenEffect.step,
  });
  if (chosenEffect === defaultEffect) {
    sliderElement.classList.add('hidden');
  }
}

function onFormChange(evt) {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = sliderEffectParameters.find((element) => element.name === evt.target.value);
  updateSliderByChosenEffect();
}

form.addEventListener('change', onFormChange);

function onSliderUpdate() {
  previewImage.style.filter = 'none';
  previewImage.className = '';
  effectLevelValue.value = '';
  if (chosenEffect === defaultEffect) {
    sliderElement.classList.add('hidden');
  }
  const sliderValue = sliderElement.noUiSlider.get();
  effectLevelValue.value = sliderValue ;
  previewImage.style.filter = `${chosenEffect.filter}(${sliderValue}${chosenEffect.unit})`;
  previewImage.classList.add(`effects__preview--${chosenEffect.name}`);
}

sliderElement.noUiSlider.on('update', onSliderUpdate);

uploadFile.addEventListener('change', () => {
  previewImage.style.filter = 'none';
  previewImage.className = '';
  effectLevelValue.value = '';
  chosenEffect = defaultEffect;
  sliderElement.classList.add('hidden');
});
