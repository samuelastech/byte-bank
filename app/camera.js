const startButton = document.querySelector('[data-video-botao]');
const cameraField = document.querySelector('[data-camera]');

/** @type {HTMLVideoElement} */
const video = document.querySelector('[data-video]');
const takePicture = document.querySelector('[data-tirar-foto]');

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('[data-video-canvas]');
const message = document.querySelector('[data-mensagem]');
const sendButton = document.querySelector('[data-enviar]');

let imageURL = '';

startButton.onclick = async () => {
  const startVideo = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
  startButton.style.display = 'none';
  cameraField.style.display = 'block';
  video.srcObject = startVideo;
};

takePicture.onclick = () => {
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  imageURL = canvas.toDataURL('image/jpeg');
  cameraField.style.display = 'none';
  message.style.display = 'block';
};

sendButton.onclick = () => {
  const register = JSON.parse(localStorage.getItem('register'));
  register['image'] = imageURL;
  localStorage.setItem('register', JSON.stringify(register));
  window.location.href = './abrir-conta-form-3.html'
};