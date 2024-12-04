function getRandomPositiveInteger (a, b) {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
}
function checkCommentLength (string, maxLength) {
  return string.length <= maxLength;
}
function isEscapeKey (evt) {
  return evt.key === 'Escape';
}
const SHOW_TIME = 7000;
function showLoadingError(message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '20px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => { alertContainer.remove(); }, SHOW_TIME);
}
export {getRandomPositiveInteger, isEscapeKey, showLoadingError};

