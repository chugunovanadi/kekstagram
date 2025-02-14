const filtersContainer = document.querySelector('.img-filters');
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};
const PICTURES_COUNT = 10;
let currentFilter = '';

function activateFilter() {
  filtersContainer.classList.remove('img-filters--inactive');
  currentFilter = Filter.DEFAULT;
}

function filterPosts(posts) {
  switch (currentFilter) {
    case Filter.RANDOM:
      return posts.slice().sort(sortRandomPosts).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED:
      return posts.slice().sort(sortDiscussionPosts);
    default:
      return posts.slice();
  }
}

function sortRandomPosts() {
  return Math.random() - 0.5;
}

function sortDiscussionPosts(postA, postB) {
  return postB.comments.length - postA.comments.length;
}

function setFilterClick(cb) {
  filtersContainer.addEventListener('click', (evt) => {

    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const activeButton = evt.target;

    if (activeButton.id === currentFilter) {
      return;
    }

    filtersContainer.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    activeButton.classList.add('img-filters__button--active');
    currentFilter = activeButton.id;
    cb();
  });
}

export {activateFilter, filterPosts, setFilterClick};
