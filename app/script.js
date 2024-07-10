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

function getHour() {
  return new Date().toLocaleString('pt-Br', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function addData({ chart, label, data }) {
  chart.data.labels.push(label);
  console.log(data)
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  chart.update();
}

const workerDollar = new Worker('./app/workers/workerDollar.js');

workerDollar.postMessage('');

workerDollar.onmessage = ({ data }) => {
  const time = getHour();
  addData({ chart, label: time, data });
  showPrice({ name: 'Dólar', value: data });
}
