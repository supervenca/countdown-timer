window.addEventListener('DOMContentLoaded', () => {

let deadline = new Date('2022-03-15');

resetDeadLine();

function resetDeadLine() {
    let today = new Date;
    if(today > deadline) {
        deadline.setFullYear(today.getFullYear()+ 1)
    }
}

function getTimeRemaining (endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60) % 24)),
        minutes = Math.floor((t / 1000 / 60 ) % 60),
        seconds = Math.floor((t / 1000) % 60);

    return {
        'total': t,
        'days' : days,
        'hours': hours,
        'minutes' :minutes,
        'seconds' : seconds
    };
}

function getZero (num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
} //this function puts zero before one-digit numbers: 01,02,03 etc.

function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
        const t = getTimeRemaining(endtime);

        function zeroStop(timeValue, timeSelector) {

            if (timeValue <= 0) {
                timeSelector.innerHTML = '00';
            } else {
                timeSelector.innerHTML = getZero(timeValue);
            } //stops timer at the deadline
        }

        zeroStop(t.days, days);
        zeroStop(t.hours, hours);
        zeroStop(t.minutes, minutes);
        zeroStop(t.seconds, seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
}

setClock('.timer', deadline);

});
