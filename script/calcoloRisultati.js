document.addEventListener("DOMContentLoaded", () => {
  // Per prima cosa, recuperiamo i dati che ci servono dal localStorage.
  // Lo 'score' è il punteggio, 'total' è il numero di domande totali del quiz.
  // Usiamo parseInt per assicurarci che siano numeri e non testo.
  // Se non troviamo nulla, li impostiamo a 0 per sicurezza.
  const score = parseInt(localStorage.getItem("score"), 10) || 0;
  const total = parseInt(localStorage.getItem("quiz"), 10) || 1; // Partiamo da 1 per evitare divisioni per zero

  // Calcoliamo le risposte sbagliate, la percentuale di risposte giuste e sbagliate.
  // Il .toFixed(1) serve per avere una sola cifra dopo la virgola.
  const wrong = total - score;
  const correctPercentage = ((score / total) * 100).toFixed(1);
  const wrongPercentage = ((wrong / total) * 100).toFixed(1);

  // Ora che abbiamo i dati, li inseriamo nell'HTML per mostrarli all'utente.
  // Selezioniamo i vari elementi tramite il loro ID e aggiorniamo il contenuto.
  const correctPerc = document.getElementById("correct-percentage");
  correctPerc.innerHTML = `Correct <br> <span>${correctPercentage}%</span>`;

  const correctValue = document.getElementById("correct-value");
  correctValue.innerText = `${score}/${total} questions`;

  const wrongPerc = document.getElementById("wrong-percentage");
  wrongPerc.innerHTML = `Wrong <br> <span>${wrongPercentage}%</span>`;

  const wrongValue = document.getElementById("wrong-value");
  wrongValue.innerText = `${wrong}/${total} questions`;

  // Qui decidiamo quale messaggio mostrare in base al risultato.
  // Se la percentuale di risposte corrette è almeno 60, l'esame è superato.
  const examState = document.getElementById("exam");
  if (correctPercentage >= 60) {
    examState.innerHTML = `
        <h2>Congratulations! <br> <span>You passed the exam.</span></h2>
        <p>We'll send you the certificate <br> in few minutes. <br> Check your email (including <br> promotions / spam folder)</p>
      `;

    // E ora, il tocco finale per chi se l'è meritato: una pioggia di coriandoli!
    // Usiamo la libreria canvas-confetti per festeggiare il superamento dell'esame.
    const duration = 5 * 1000; // L'effetto durerà 5 secondi
    const animationEnd = Date.now() + duration;
    // Impostazioni di base per i coriandoli, come la velocità e la diffusione.
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    // Funzione per generare un numero casuale in un intervallo.
    // Ci serve per far partire i coriandoli da punti sempre diversi.
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    // Creiamo un intervallo che si ripete ogni 250 millisecondi.
    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now(); // Calcoliamo quanto tempo manca alla fine.

      // Se il tempo è scaduto, fermiamo tutto.
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      // Riduciamo il numero di particelle man mano che il tempo passa.
      const particleCount = 50 * (timeLeft / duration);
      // Lanciamo due "esplosioni" di coriandoli da posizioni casuali in basso,
      // una a sinistra e una a destra, per un effetto più ricco.
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  } else {
    // Altrimenti, mostriamo un messaggio di incoraggiamento.
    examState.innerHTML = `
        <h2>Unfortunately, <br> <span>you did not pass.</span></h2>
        <p>Try again to improve <br> your score!</p>
      `;
  }

  // --- LOGICA DELLA CIAMBELLA (CHART.JS) ---

  // Prepariamo i dati per il grafico: le risposte sbagliate e quelle giuste.
  const chartData = {
    labels: ["Wrong", "Correct"],
    datasets: [
      {
        data: [wrong, score], // I nostri dati calcolati prima
        backgroundColor: ["#D20094", "#00FFFF"], // Colori per le due sezioni
        borderWidth: 0, // Nessun bordo, per un look più pulito
      },
    ],
  };

  // Configuriamo l'aspetto e il comportamento del grafico.
  const chartConfig = {
    type: "doughnut", // Tipo di grafico: ciambella
    data: chartData,
    options: {
      animation: false, // Abbiamo tolto le animazioni come richiesto
      cutout: "70%", // Questo definisce lo spessore della ciambella
      plugins: {
        legend: {
          display: false, // Non mostriamo la legenda standard
        },
        tooltip: {
          enabled: true, // Ma mostriamo i dettagli al passaggio del mouse
        },
      },
    },
  };

  // Infine, prendiamo l'elemento <canvas> dall'HTML e ci disegniamo sopra il grafico.
  const doughnutCanvas = document.querySelector(".doughnut");
  if (doughnutCanvas) {
    new Chart(doughnutCanvas, chartConfig);
  }
});
