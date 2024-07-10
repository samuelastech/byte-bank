const list = document.getElementById('dolar');

function showPrice({ name, value }) {
  list.innerHTML = '';

  for(let i = 1; i <= 1000; i = i * 10) {
    const li = document.createElement('li');
    li.innerHTML = `${i} ${name}: R$ ${(value * i).toFixed(2)}`;
    list.appendChild(li);
  }
}

export { showPrice };
