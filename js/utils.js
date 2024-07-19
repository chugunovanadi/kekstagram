function getRandomPositiveInteger (a, b) {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
}
function checkCommentLength (string, maxLength) {
  return string.length <= maxLength;
}

export {getRandomPositiveInteger};
