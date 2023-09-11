const startButtonElement = document.querySelector('.js-start-btn');
const displayElement = document.querySelector('.js-time-box');
const resetButtonElement = document.querySelector('.js-reset-btn');
const armElement = document.querySelector('.js-arm');

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
// prettier-ignore
const armSpinning = armElement
	.animate(
		[{ transform: 'rotate(360deg)' }], 
		{
			duration: 1000,
			iterations: Infinity,
		}
);
armSpinning.pause();
// prettier-ignore
const buttonClick = document.querySelector('.js-click')
	.animate(
		[{transform: 'translateY(0px)'},
		{transform: 'translateY(1px)'},
		{transform: 'translateY(0px)'},
	],
		{
			duration: 100,
		}
);
buttonClick.pause();

function startStopwatch() {
	startButtonElement.classList.add('stop-btn');
	displayElement.classList.add('is-timebox-toggled');
	startButtonElement.innerHTML = 'STOP';
	armSpinning.play();
	buttonClick.play();
}

function stopStopwatch() {
	startButtonElement.classList.remove('stop-btn');
	startButtonElement.innerHTML = 'Start';
	armSpinning.pause();
	buttonClick.play();
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
document.body.addEventListener('keyup', event => {
	if (event.key === 'r') {
		resetStopwatch();
	}
});
function updateDisplay() {
	const currentTime = isRunning
		? Date.now() - startTime + accumulator
		: accumulator;
	displayElement.innerHTML = formatTime(currentTime);
}
let accumulator = 0;
function runStopwatch() {
	if (isRunning) {
		clearInterval(intervalId);
		stopStopwatch();
		accumulator += Date.now() - startTime;
		startTime = 0;
	} else {
		if (startTime === 0) {
			startTime = Date.now();
		}
		intervalId = setInterval(updateDisplay, 100);
		startStopwatch();
	}
	isRunning = !isRunning;
}
let timeoutId;

function resetStopwatch() {
	clearInterval(intervalId);
	stopStopwatch();
	armSpinning.cancel();
	startTime = 0;
	accumulator = 0;
	isRunning = false;
	updateDisplay();
	clearTimeout(timeoutId);
	timeoutId = setTimeout(() => {
		if (!isRunning) {
			displayElement.classList.remove('is-timebox-toggled');
		}
	}, 1500);
}

updateDisplay();
