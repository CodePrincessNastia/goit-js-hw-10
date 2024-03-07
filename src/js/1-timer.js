import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputDate = document.querySelector("#datetime-picker");
const startButton = document.querySelector("button[data-start]");

const dataDays = document.querySelector("span[data-days]");
const dataHours = document.querySelector("span[data-hours]");
const dataMinutes = document.querySelector("span[data-minutes]");
const dataSeconds = document.querySelector("span[data-seconds]");


let userSelectedDate;

startButton.disabled = true;

const optionsFlatpackr = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
  
      if (selectedDates[0].getTime() <= Date.now()) {
          iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                messageColor: 'white',
                messageSize: '16',
                backgroundColor: 'red',
                theme: 'dark',
                iconUrl: iconErr,
                position: 'topRight',
                timeout: 3000,
                });
          startButton.disabled = true;
      } else {
          startButton.disabled = false;
          userSelectedDate = selectedDates[0].getTime();
      };
  },
};

const fp = flatpickr(inputDate, optionsFlatpackr);

startButton.addEventListener("click", startCounter);

function startCounter(event) {
    inputDate.disabled = true;
    startButton.disabled = true;

    const intervalID = setInterval(() => {
        const timeLine = userSelectedDate - Date.now();
        const { days, hours, minutes, seconds } = convertMs(timeLine);
        
        dataDays.textContent = addLeadingZero(days);
        dataHours.textContent = addLeadingZero(hours);
        dataMinutes.textContent = addLeadingZero(minutes);
        dataSeconds.textContent = addLeadingZero(seconds);

        if (timeLine < 1000) {
            inputDate.disabled = false;
            clearInterval(intervalID);
        }
    }, 1000);
};

function addLeadingZero(val) {
   return String(val).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}