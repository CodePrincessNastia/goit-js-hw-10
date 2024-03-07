import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delayInput = form.elements['delay'];
  const stateInput = form.elements['state'];
  let state;
  for (const radio of stateInput) {
    if (radio.checked) {
      state = radio.value;
      break;
    }
  }
  const delay = delayInput.value;

  const notificationPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  notificationPromise.then(
    delay => {
      iziToast.success({
        title: 'Notification',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    },
    delay => {
      iziToast.error({
        title: 'Notification',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    }
  );
});