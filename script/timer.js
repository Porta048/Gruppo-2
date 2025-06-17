// Variabili globali per il controllo del timer
let timerInterval; // Contiene l'intervallo del timer, per poterlo fermare
let timeLeft;      // Tiene traccia dei secondi rimanenti
let timerChart;    // Oggetto che rappresenta il grafico circolare

const totalTime = 60; // Tempo totale in secondi per ogni domanda

/**
 * FUNZIONE: updateTimer
 * SCOPO: Viene chiamata ogni secondo per aggiornare il timer.
 * - Diminuisce il tempo di 1 secondo.
 * - Aggiorna il grafico circolare.
 * - Aggiorna il numero visualizzato.
 * - Se il tempo scade, passa alla domanda successiva.
 */
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
    // Usa il sistema intelligente di scorrimento domande
    if (typeof procediAllaProssimaDomanda === 'function') {
      procediAllaProssimaDomanda();
    } else {
      console.error('La funzione procediAllaProssimaDomanda non è disponibile.');
    }
  }
};

/**
 * FUNZIONE: startTimer
 * SCOPO: Fa partire il timer da 60 secondi.
 * - Ferma qualsiasi timer precedente.
 * - Imposta il tempo a 60 secondi.
 * - Resetta il grafico.
 * - Avvia il conto alla rovescia.
 */
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

/**
 * CODICE ESEGUITO AL CARICAMENTO DELLA PAGINA
 * - Prende il canvas dall'HTML.
 * - Crea il grafico circolare usando la libreria Chart.js.
 * - Fa partire il timer per la prima domanda.
 */
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
                    backgroundColor: ['#00e0ff', '#3a2a4d'], // Colore del tempo / Colore dello sfondo
                    borderWidth: 0
                }]
            },
            options: {
                cutout: '80%', // Spessore del cerchio
                responsive: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                animation: {
                    duration: 0 // Nessuna animazione per aggiornamenti puliti
                }
            }
        });
    }

    // Avvia il timer per la prima domanda
    startTimer();
});
