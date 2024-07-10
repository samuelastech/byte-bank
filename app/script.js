import { showList } from "./list.js";

const dollarChartEl = document.getElementById('graficoDolar');
const ieneChartEl = document.getElementById('graficoIene');

const dollarChart = new Chart(dollarChartEl, {
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

const ineneChart = new Chart(ieneChartEl, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Iene',
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
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  chart.update();
}

const workerDollar = new Worker('./app/workers/workerDollar.js');
const workerIene = new Worker('./app/workers/workerIene.js');

workerDollar.postMessage('');
workerIene.postMessage('');

workerDollar.onmessage = ({ data }) => {
  const time = getHour();
  addData({ chart: dollarChart, label: time, data });
  showList({
    listId: 'dolar',
    exhibitionName: {
      singular: 'dólar',
      plural: 'dólares'
    },
    value: data });
}

workerIene.onmessage = ({ data }) => {
  const time = getHour();
  addData({ chart: ineneChart, label: time, data });
  showList({
    listId: 'iene',
    exhibitionName: {
      singular: 'ienes',
      plural: 'ienes'
    },
    value: data });
}
