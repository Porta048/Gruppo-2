document.addEventListener("DOMContentLoaded", () => {
  const score = parseInt(localStorage.getItem("score"), 10) || 0;
  // recupero lo score con localStorage.getItem e lo pongo in base
  // decimale mettendo il 10 alla fine
  const total = parseInt(localStorage.getItem("quiz"), 10) || 1;
  // recupero il totale con localStorage.getItem e lo pongo in base
  // decimale mettendo il 10 alla fine
  const wrong = total - score;
  // il valore dele domande errate saranno il nostro totale
  const correctPercentage = ((score / total) * 100).toFixed(1);
  // la nostra percentuale di risposte corrette sarà lo score
  // sul totale per 100, aggiungo il metodo toFixed(1) per arrotondare
  // ad una cifra decimale
  const wrongPercentage = ((wrong / total) * 100).toFixed(1);
  // la nostra percentuale di risposte scorrette sarà wrong,
  // dichiarato prima,
  // sul totale per 100, aggiungo il metodo toFixed(1) per arrotondare
  // ad una cifra decimale

  const correctPerc = document.getElementById("correct-percentage");
  // targhetto h2
  correctPerc.innerHTML = `Correct <br> <span>${correctPercentage}%</span>`;
  // gli assegno il valore
  const correctValue = document.getElementById("correct-value");
  // targhetto p
  correctValue.innerText = `${score}/${total} questions`;
  // gli assegno il valore
  const wrongPerc = document.getElementById("wrong-percentage");
  // targhetto h2
  wrongPerc.innerHTML = `Wrong <br> <span>${wrongPercentage}%</span>`;
  // gli assegno il valore
  const wrongValue = document.getElementById("wrong-value");
  // targhetto p
  wrongValue.innerText = `${wrong}/${total} questions`;

  // --- Logica per il messaggio di superamento/fallimento esame ---
  const examState = document.getElementById("exam");
  if (correctPercentage >= 60) {
    examState.innerHTML = `
        <h2>Congratulations! <br> <span>You passed the exam.</span></h2>
        <p>We'll send you the certificate <br> in few minutes. <br> Check your email (including <br> promotions / spam folder)</p>
      `;
  } else {
    examState.innerHTML = `
        <h2>Unfortunately, <br> <span>you did not pass.</span></h2>
        <p>Try again to improve <br> your score!</p>
      `;
  }
  // --- LOGICA DELLA CIAMBELLA (CHART.JS) ---

  // 1. Dati per il grafico (risposte sbagliate e giuste)
  const chartData = {
    labels: ["Wrong", "Correct"],
    datasets: [
      {
        data: [wrong, score], // Dati dinamici
        backgroundColor: ["#D20094", "#00FFFF"], // Colori per sbagliate e giuste
        borderWidth: 0, // Nessun bordo per un look più pulito
        hoverOffset: 20, // Effetto al passaggio del mouse
      },
    ],
  };

  // 2. Configurazione del grafico
  const chartConfig = {
    type: "doughnut", // Tipo di grafico
    data: chartData,
    options: {
      cutout: "70%", // Spessore della ciambella
      plugins: {
        legend: {
          display: false, // Nasconde la legenda (etichette "Wrong", "Correct")
        },
        tooltip: {
          enabled: true, // Mostra i dettagli al passaggio del mouse
        },
      },
    },
  };

  // 3. Creazione del grafico
  // Prende l'elemento <canvas> dall'HTML e ci disegna sopra il grafico
  const doughnutCanvas = document.querySelector(".doughnut");
  if (doughnutCanvas) {
    new Chart(doughnutCanvas, chartConfig);
  }
});
