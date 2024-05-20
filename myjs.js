let hours = document.querySelector(".hour"),
    minutes = document.querySelector(".min"),
    seconds = document.querySelector(".sec"),
    intervalId;

function timer(hour, min, sec) {
    let time = new Date();

    time.setHours(hour);
    time.setMinutes(min);
    time.setSeconds(sec);
    let formattedHour = time.getHours().toString().padStart(2, '0');
    let formattedMin = time.getMinutes().toString().padStart(2, '0');
    let formattedSec = time.getSeconds().toString().padStart(2, '0');

    startT = localStorage.getItem("startT");
    if (startT) {
        [formattedHour, formattedMin, formattedSec] = startT.split(",");
    } else {
        time = new Date();
        time.setHours(hour);
        time.setMinutes(min);
        time.setSeconds(sec);
        formattedHour = time.getHours().toString().padStart(2, '0');
        formattedMin = time.getMinutes().toString().padStart(2, '0');
        formattedSec = time.getSeconds().toString().padStart(2, '0');

        startT = [formattedHour, formattedMin, formattedSec];
        localStorage.setItem("startT", startT.join(','));
    }

    hours.innerText = formattedHour;
    minutes.innerText = formattedMin;
    seconds.innerText = formattedSec;

    if (!intervalId) {
        intervalId = setInterval(function () {
            formattedSec--;
            if (formattedSec < 0) {
                formattedSec = 59;
                formattedMin--;
                if (formattedMin < 0) {
                    formattedMin = 59;
                    formattedHour--;
                    if (formattedHour < 0) {
                        resetTimer();
                        timer(23, 59, 59);
                        return;
                    }
                }
            }

            let startT = [formattedHour, formattedMin, formattedSec];
            localStorage.setItem("startT", startT.join(','));

            hours.textContent = formattedHour.toString().padStart(2, '0');
            minutes.textContent = formattedMin.toString().padStart(2, '0');
            seconds.textContent = formattedSec.toString().padStart(2, '0');
        }, 1000)
    }
    intervalId;
}

function resetTimer() {
    clearInterval(intervalId);
    localStorage.removeItem("startT");
    hours.innerText = "00";
    minutes.innerText = "00";
    seconds.innerText = "00";
}

document.addEventListener("DOMContentLoaded", function () {
    timer(23, 59, 59);
})

