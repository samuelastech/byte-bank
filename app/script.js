import { showPrice } from "./list.js";

const dollarChart = document.getElementById('graficoDolar');

const chart = new Chart(dollarChart , {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Dólar',
      data: [],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

setInterval(connectToAPI, 5000);

async function connectToAPI() {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
    const data = await response.json();
    const time = getHour();
    addData({ chart, label: time, data: data.USDBRL.ask });
    showPrice({ name: 'Dólar', value: data.USDBRL.ask });
  } catch (error) {
    console.log(error);
  }
}

function getHour() {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

function addData({ chart, label, data }) {
  chart.data.labels.push(label);
  console.log(data)
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  chart.update();
}
