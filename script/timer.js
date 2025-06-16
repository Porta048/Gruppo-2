let timeLeft = 60;
const countdownDisplay = document.getElementById("countdown");

const countdownInterval = setInterval(() => {
  timeLeft--;
  countdownDisplay.textContent = timeLeft + " secondi";

  if (timeLeft <= 0) {
    clearInterval(countdownInterval);
    countdownDisplay.textContent = "Tempo scaduto!";
  }
}, 1000);
