/* eslint import/no-cycle:0 */ // --> OFF
/* eslint  import/prefer-default-export:0 */ // --> OFF

const ws = new WebSocket('wss://homeworkahj8eventsource.herokuapp.com');
ws.addEventListener('open', () => {
  console.log('connected');
});

const nameModal = document.getElementsByClassName('choosename')[0];
const btnGo = document.getElementsByClassName('go')[0];
const text = document.getElementById('text');

const writeMessage = document.getElementsByClassName('write__message')[0];
const app = document.getElementsByClassName('app')[0];
const friendList = document.getElementsByTagName('ul')[0];
const nameField = document.getElementsByTagName('input')[0];

ws.addEventListener('message', (evt) => {
  console.log(evt);
  if (evt.data === 'Такое имя уже есть!') {
    alert('Выбери, пожалуйста, другое имя, такое уже есть :(');
  } else {
    nameModal.classList.add('hidden');
    app.classList.remove('hidden');
    friendList.insertAdjacentHTML('beforeend', `<li>${nameField.value}</li>`);
  }
});

const btn = document.getElementsByTagName('button')[0];
btn.onclick = function () {
  const nickname = nameField.value;
  ws.send(nickname);
};

btnGo.onclick = function () {
  const previousElement = writeMessage.previousElementSibling;
  previousElement.insertAdjacentHTML('afterend', `<div class="message notme">${text.value}</div>`);
};
