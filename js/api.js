function getData(onSuccess, onFail) {
  fetch('https://25.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        onFail('Не удалось загрузить публикации других пользователей');
      }
      return response.json();
    })
    .then((data) => onSuccess(data))
    .catch(() => onFail('Не удалось загрузить публикации других пользователей'));
}

function sendData(onSuccess, onFail, body) {
  fetch(
    'https://25.javascript.htmlacademy.pro/kekstagram',
    {
      method: 'POST',
      body: body,
    },
  ).then((response) => {
    if (!response.ok) {
      onFail();
    }
    onSuccess();
  }).catch(() => {
    onFail();
  });
}

export {getData, sendData};
