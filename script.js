let deadline = new Date('2022-08-18T00:00:00');
const congrats = document.querySelector('.congrats');
let today = new Date();

function resetDeadline() {
    // Увеличиваем год на 1 каждый раз, когда текущая дата превышает или равна дедлайну
    while (today >= deadline) {
        deadline.setFullYear(deadline.getFullYear() + 1);
        
    }
}

function getTimeRemaining(endtime) {
    const now = new Date();
    const t = endtime - now,
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60) % 24)),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

// Функция форматирования чисел
function getZero(num) {
    return num >= 0 && num < 10 ? `0${num}` : num;
}

// Функция установки таймера
function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds');

    // Функция обновления таймера
    function updateClock() {
        const t = getTimeRemaining(endtime);

        if (t.total <= 0) {
            clearInterval(timeInterval);
            resetDeadline();
            setClock(selector, deadline);
        } else {
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
        }
    }

    const timeInterval = setInterval(updateClock, 1000);
    updateClock(); // Первоначальный вызов для избежания начальной задержки
}

resetDeadline();
setClock('.timer', deadline);

console.log(today - deadline);
//if(today - deadline = less than 24 hours){congrats.innerHTML = "congrats"}