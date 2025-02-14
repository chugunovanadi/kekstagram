import './rendering-minies.js';
import './form-upload.js';
import './slider.js';
import './image-scale.js';
import './filter.js';
import {renderMinies} from './rendering-minies.js';
import {showLoadingError, debounce} from './utils.js';
import { getData } from './api.js';
import {activateFilter, filterPosts, setFilterClick} from './filter.js';
const RERENDER_DELAY = 500;

getData(
  (publications) =>
  {
    renderMinies(filterPosts(publications));
    activateFilter();
    setFilterClick(debounce(() => renderMinies(filterPosts(publications)), RERENDER_DELAY));
  },
  () => showLoadingError('Не удалось загрузить публикации других пользователей')
);
