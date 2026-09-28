const STORAGE_KEY = "pomodoroMinutes";
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;
const DEFAULT_MINUTES = 25;

function getConfiguredMinutes() {
  const stored = Number(localStorage.getItem(STORAGE_KEY));
  if (Number.isInteger(stored) && stored >= MIN_MINUTES && stored <= MAX_MINUTES) {
    return stored;
  }
  return DEFAULT_MINUTES;
}

let remainingSeconds = getConfiguredMinutes() * 60;
let timerId = null;

const timerDisplay = document.getElementById("timerDisplay");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(remainingSeconds);
}

function tick() {
  if (remainingSeconds <= 0) {
    stopTimer();
    return;
  }
  remainingSeconds -= 1;
  updateDisplay();
}

function startTimer() {
  if (timerId !== null) {
    return;
  }
  timerId = setInterval(tick, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
}

function stopTimer() {
  if (timerId === null) {
    return;
  }
  clearInterval(timerId);
  timerId = null;
  startButton.disabled = false;
  stopButton.disabled = true;
}

function resetTimer() {
  stopTimer();
  remainingSeconds = getConfiguredMinutes() * 60;
  updateDisplay();
}

const clockDisplay = document.getElementById("clockDisplay");

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  clockDisplay.textContent = hours + ":" + minutes + ":" + seconds;
  clockDisplay.dateTime = now.toISOString();
}

stopButton.disabled = true;
updateDisplay();
updateClock();
setInterval(updateClock, 1000);
