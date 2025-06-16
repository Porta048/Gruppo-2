// Variabili globali per il controllo del timer
let timerInterval;
let timeLeft;
let timerChart;

const totalTime = 60; // Tempo totale in secondi

// Funzione per aggiornare il timer e il grafico
const updateTimer = () => {
  timeLeft--;

  // Aggiorna il grafico e il numero
  if (timerChart) {
    timerChart.data.datasets[0].data = [timeLeft, totalTime - timeLeft];
    timerChart.update();
  }
  document.getElementById('timerNumber').textContent = timeLeft > 0 ? timeLeft : "0";

  // Se il tempo scade, avanza alla prossima domanda
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    // Reindirizza alla pagina successiva definita nell'HTML
    if (typeof nextPage !== 'undefined') {
      window.location.href = nextPage;
    } else {
      console.error('La variabile nextPage non è definita.');
    }
  }
};

// Funzione per resettare e avviare il timer
const startTimer = () => {
  clearInterval(timerInterval); // Assicura che non ci siano timer multipli attivi
  timeLeft = totalTime;
  document.getElementById('timerNumber').textContent = timeLeft;

  // Resetta il grafico
  if (timerChart) {
    timerChart.data.datasets[0].data = [timeLeft, 0];
    timerChart.update();
  }
  
  // Avvia il nuovo intervallo
  timerInterval = setInterval(updateTimer, 1000);
};


document.addEventListener('DOMContentLoaded', () => {
    const canvasElement = document.getElementById('timerChart');
    if (!canvasElement) {
        console.error("Elemento canvas del timer non trovato!");
        return;
    }
    const ctx = canvasElement.getContext('2d');

    // Crea il grafico (se non esiste già)
    if (!timerChart) {
        timerChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [totalTime, 0],
                    backgroundColor: ['#00e0ff', '#3a2a4d'],
                    borderWidth: 0
                }]
            },
            options: {
                cutout: '80%',
                responsive: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                animation: {
                    duration: 0 // Disabilita l'animazione per aggiornamenti istantanei
                }
            }
        });
    }

    // Avvia il timer per la prima domanda
    startTimer();
});
