// Attende che tutto il DOM sia caricato prima di eseguire lo script
document.addEventListener('DOMContentLoaded', (event) => {
    
    // --- IMPOSTAZIONI DEL TIMER ---
    const totalTime = 60; // Tempo totale in secondi
    let timeLeft = totalTime;

    // --- ELEMENTI DEL DOM ---
    // Recupera il canvas per il grafico e l'elemento per il numero del timer
    const canvasElement = document.getElementById('timerChart');
    const timerNumberElement = document.getElementById('timerNumber');

    // Se uno degli elementi non viene trovato, interrompe lo script per evitare errori
    if (!canvasElement || !timerNumberElement) {
        console.error("Elementi del timer (canvas o numero) non trovati nel DOM!");
        return;
    }

    const ctx = canvasElement.getContext('2d');

    // --- CREAZIONE DEL GRAFICO (TIMER) CON CHART.JS ---
    const timerChart = new Chart(ctx, {
      type: 'doughnut', // Tipo di grafico
      data: {
        datasets: [{
          data: [timeLeft, totalTime - timeLeft], // Dati: tempo rimasto vs tempo trascorso
          backgroundColor: ['#00e0ff', '#3a2a4d'], // Colori delle due sezioni
          borderWidth: 0 // Nessun bordo
        }]
      },
      options: {
        cutout: '80%', // Spessore del cerchio
        responsive: false, // Disabilita la responsività di Chart.js per mantenere dimensioni fisse
        plugins: {
          legend: { display: false }, // Nasconde la legenda
          tooltip: { enabled: false } // Disabilita i tooltip al passaggio del mouse
        }
      }
    });

    // --- FUNZIONE DI AGGIORNAMENTO DEL TIMER ---
    function updateTimer() {
      timeLeft--; // Decrementa il tempo rimasto

      // Aggiorna i dati e il testo del grafico
      timerChart.data.datasets[0].data = [timeLeft, totalTime - timeLeft];
      timerChart.update(); // Ridisegna il grafico
      timerNumberElement.textContent = timeLeft > 0 ? timeLeft : "0";

      // Controlla se il tempo è scaduto
      if (timeLeft <= 0) {
        clearInterval(timerInterval); // Ferma l'intervallo
        timerNumberElement.textContent = "0";

        // --- REDIRECT AUTOMATICO ---
        // Se la variabile 'nextPage' è definita nell'HTML, reindirizza a quella pagina
        if (typeof nextPage !== "undefined") {
          window.location.href = nextPage;
        } else {
          // Altrimenti, va alla pagina dei risultati come fallback
          window.location.href = "results.html";
        }
      }
    }

    // --- AVVIO DEL TIMER ---
    // Avvia l'intervallo che chiama la funzione updateTimer ogni secondo (1000 ms)
    const timerInterval = setInterval(updateTimer, 1000);
