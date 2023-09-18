import throttle from 'lodash.throttle';

const KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

let saveForm = {};
form.addEventListener('submit', onSubmit);
form.addEventListener('input', throttle(onInput, 500));
onHoldText();

function onInput(e) {
  saveForm[e.target.name] = e.target.value.trim();
  localStorage.setItem(KEY, JSON.stringify(saveForm));
}

function onSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(KEY);
  console.log(saveForm);
  saveForm = {};
}

function onHoldText() {
  try {
    const holdText = localStorage.getItem(KEY);
    if (!holdText) return;
    saveForm = JSON.parse(holdText);
    Object.entries(saveForm).forEach(([key, val]) => {
      form.elements[key].value = val;
    });
  } catch ({ message }) {
    console.log(message);
  }
}
