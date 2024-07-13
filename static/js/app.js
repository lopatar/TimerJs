const timeLabel = document.getElementById('cas');
const timeHoursElement = document.getElementById('timeHours');
const timeMinutesElement = document.getElementById('timeMinutes');
const timeSecondsElement = document.getElementById('timeSeconds');

var totalSecondsLeft;
var intervalId;

var timeUnitsToAdd;
var extraTimeUnits;

function setTime() {
    clearInterval(intervalId);

    const timeHours = parseInt(timeHoursElement.value);
    const timeMinutes = parseInt(timeMinutesElement.value);
    const timeSeconds = parseInt(timeSecondsElement.value);

    const totalSeconds = (timeHours * 3600) + (timeMinutes * 60) + timeSeconds;

    if (totalSeconds === 0) {
        alert('Proč?!');
        return;
    }

    totalSecondsLeft = totalSeconds;
    intervalId = setInterval(processTime, 1000);

    timeLabel.removeAttribute('class');
    timeLabel.removeAttribute('hidden');

    timeHoursElement.value = 0;
    timeMinutesElement.value = 0;
    timeSecondsElement.value = 0;
}

function updateValue(hours) {
    const timeHours = parseInt(timeHoursElement.value);
    const timeMinutes = parseInt(timeMinutesElement.value);
    const timeSeconds = parseInt(timeSecondsElement.value);

    if (hours) {
        if (timeMinutes >= 60) {
            calculateTimeUnitsLeft(timeMinutes);
            timeHoursElement.value = timeHours + Math.trunc(timeUnitsToAdd);
            timeMinutesElement.value = extraTimeUnits;
        }
    } else {
        if (timeSeconds >= 60) {
            calculateTimeUnitsLeft(timeSeconds);
            timeMinutesElement.value = timeMinutes + Math.trunc(timeUnitsToAdd);
            timeSecondsElement.value = extraTimeUnits;
        }
    }
}

function calculateTimeUnitsLeft(timeMinutesOrSeconds) {
    timeUnitsToAdd = timeMinutesOrSeconds / 60;
    extraTimeUnits = Math.trunc((timeUnitsToAdd % 1) * 60);
}

function inflectWord(number) {
    if (number === 1) {
        return 'a';
    }

    if (number === 2 || number === 3 || number === 4) {
        return 'y';
    }

    return '';
}

function processTime() {
    if (--totalSecondsLeft === 0) {
        const audio = new Audio('static/audio/sound.mp3');
        audio.loop = false;

        audio.play().then(() => {
            timeLabel.setAttribute('class', 'theEnd');
            timeLabel.innerText = 'Čas vypršel!';
            clearInterval(intervalId);
        });

        return;
    }

    const totalMinutesLeft = Math.trunc(totalSecondsLeft / 60);
    const secondsLeft = totalSecondsLeft - (totalMinutesLeft * 60);
    const hoursLeft = Math.trunc(totalMinutesLeft / 60);
    const minutesLeft = totalMinutesLeft - (hoursLeft * 60);

    timeLabel.innerText = `${hoursLeft} hodin${inflectWord(hoursLeft)} ${minutesLeft} minut${inflectWord(minutesLeft)} ${secondsLeft} sekund${inflectWord(secondsLeft)}`;
}