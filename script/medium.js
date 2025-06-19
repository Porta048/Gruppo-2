const questions = [
  {
    type: "multiple",
    difficulty: "medium",
    category: "movie",
    question:
      "Qual è il titolo del film del 1991 in cui Anthony Hopkins interpreta un cannibale?",
    correct_answer: "Il silenzio degli innocenti",
    incorrect_answers: ["Karate kid", "Seven", "Intervista col vampiro"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "movie",
    question:
      "In quale cult di Quentin Tarantino c'è il famoso brano di Chuck Barry You Never Can Tell?",
    correct_answer: "Pulp Fiction",
    incorrect_answers: ["Jackie Brown", "Dracula", "Kill Bill: Vol. 1"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "movie",
    question: "In quale film recitano insieme Laura Dern e Jeff Goldblum?",
    correct_answer: "Jurassic Park",
    incorrect_answers: ["La mosca", "Terminetor", "Massima copertura"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "movie",
    question:
      "In quale anno Will Hunting - Genio ribelle vince l'Oscar alla miglior sceneggiatura originale?",
    correct_answer: "1998",
    incorrect_answers: ["1998", "2004", "1999"],
  },
  {
    type: "movie",
    difficulty: "medium",
    category: "movie",
    question:
      "Come si chiama l'attore che interpreta il personaggio di Bobby Briggs in Twin Peaks?",
    correct_answer: "Dana Ashbrook",
    incorrect_answers: ["Richard Beymer", "Fantozzi", "Kyle MacLachlan"],
  },
  {
    type: "movie",
    difficulty: "medium",
    category: "movie",
    question: "In quale film anni '90 Robert De Niro interpreta Jimmy Conway?",
    correct_answer: "Quei bravi ragazzi",
    incorrect_answers: ["Amanti, primedonne", "Il padrino", "Noi siamo Angeli"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "movie",
    question:
      "Qual è il nome del regista del noto film Edward mani di forbice?",
    correct_answer: "Tim Burton",
    incorrect_answers: [
      "Steven Spilberg",
      "Quentin Tarantino",
      "James Cameron",
    ],
  },
  {
    type: "movie",
    difficulty: "medium",
    category: "movie",
    question:
      "La prima puntata di Walker Texas Ranger quando fu distribuita per la prima volta in Italia",
    correct_answer: "16 Gennaio 1996",
    incorrect_answers: ["14 Ottobre 1998", "7 febbraio 1999", "4 Giugno 1990"],
  },
  {
    type: "movie",
    difficulty: "medium",
    category: "movie",
    question:
      "In quale serie tv il tema musicale di apertura è il brano I'll Be There For You?",
    correct_answer: "Friends",
    incorrect_answers: [
      "Baywatch",
      "Dawson's Creek",
      "Buffy l'ammazza vampiri",
    ],
  },
  {
    type: "movie",
    difficulty: "medium",
    category: "movie",
    question: "In quale famoso film vediamo spiccare la figura di Liam Neeson?",
    correct_answer: "Schindler's List",
    incorrect_answers: ["Man in Black", "Le ali della libertà", "Forrest Gump"],
  },
];
const mischiaArray = (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    const b = i + Math.floor(Math.random() * (array.length - i));
    [array[i], array[b]] = [array[b], array[i]];
  }
  return array;
};

// Salva le risposte dell'utente
let userAnswers = [];
let currentQuestionIndex = 0;
let score = 0; // Punteggio iniziale. Viene incrementato per ogni risposta corretta.

// Seleziona risposta e aggiorna visualmente
const selezionaRisposta = (answer, selectedDiv) => {
  document.querySelectorAll(".answer-option").forEach((div) => {
    div.classList.remove("selected");
  });

  selectedDiv.classList.add("selected");
  selectedDiv.querySelector('input[type="radio"]').checked = true;

  userAnswers[currentQuestionIndex] = answer;

  // Mostra il pulsante "Avanti" quando viene selezionata una risposta
  const nextButton = document.getElementById("next-button");
  if (nextButton) {
    nextButton.style.display = "block";
  }
};

/*
 * QUESTA FUNZIONE VIENE COMMENTATA E LASCIATA VUOTA INTENZIONALMENTE
 * per evitare conflitti con la funzione centralizzata in scorrimentoDomande.js
 *
const prossimaAnswerOption = () => {
  // Il codice qui è stato rimosso.
};
*/

// Seleziona e prepara i contenitori
const divH2 = document.getElementById("h2-domanda");
const h2 = document.createElement("h2");
divH2.appendChild(h2);

const risposteDiv = document.getElementById("risposte");
risposteDiv.innerHTML = "";

// Funzione per creare una domanda
const creaDomanda = (index) => {
  const domanda = questions[index];
  h2.innerHTML = domanda.question;
  risposteDiv.innerHTML = "";

  const tutteLeRispostePossibili = [
    domanda.correct_answer,
    ...domanda.incorrect_answers,
  ];

  const risposteMischiate = mischiaArray([...tutteLeRispostePossibili]);

  risposteMischiate.forEach((answer, answerIndex) => {
    const singolaRispostaDiv = document.createElement("div");
    singolaRispostaDiv.className = "answer-option";

    const selezionata = userAnswers[currentQuestionIndex] === answer;
    if (selezionata) {
      singolaRispostaDiv.classList.add("selected");
    }

    singolaRispostaDiv.innerHTML = `
        <input type="radio" name="answer" value="${answer}" id="answer-${answerIndex}" ${
      selezionata ? "checked" : ""
    }>
        <label for="answer-${answerIndex}">${answer}</label>
      `;

    singolaRispostaDiv.addEventListener("click", () =>
      selezionaRisposta(answer, singolaRispostaDiv)
    );

    risposteDiv.appendChild(singolaRispostaDiv);
  });

  // Nascondi il pulsante "Avanti" all'inizio di ogni nuova domanda
  const nextButton = document.getElementById("next-button");
  if (nextButton) {
    nextButton.style.display = "none";
  }
};

// Avvio della prima domanda
creaDomanda(currentQuestionIndex);

// Aggiorna il contatore per la prima domanda (se la funzione è disponibile)
if (typeof aggiornaContatore === "function") {
  aggiornaContatore();
}
