const URL = 'https://economia.awesomeapi.com.br/json/last/USD-BRL';

async function connectToAPI() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    postMessage(data.USDBRL.ask);
  } catch (error) {
    console.log(error);
  }
}

addEventListener('message', () => {
  connectToAPI();
  setInterval(connectToAPI, 5000);
});
