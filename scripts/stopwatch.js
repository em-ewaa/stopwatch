const startButtonElement = document.querySelector('.js-start-btn');
const displayElement = document.querySelector('.js-time-box');
const resetButtonElement = document.querySelector('.js-reset-btn');

function formatTime(milliseconds) {
	const date = new Date(milliseconds);
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const seconds = date.getSeconds().toString().padStart(2, '0');
	const millisecs = date.getMilliseconds().toString().padStart(3, '0');
	return `${minutes}:${seconds}:${millisecs}`;
}
function formatHour(milliseconds) {
	const date = new Date(milliseconds);
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const seconds = date.getSeconds().toString().padStart(2, '0');
	const hours = date.getHours().toString().padStart(2, '0');
	return `${hours}:${minutes}:${seconds}`;
}

function startStopwatch() {
	startButtonElement.classList.add('stop-btn');
	displayElement.classList.add('is-timebox-toggled');
	startButtonElement.innerHTML = 'STOP';
}
function stopStopwatch() {
	startButtonElement.classList.remove('stop-btn');
	startButtonElement.innerHTML = 'Start';
}

let isRunning = false;
let startTime = 0;
let intervalId;

startButtonElement.addEventListener('click', () => {
	runStopwatch();
});
startButtonElement.addEventListener('keyup', event => {
	if (event.key === ' ') {
		runStopwatch();
	}
});
document.body.addEventListener('keyup', event => {
	if (event.key === ' ') {
		runStopwatch();
	}
});
resetButtonElement.addEventListener('click', () => {
	resetStopwatch();
});

function updateDisplay() {
	const currentTime = isRunning ? Date.now() - startTime : startTime;
	displayElement.innerHTML = formatTime(currentTime);
}

function runStopwatch() {
	if (isRunning) {
		clearInterval(intervalId);
		stopStopwatch();
	} else {
		if (startTime === 0) {
			startTime = Date.now();
		};
		console.log(startTime);
		intervalId = setInterval(updateDisplay, 100);
		startStopwatch();
		console.log(startTime);
	}
	isRunning = !isRunning;
}

function resetStopwatch() {
	clearInterval(intervalId);
	stopStopwatch();
	startTime = 0;
	isRunning = false;
	updateDisplay();
	setTimeout(() => {
		displayElement.classList.remove('is-timebox-toggled');
	}, 1500);
}

updateDisplay();