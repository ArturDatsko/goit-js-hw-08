import throttle from 'lodash.throttle';

const KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');
let saveForm = {
  email: '',
  message: '',
};
form.addEventListener('submit', onSubmit);
form.addEventListener('input', throttle(onInput, 500));
onHoldText();
function onInput(e) {
  saveForm = {
    email: input.value,
    message: textarea.value,
  };
  localStorage.setItem(KEY, JSON.stringify(saveForm));
}
function onSubmit(e) {
  e.preventDefault();
  if (!input.value || !textarea.value) {
    alert('Enter Email and Message!');
    return;
  }
  e.currentTarget.reset();
  localStorage.removeItem(KEY);
  console.log(saveForm);
}
function onHoldText() {
  const holdText = localStorage.getItem(KEY);
  if (holdText) {
    saveForm = JSON.parse(holdText);
    input.value = saveForm.email;
    textarea.value = saveForm.message;
  }
}
