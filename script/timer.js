/**
 * SCRIPT PER LA GESTIONE DEL TIMER (benchmark.html)
 * 
 * SCOPO:
 * 1. Creare un timer visivo a forma di anello che si "svuota".
 * 2. Gestire un conto alla rovescia numerico da 60 secondi.
 * 3. Passare automaticamente alla domanda successiva quando il tempo scade.
 * 4. Fornire funzioni per avviare e resettare il timer a ogni nuova domanda.
 */

// --- VARIABILI GLOBALI ---

// `timerInterval` conterrà l'ID del nostro `setInterval`. Questo ID è necessario
// per poter fermare il timer (con `clearInterval`) quando l'utente risponde
// o quando il tempo scade, evitando che più timer girino contemporaneamente.
let timerInterval; 

// `timeLeft` tiene traccia dei secondi rimanenti. Viene decrementata ogni secondo.
let timeLeft;      

// `timerChart` è l'oggetto che rappresenta il nostro grafico a ciambella (il timer visivo).
// Lo teniamo in una variabile globale per poterlo aggiornare facilmente.
let timerChart;    

// `totalTime` è una costante che definisce la durata del timer in secondi.
// Usare una costante rende il codice più leggibile e facile da modificare.
const totalTime = 60; 

/**
 * FUNZIONE: updateTimer
 * SCOPO: Aggiorna lo stato del timer sia visivamente che numericamente.
 * Viene eseguita una volta al secondo da `setInterval`.
 */
const updateTimer = () => {
  // Decrementa di 1 il tempo rimasto.
  timeLeft--;

  // Aggiorna il grafico e il testo del timer.
  if (timerChart) {
    // Il grafico è composto da due parti: il tempo rimasto (in blu) e il tempo trascorso (in "trasparente").
    // Aggiornando `data` e chiamando `.update()`, ridisegniamo l'anello per riflettere il nuovo `timeLeft`.
    timerChart.data.datasets[0].data = [timeLeft, totalTime - timeLeft];
    timerChart.update();
  }
  
  // Aggiorna il numero mostrato all'interno dell'anello.
  // Usiamo un operatore ternario per assicurare che non mostri numeri negativi se c'è un piccolo ritardo.
  document.getElementById('timerNumber').textContent = timeLeft > 0 ? timeLeft : "0";

  // Controlla se il tempo è scaduto.
  if (timeLeft <= 0) {
    // Ferma il `setInterval` per evitare che `updateTimer` continui a essere eseguita.
    clearInterval(timerInterval);
    
    // Passa alla domanda successiva.
    // Controlliamo che la funzione esista (è definita in un altro file) per evitare errori.
    if (typeof procediAllaProssimaDomanda === 'function') {
      procediAllaProssimaDomanda();
    } else {
      console.error('La funzione procediAllaProssimaDomanda non è disponibile.');
    }
  }
};

/**
 * FUNZIONE: startTimer
 * SCOPO: (Ri)avvia il timer. Viene chiamata all'inizio del quiz e per ogni nuova domanda.
 */
const startTimer = () => {
  // "Pulisce" qualsiasi timer precedente. Questo è fondamentale per evitare
  // che più timer vengano eseguiti in parallelo, causando accelerazioni e bug.
  clearInterval(timerInterval); 
  
  // Resetta il tempo a 60 secondi.
  timeLeft = totalTime;
  
  // Aggiorna subito il numero visualizzato a 60.
  document.getElementById('timerNumber').textContent = timeLeft;

  // Resetta il grafico per mostrarlo di nuovo come un anello "pieno".
  if (timerChart) {
    timerChart.data.datasets[0].data = [timeLeft, 0]; // 60 secondi rimanenti, 0 trascorsi.
    timerChart.update();
  }
  
  // Avvia il nuovo conto alla rovescia, eseguendo `updateTimer` ogni 1000 millisecondi (1 secondo).
  timerInterval = setInterval(updateTimer, 1000);
};

/**
 * ESECUZIONE AL CARICAMENTO DELLA PAGINA
 * Questo codice viene eseguito una sola volta, quando la pagina HTML è pronta.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Troviamo l'elemento <canvas> nel nostro HTML, che servirà come "tela" per il grafico.
    const canvasElement = document.getElementById('timerChart');
    if (!canvasElement) {
        console.error("Elemento canvas del timer non trovato!");
        return;
    }
    const ctx = canvasElement.getContext('2d'); // Otteniamo il contesto 2D, necessario per disegnare.

    // Creiamo il grafico solo se non è già stato creato.
    if (!timerChart) {
        timerChart = new Chart(ctx, {
            type: 'doughnut', // Tipo di grafico.
            data: {
                datasets: [{
                    // Dati iniziali: il grafico parte "pieno".
                    data: [totalTime, 0], 
                    // Colori: il primo per il tempo rimanente, il secondo per il tempo trascorso (quasi trasparente).
                    backgroundColor: ['#00e0ff', '#3a2a4d'], 
                    borderWidth: 0
                }]
            },
            options: {
                // Dimensione del buco centrale (più alta è la percentuale, più sottile è l'anello).
                cutout: '80%', 
                responsive: false, // Disattiviamo la responsività per mantenere dimensioni fisse.
                plugins: {
                    legend: { display: false }, // Nascondiamo legende...
                    tooltip: { enabled: false } // ...e tooltip, perché non servono per un timer.
                },
                animation: {
                    duration: 0 // Disattiviamo le animazioni di Chart.js per un aggiornamento secco e istantaneo.
                }
            }
        });
    }

    // Una volta che tutto è pronto, facciamo partire il timer per la prima domanda.
    startTimer();
});
