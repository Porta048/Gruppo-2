// Funzione per aggiornare il contatore delle domande
const aggiornaContatore = () => {
  const questionCounter = document.querySelector('.question-counter p');
  if (questionCounter) {
    questionCounter.innerHTML = `QUESTION ${currentQuestionIndex + 1} <span>/ 10</span>`;
  }
};

// Funzione per avanzare alla domanda successiva
const procediAllaProssimaDomanda = () => {
    // Incrementa l'indice della domanda corrente
    currentQuestionIndex++;
  
    // Controlla se ci sono altre domande
    if (currentQuestionIndex < questions.length) {
      // Se sì, crea la domanda successiva
      creaDomanda(currentQuestionIndex);
      // Aggiorna il contatore delle domande
      aggiornaContatore();
      // E riavvia il timer
      startTimer();
    } else {
      // Se le domande sono terminate, reindirizza alla pagina dei risultati
      console.log("Quiz terminato! Tutte le 10 domande completate.");
      window.location.href = "results.html";
    }
  };
