/**
 * FUNZIONE: aggiornaContatore
 * SCOPO: Aggiorna il testo del contatore delle domande (es. "QUESTION 2 / 10").
 * - Prende il numero della domanda attuale da `currentQuestionIndex`.
 * - Aggiorna l'HTML per mostrare il progresso.
 */
const aggiornaContatore = () => {
  const questionCounter = document.querySelector('.question-counter p')
  if (questionCounter) {
    // Nota: Aggiungiamo +1 perché gli array partono da 0
    questionCounter.innerHTML = `QUESTION ${
      currentQuestionIndex + 1
    } <span>/ 10</span>`
  }
}

/**
 * FUNZIONE CENTRALIZZATA PER GESTIRE IL PULSANTE "AVANTI"
 * SCOPO:
 * - Controlla la risposta data.
 * - Mostra il feedback visivo (verde per corretto, rosso per sbagliato).
 * - Attende un breve periodo, poi passa alla domanda successiva.
 * Funziona per tutti i livelli di difficoltà.
 */
const prossimaAnswerOption = () => {
  // Disabilita i click su tutte le opzioni per evitare input doppi
  document.querySelectorAll('.answer-option').forEach((div) => {
    div.style.pointerEvents = 'none'
  })

  const nextButton = document.getElementById('next-button')
  if (nextButton) {
    nextButton.style.display = 'none'
  }

  const domandaCorrente = questions[currentQuestionIndex]
  const rispostaUtente = userAnswers[currentQuestionIndex] // Può essere undefined se il tempo scade

  const feedback = document.querySelector('.answer-option.selected')

  // Aggiunto controllo per assicurarsi che 'feedback' e 'rispostaUtente' esistano
  if (!feedback || !rispostaUtente) {
    // Se non c'è risposta (es. tempo scaduto), mostra solo quella corretta e vai avanti
    const tutteLeOpzioni = document.querySelectorAll('.answer-option')
    tutteLeOpzioni.forEach((opzione) => {
      const radioValue = opzione.querySelector('input[type="radio"]').value
      if (radioValue.trim() === domandaCorrente.correct_answer.trim()) {
        opzione.classList.add('correct')
      }
    })
  } else if (rispostaUtente.trim() === domandaCorrente.correct_answer.trim()) {
    feedback.classList.add('correct')
    score++
    console.log(`Risposta corretta! Punteggio attuale: ${score}`)
  } else {
    feedback.classList.add('wrong')
    console.log(`Risposta sbagliata. Punteggio attuale: ${score}`)

    // Cerca e colora la risposta corretta di verde
    const tutteLeOpzioni = document.querySelectorAll('.answer-option')
    tutteLeOpzioni.forEach((opzione) => {
      const radioValue = opzione.querySelector('input[type="radio"]').value
      if (radioValue.trim() === domandaCorrente.correct_answer.trim()) {
        opzione.classList.add('correct')
      }
    })
  }
  const img = document.querySelector('#pokemon-image-container img')
  img.classList.add('pokemon-image-reveal')
  // Attendi 1.5 secondi per mostrare il feedback, poi procedi
  setTimeout(() => {
    procediAllaProssimaDomanda()
  }, 1500)
}

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
  currentQuestionIndex++

  // Controlla se ci sono ancora domande nell'array `questions`
  if (currentQuestionIndex < questions.length) {
    creaDomanda(currentQuestionIndex) // Mostra la domanda successiva
    aggiornaContatore() // Aggiorna il contatore (es. "3 / 10")
    startTimer() // Fa ripartire il timer da 60 secondi
  } else {
    // --- SALVATAGGIO DATI E REINDIRIZZAMENTO ---
    // Se il quiz è finito (non ci sono più domande nell'array),
    // dobbiamo salvare i dati necessari per la pagina dei risultati.

    // Usiamo localStorage, una memoria del browser che persiste anche dopo il cambio di pagina.
    // Salviamo lo 'score' finale calcolato in 'creazioneDomanda.js'.
    localStorage.setItem('score', score)
    // Salviamo anche il numero totale di domande per poter calcolare le percentuali.
    localStorage.setItem('quiz', questions.length)

    // Reindirizza alla pagina dei risultati
    console.log(
      `Quiz terminato! Punteggio finale: ${score}/${questions.length}`
    )
    window.location.href = 'results.html'
  }
}
