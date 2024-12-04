import './rendering-minies.js';
import './form-upload.js';
import './slider.js';
import './image-scale.js';
import {renderMinies} from './rendering-minies.js';
import {showLoadingError} from './utils.js';
import { getData } from './api.js';

getData(
  (publications) => renderMinies(publications),
  () => showLoadingError('Не удалось загрузить публикации других пользователей')
);
