
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css"

let date = new Date();
let pickDate;

iziToast.settings({
    timeout: 1000,
    icon: "",
});

const options = {
enableTime: true,
time_24hr: true,
defaultDate: new Date(),
minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] > date) {
            elements.btnStart.disabled = false;
            pickDate = selectedDates[0];
        }
        else {
            elements.btnStart.disabled = true;
            iziToast.error({
                message: '"Please choose a date in the future"',
                position: 'topRight',
            });
        }
},
};

const elements = {
    dateInput: document.querySelector("#datetime-picker"),
    btnStart: document.querySelector("[data-start]"),
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
}


elements.btnStart.disabled = true;
elements.btnStart.addEventListener("click", handlerDate)

flatpickr(elements.dateInput, options);

function handlerDate() {
    let ms;
    elements.btnStart.disabled = true;
    elements.dateInput.disabled = true;
    const timerId = setInterval(() => {
        date = new Date();
        ms = pickDate - date;
       if (ms<0) {
            clearInterval(timerId);
            return;
        }

        const convertDate = convertMs(ms);
        markup(convertDate)
       

    }, 1000)
}

function markup(convertDate) {
    elements.days.textContent = `${addLeadingZero(convertDate.days)}`;
    elements.hours.textContent = `${addLeadingZero(convertDate.hours)}`;
    elements.minutes.textContent = `${addLeadingZero(convertDate.minutes)}`;
    elements.seconds.textContent = `${addLeadingZero(convertDate.seconds)}`;
}

function addLeadingZero(value) {
    value += "";
    if (value.length < 2) {
        return value.padStart(2, 0);
    }
    
    return value;
}

function convertMs(ms) {
// Number of milliseconds per unit of time
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Remaining days
const days = Math.floor(ms / day);
// Remaining hours
const hours = Math.floor((ms % day) / hour);
// Remaining minutes
const minutes = Math.floor(((ms % day) % hour) / minute);
// Remaining seconds
const seconds = Math.floor((((ms % day) % hour) % minute) / second);

return { days, hours, minutes, seconds };
}