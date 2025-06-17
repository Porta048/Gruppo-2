/**
 * SCRIPT PER LA PAGINA DEI RISULTATI (results.html)
 * 
 * SCOPO:
 * 1. Recuperare il punteggio e il numero totale di domande dal localStorage.
 * 2. Calcolare le percentuali di risposte corrette e sbagliate.
 * 3. Aggiornare l'HTML per mostrare questi risultati all'utente.
 * 4. Creare e configurare un grafico a ciambella (usando Chart.js) per visualizzare i risultati.
 * 5. Mostrare un messaggio di superamento o fallimento del test in base al punteggio.
 */

// L'evento 'DOMContentLoaded' assicura che lo script venga eseguito solo dopo che l'intera pagina HTML è stata caricata.
document.addEventListener("DOMContentLoaded", () => {
  
  // --- 1. RECUPERO DATI DAL LOCALSTORAGE ---

  // Recuperiamo il valore di 'score' salvato nella pagina del quiz.
  // `localStorage.getItem('score')` restituisce una stringa, quindi usiamo `parseInt` per convertirla in un numero intero.
  // `|| 0` (OR logico) è una sicurezza: se 'score' non esiste nel localStorage (o è nullo), il valore di `score` sarà 0.
  const score = parseInt(localStorage.getItem("score"), 10) || 0;
  
  // Facciamo lo stesso per il numero totale di domande.
  // Qui, la sicurezza `|| 1` evita una divisione per zero nei calcoli successivi se 'quiz' non fosse trovato.
  const total = parseInt(localStorage.getItem("quiz"), 10) || 1;
  
  // Calcoliamo il numero di risposte sbagliate semplicemente sottraendo lo score dal totale.
  const wrong = total - score;

  // --- 2. CALCOLO PERCENTUALI ---

  // Calcoliamo la percentuale di risposte corrette.
  // `toFixed(1)` formatta il numero per avere una sola cifra decimale (es. 87.5).
  const correctPercentage = ((score / total) * 100).toFixed(1);

  // Calcoliamo la percentuale di risposte sbagliate.
  const wrongPercentage = ((wrong / total) * 100).toFixed(1);

  // --- 3. AGGIORNAMENTO CONTENUTO HTML ---

  // Selezioniamo l'elemento H2 per la percentuale di risposte corrette.
  const correctPerc = document.getElementById("correct-percentage");
  // Inseriamo il testo e la percentuale calcolata usando un template literal. `<br>` crea un a capo.
  correctPerc.innerHTML = `Correct <br> ${correctPercentage}%`;
  
  // Selezioniamo il paragrafo per il dettaglio delle risposte corrette.
  const correctValue = document.getElementById("correct-value");
  // Inseriamo il numero di risposte corrette sul totale (es. "8/10 questions").
  correctValue.innerText = `${score}/${total} questions`;
  
  // Selezioniamo l'elemento H2 per la percentuale di risposte sbagliate.
  const wrongPerc = document.getElementById("wrong-percentage");
  wrongPerc.innerHTML = `Wrong <br> ${wrongPercentage}%`;

  // Selezioniamo il paragrafo per il dettaglio delle risposte sbagliate.
  const wrongValue = document.getElementById("wrong-value");
  wrongValue.innerText = `${wrong}/${total} questions`;

  // --- 4. CONFIGURAZIONE E CREAZIONE GRAFICO (CHART.JS) ---

  // Definiamo i dati che Chart.js userà per disegnare il grafico.
  const chartData = {
    labels: ["Wrong", "Correct"], // Etichette per le due sezioni del grafico
    datasets: [
      {
        // I valori numerici che determinano la grandezza di ogni fetta della ciambella.
        data: [wrong, score], 
        // I colori delle due sezioni (rispettivamente per "Wrong" e "Correct").
        backgroundColor: ["#D20094", "#00FFFF"],
        // Impostiamo a 0 per rimuovere qualsiasi bordo tra le fette, per un look più pulito.
        borderWidth: 0, 
      },
    ],
  };

  // Definiamo le opzioni di configurazione per personalizzare l'aspetto e il comportamento del grafico.
  const chartConfig = {
    type: "doughnut", // Specifichiamo che vogliamo un grafico a ciambella.
    data: chartData,  // Colleghiamo i dati definiti sopra.
    options: {
      // Configurazione delle animazioni.
      animation: {
        // La durata dell'animazione di riempimento è legata al punteggio:
        // un punteggio più alto produce un'animazione più lunga e gratificante.
        duration: correctPercentage * 20, 
      },
      // Controlla la dimensione del "buco" centrale. "70%" significa che l'anello occuperà il 30% dello spazio.
      cutout: "70%", 
      // I 'plugins' sono estensioni che aggiungono funzionalità o modificano quelle esistenti.
      plugins: {
        // Configurazione della legenda (le etichette colorate che descrivono i dati).
        legend: {
          display: false, // La nascondiamo perché i nostri dati sono già chiari.
        },
        // Configurazione del tooltip (il riquadro che appare al passaggio del mouse).
        tooltip: {
          enabled: true, // Lo manteniamo attivo per mostrare i dettagli al passaggio del mouse.
        },
      },
    },
  };

  // Troviamo l'elemento <canvas> nel nostro HTML.
  const doughnutCanvas = document.querySelector(".doughnut");
  // Controlliamo che l'elemento esista prima di provare a disegnarci sopra.
  if (doughnutCanvas) {
    // Creiamo una nuova istanza di Chart, passandogli il canvas e la configurazione.
    // Questo comando disegna effettivamente il grafico sulla pagina.
    new Chart(doughnutCanvas, chartConfig);
  }

  // --- 5. MESSAGGIO DI STATO ESAME ---

  // Selezioniamo il div al centro della ciambella dove mostreremo il messaggio finale.
  const examState = document.getElementById("exam");
  // Controlliamo se la percentuale di risposte corrette è uguale o superiore a 60.
  if (correctPercentage >= 60) {
    // Se sì, l'utente ha superato l'esame. Inseriamo il messaggio di congratulazioni.
    examState.innerHTML = `
      <h2>Congratulations! <br> <span>You passed the exam.</span></h2>
      <p>We'll send you the certificate in few minutes. Check your email (including promotions / spam folder)</p>
    `;
  } else {
    // Altrimenti, l'utente non ha superato l'esame. Inseriamo il messaggio di incoraggiamento.
    examState.innerHTML = `
      <h2>Unfortunately, <br> <span>you did not pass.</span></h2>
      <p>Try again to improve your score!</p>
    `;
  }
});
