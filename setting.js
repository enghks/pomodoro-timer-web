const STORAGE_KEY = "pomodoroMinutes";
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;
const DEFAULT_MINUTES = 25;

const timerInput = document.getElementById("timerInput");
const saveButton = document.getElementById("saveButton");

function isValidMinutes(value) {
  if (value === "") {
    return false;
  }
  const minutes = Number(value);
  return Number.isInteger(minutes) && minutes >= MIN_MINUTES && minutes <= MAX_MINUTES;
}

function handleInputChange() {
  saveButton.disabled = !isValidMinutes(timerInput.value);
}

function loadStoredMinutes() {
  const stored = Number(localStorage.getItem(STORAGE_KEY));
  timerInput.value =
    Number.isInteger(stored) && stored >= MIN_MINUTES && stored <= MAX_MINUTES
      ? stored
      : DEFAULT_MINUTES;
}

function saveTimerSetting() {
  if (!isValidMinutes(timerInput.value)) {
    return;
  }
  localStorage.setItem(STORAGE_KEY, timerInput.value);
  location.href = "index.html";
}

loadStoredMinutes();
handleInputChange();
