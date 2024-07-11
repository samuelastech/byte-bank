import { errorTypes, messages } from '../app/invalid.js';

const fields = document.querySelectorAll('[required]');
const form = document.querySelector('[data-formulario]');

form.onsubmit = (event) => {
  event.preventDefault();
  const data = {};
  fields.forEach((field) => data[field.name] = field.value);
  localStorage.setItem('register', JSON.stringify(data));
  window.location.href = './abrir-conta-form-2.html';
};

fields.forEach((field) => {
  field.oninvalid = (event) => event.preventDefault(); 
  field.onblur = checkField;
});

function checkField(event) {
  const { name: inputName, value, parentNode } = event.target;

  let message = '';
  switch (inputName) {
    case 'cpf':
      const valid = value.length >= 11 && isCPF(value);
      !valid && event.target.setCustomValidity('custom');
      break;

    case 'aniversario':
      const legal = value != null && isInLegalAge(value);
      !legal && event.target.setCustomValidity('custom');
      break;
  }

  errorTypes.forEach((error) => {
    if(event.target.validity[error]) {
      message = messages[inputName][error];
    }
  });

  const errorMessageEl = parentNode.querySelector('.mensagem-erro');
  if(!event.target.checkValidity()) {
    errorMessageEl.textContent = message;
  } else {
    errorMessageEl.textContent = '';
  }
}

function isCPF(value) {
  const cpf = value.replace(/\.|-/g, "");

  const repeatedNumbers = () => {
    const repeatedNumbers = [];
    for (let i = 0; i < 10; i++) {
      repeatedNumbers.push(`${i}`.repeat(11));
    }
    return repeatedNumbers.includes(cpf);
  };

  const firstDigit = () => {
    let sum = 0;
    let multiply = 10;

    for (let size = 0; size < 9; size++) {
      sum += cpf[size] * multiply;
      multiply--;      
    }

    sum = (sum * 10) % 11;

    if (sum === 10 || sum === 1) sum = 0;

    return sum != cpf[9];
  };

  const secondDigit = () => {
    let sum = 0;
    let multiply = 11;

    for (let size = 0; size < 10; size++) {
      sum += cpf[size] * multiply;
      multiply--;      
    }

    sum = (sum * 10) % 11;

    if (sum === 10 || sum === 1) sum = 0;

    return sum != cpf[10];
  };

  if (repeatedNumbers() || firstDigit() || secondDigit()) {
    return false;
  } else {
    return true;
  }
}

function isInLegalAge(value) {
  const date = new Date(value);
  const current = new Date();
  const eighteenYear = new Date(date.getUTCFullYear() + 18, date.getUTCMonth(), date.getUTCDate());
  return current >= eighteenYear;
}