document.addEventListener('DOMContentLoaded', function() {
    let timer;
    let isRunning = false;
    let countdownSeconds = 0;

    const timerDisplay = document.getElementById('timer');
    const startStopBtn = document.getElementById('startStop');
    const resetBtn = document.getElementById('reset');
    const twoMinutesBtn = document.getElementById('twoMinutes');
    const threeMinutesBtn = document.getElementById('threeMinutes');
    const fullscreenBtn = document.getElementById('fullscreenBtn'); // Added

    function updateDisplay(minutes, seconds) {
        timerDisplay.innerText = pad(minutes) + ':' + pad(seconds);
    }

    function startTimer(duration) {
        countdownSeconds = duration;
        if (!isRunning) {
            timer = setInterval(updateTime, 1000);
            isRunning = true;
        }
    }

    function updateTime() {
        let minutes = Math.floor(countdownSeconds / 60);
        let seconds = countdownSeconds % 60;

        updateDisplay(minutes, seconds);
        countdownSeconds--;

        if (countdownSeconds < 0) {
            clearInterval(timer);
            isRunning = false;
            playAlarm(); // Play alarm sound when the timer reaches zero
        } else if (countdownSeconds <= 10) {
            timerDisplay.classList.add('red-text', 'blink-text'); // Add red color and blinking effect
        }
    }

    function playAlarm() {
        const audio = new Audio('alarm.mp3'); // Replace 'alarm.mp3' with the path to your alarm sound file
        audio.play();
    }

    startStopBtn.addEventListener('click', function() {
        if (isRunning) {
            clearInterval(timer);
            isRunning = false;
            timerDisplay.classList.remove('red-text', 'blink-text'); // Remove red color and blinking effect
        } else {
            startTimer(countdownSeconds > 0 ? countdownSeconds : 60); // Default to 1 minute
        }
    });

    resetBtn.addEventListener('click', function() {
        clearInterval(timer);
        updateDisplay(0, 0);
        isRunning = false;
        countdownSeconds = 0;
        timerDisplay.classList.remove('red-text', 'blink-text'); // Remove red color and blinking effect
    });

    twoMinutesBtn.addEventListener('click', function() { startTimer(120); }); // 2 Minutes
    threeMinutesBtn.addEventListener('click', function() { startTimer(180); }); // 3 Minutes

    function pad(number) {
        return number < 10 ? '0' + number : number;
    }

    fullscreenBtn.addEventListener('click', function() {
        const timerElement = document.getElementById('timer');
        if (timerElement.requestFullscreen) {
            timerElement.requestFullscreen();
        } else if (timerElement.mozRequestFullScreen) {
            timerElement.mozRequestFullScreen();
        } else if (timerElement.webkitRequestFullscreen) {
            timerElement.webkitRequestFullscreen();
        }
    });
});
