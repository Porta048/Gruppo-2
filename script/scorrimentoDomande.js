/**
 * FUNZIONE: aggiornaContatore
 * SCOPO: Aggiorna il testo del contatore delle domande (es. "QUESTION 2 / 10").
 * - Prende il numero della domanda attuale da `currentQuestionIndex`.
 * - Aggiorna l'HTML per mostrare il progresso.
 */
const aggiornaContatore = () => {
  const questionCounter = document.querySelector(".question-counter p");
  if (questionCounter) {
    // Nota: Aggiungiamo +1 perché gli array partono da 0
    questionCounter.innerHTML = `QUESTION ${
      currentQuestionIndex + 1
    } <span>/ 10</span>`;
  }
};

/**
 * FUNZIONE: procediAllaProssimaDomanda
 * SCOPO: Gestisce il passaggio da una domanda all'altra.
 * - Aumenta l'indice per passare alla domanda successiva.
 * - Se ci sono ancora domande:
 *   - Mostra la nuova domanda.
 *   - Aggiorna il contatore.
 *   - Fa ripartire il timer.
 * - Se le domande sono finite:
 *   - Reindirizza alla pagina dei risultati.
 */
const procediAllaProssimaDomanda = () => {
  currentQuestionIndex++;

  // Controlla se ci sono ancora domande nell'array `questions`
  if (currentQuestionIndex < questions.length) {
    creaDomanda(currentQuestionIndex); // Mostra la domanda successiva
    aggiornaContatore(); // Aggiorna il contatore (es. "3 / 10")
    startTimer(); // Fa ripartire il timer da 60 secondi
  } else {
    // --- SALVATAGGIO DATI E REINDIRIZZAMENTO ---
    // Se il quiz è finito (non ci sono più domande nell'array),
    // dobbiamo salvare i dati necessari per la pagina dei risultati.

    // Usiamo localStorage, una memoria del browser che persiste anche dopo il cambio di pagina.
    // Salviamo lo 'score' finale calcolato in 'creazioneDomanda.js'.
    localStorage.setItem("score", score);
    // Salviamo anche il numero totale di domande per poter calcolare le percentuali.
    localStorage.setItem("quiz", questions.length);

    // Reindirizza alla pagina dei risultati
    console.log(
      `Quiz terminato! Punteggio finale: ${score}/${questions.length}`
    );
    window.location.href = "results.html";
  }
};
