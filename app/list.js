const listsEl = document.querySelectorAll('[data-lista]');

const plural = {
  'iene': 'inees',
  'dolar': 'dólares'
}

function showList({ listId, exhibitionName, value }) {
  listsEl.forEach((listEl) => {
    listEl.id === listId ? showPrice({ list: listEl, exhibitionName, value }) : null;
  });
}

function showPrice({ exhibitionName, value, list }) {
  list.innerHTML = '';

  for(let i = 1; i <= 1000; i = i * 10) {
    const li = document.createElement('li');
    li.innerHTML = `${i} ${i === 1 ? exhibitionName.singular : exhibitionName.plural }: R$ ${(value * i).toFixed(2)}`;
    list.appendChild(li);
  }
}

export { showList };
