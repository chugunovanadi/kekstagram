const bigPictureСontainer=document.querySelector('.big-picture');
const pictureCancel=document.querySelector('#picture-cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsList=document.querySelector('.social__comments');

function openBigPicture({url, comments, likes, description}) {
  bigPictureСontainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');

  renderPictureData({url, comments, likes, description});
  renderComments({comments});

  pictureCancel.onclick = () => {
    closeBigPicture();
  };

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeBigPicture();
    }
  });
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
}

export {openBigPicture};
