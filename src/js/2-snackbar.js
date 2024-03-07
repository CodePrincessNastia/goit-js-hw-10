import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const ourForm = document.querySelector(".form");

ourForm.addEventListener("submit", createPromise);

function createPromise(event) {
    event.preventDefault();
    const delay = Number.parseInt(ourForm.delay.value);

    const newPromise = new Promise((resolve, reject) => {
    
        setTimeout( () => {
            if (ourForm.elements.state.value === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
                }
        }, delay);
    })

    newPromise
        .then(() => {
            iziToast.success({
                title: 'OK',
                message: `Fulfilled promise in ${delay} ms`,
                messageColor: 'white',
                messageSize: '16',
                backgroundColor: 'green',
                theme: 'dark',
                iconUrl: iconOk,
                position: 'topRight',
            });
        })
        .catch(() => {
            iziToast.error({
                title: 'Error',
                message: `Rejected promise in ${delay} ms`,
                messageColor: 'white',
                messageSize: '16',
                backgroundColor: 'red',
                theme: 'dark',
                iconUrl: iconNeOk,
                position: 'topRight',
            });
        })
        .finally( () => {
            ourForm.reset();
        });
}