/**
 * SCRIPT PER LE DOMANDE DIFFICILI (TEMA POKÉMON)
 * 
 * SCOPO:
 * 1. Definire un array di oggetti `questions`, dove ogni oggetto rappresenta una domanda.
 *    In questa versione "difficile", il gioco è un "Indovina il Pokémon".
 * 2. Ogni domanda contiene:
 *    - Il testo della domanda (sempre lo stesso).
 *    - L'URL dell'immagine di un Pokémon (da mostrare come silhouette).
 *    - La risposta corretta (il nome del Pokémon).
 *    - Un array di risposte sbagliate.
 * 3. Gestire la visualizzazione della domanda, dell'immagine e delle opzioni di risposta.
 * 4. Controllare se la risposta data dall'utente è corretta e aggiornare il punteggio.
 */

// Array contenente tutte le domande del quiz a tema Pokémon.
const questions = [
  {
    category: "Pokémon",
    question: "Indovina il nome del Pokémon",
    // L'URL punta all'immagine ufficiale del Pokémon.
    image_url: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png", // Pikachu
    correct_answer: "Pikachu",
    incorrect_answers: ["Raichu", "Pichu", "Jolteon"],
  },
  {
    category: "Pokémon",
    question: "Indovina il nome del Pokémon",
    image_url: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png", // Charmander
    correct_answer: "Charmander",
    incorrect_answers: ["Charmeleon", "Charizard", "Magmar"],
  },
  {
    category: "Pokémon",
    question: "Indovina il nome del Pokémon",
    image_url: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png", // Squirtle
    correct_answer: "Squirtle",
    incorrect_answers: ["Wartortle", "Blastoise", "Poliwag"],
  },
  {
    category: "Pokémon",
    question: "Indovina il nome del Pokémon",
    image_url: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png", // Bulbasaur
    correct_answer: "Bulbasaur",
    incorrect_answers: ["Ivysaur", "Venusaur", "Oddish"],
  },
  {
    category: "Pokémon",
    question: "Indovina il nome del Pokémon",
    // L'URL punta all'immagine ufficiale del Pokémon.
    image_url: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png", // Mewtwo (Leggendario)
    correct_answer: "Mewtwo",
    incorrect_answers: ["Mew", "Alakazam", "Hypno"],
  },
  {
    category: "Pokémon",
    question: "Indovina il nome del Pokémon",
    image_url: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/143.png", // Snorlax
    correct_answer: "Snorlax",
    incorrect_answers: ["Munchlax", "Slaking", "Lickitung"],
  },
  {
    category: "Pokémon",
    question: "Indovina il nome del Pokémon",
    // L'URL punta all'immagine ufficiale del Pokémon.
    image_url: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png", // Eevee
    correct_answer: "Eevee",
    incorrect_answers: ["Vaporeon", "Jolteon", "Flareon"],
  },
  {
    category: "Pokémon",
    question: "Indovina il nome del Pokémon",
    // L'URL punta all'immagine ufficiale del Pokémon.
    image_url: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/094.png", // Gengar
    correct_answer: "Gengar",
    incorrect_answers: ["Haunter", "Gastly", "Cloyster"],
  },
  {
    category: "Pokémon",
    question: "Indovina il nome del Pokémon",
    // L'URL punta all'immagine ufficiale del Pokémon.
    image_url: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/144.png", // Articuno (Leggendario)
    correct_answer: "Articuno",
    incorrect_answers: ["Zapdos", "Moltres", "Lugia"],
  },
  {
    category: "Pokémon",
    question: "Indovina il nome del Pokémon",
    image_url: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/129.png", // Magikarp
    correct_answer: "Magikarp",
    incorrect_answers: ["Gyarados", "Feebas", "Goldeen"],
  },
];

/**
 * FUNZIONE: mischiaArray
 * SCOPO: Prende un array e ne mescola gli elementi in modo casuale.
 * Utilizza l'algoritmo di Fisher-Yates per garantire una distribuzione uniforme.
 * È fondamentale per assicurare che la posizione della risposta corretta sia sempre diversa.
 * @param {Array} array - L'array da mischiare.
 * @returns {Array} L'array con gli elementi in ordine casuale.
 */
const mischiaArray = (array) => {
  // Cicla sull'array partendo dal primo elemento.
  for (let i = 0; i < array.length - 1; i++) {
    // Sceglie un indice casuale tra l'elemento corrente e la fine dell'array.
    const b = i + Math.floor(Math.random() * (array.length - i));
    // Scambia l'elemento corrente con l'elemento all'indice casuale.
    [array[i], array[b]] = [array[b], array[i]];
  }
  return array;
};

// --- VARIABILI DI STATO DEL QUIZ ---

// `userAnswers`: Un array che tiene traccia delle risposte date dall'utente.
// Non è strettamente usato per il calcolo del punteggio, ma è utile per logica futura (es. mostrare un riepilogo).
let userAnswers = [];
// `currentQuestionIndex`: Un numero che indica a quale domanda siamo arrivati. Parte da 0.
let currentQuestionIndex = 0;
// `score`: Il punteggio del giocatore. Parte da 0 e viene incrementato per ogni risposta corretta.
let score = 0;

/**
 * FUNZIONE: selezionaRisposta
 * SCOPO: Gestisce l'interazione dell'utente quando clicca su un'opzione di risposta.
 * - Evidenzia visivamente la risposta scelta.
 * - Memorizza la risposta data.
 * - Rende visibile il pulsante "AVANTI" per procedere.
 * @param {string} answer - Il testo della risposta scelta.
 * @param {HTMLElement} selectedDiv - L'elemento div cliccato dall'utente.
 */
const selezionaRisposta = (answer, selectedDiv) => {
  // Rimuove la classe 'selected' da tutte le opzioni per "deselezionare" le precedenti.
  document.querySelectorAll(".answer-option").forEach((div) => {
    div.classList.remove("selected");
  });

  // Aggiunge la classe 'selected' solo all'opzione cliccata per l'effetto visivo.
  selectedDiv.classList.add("selected");
  // Seleziona il radio button nascosto corrispondente (utile per la gestione del form).
  selectedDiv.querySelector('input[type="radio"]').checked = true;

  // Salva la risposta dell'utente nell'array, in posizione corrispondente all'indice della domanda.
  userAnswers[currentQuestionIndex] = answer;

  // Rende visibile il pulsante "AVANTI" per permettere di continuare.
  const nextButton = document.getElementById("next-button");
  if (nextButton) {
    nextButton.style.display = "block";
  }
};

/**
 * FUNZIONE: prossimaAnswerOption
 * SCOPO: Viene eseguita quando si clicca su "AVANTI".
 * - Controlla se la risposta data è corretta e aggiorna lo `score`.
 * - Chiama la funzione per passare alla domanda successiva.
 * - Nasconde di nuovo il pulsante "AVANTI".
 */
const prossimaAnswerOption = () => {
  // --- LOGICA DI CONTROLLO PUNTEGGIO ---
  const domandaCorrente = questions[currentQuestionIndex];
  const rispostaUtente = userAnswers[currentQuestionIndex];

  // Confronta la stringa della risposta utente con la risposta corretta.
  if (rispostaUtente === domandaCorrente.correct_answer) {
    score++; // Se corretto, incrementa il punteggio.
    console.log(`Risposta corretta! Punteggio attuale: ${score}`);
  } else {
    console.log(`Risposta sbagliata. Punteggio attuale: ${score}`);
  }

  // Passa alla domanda successiva (la funzione è definita in `scorrimentoDomande.js`).
  procediAllaProssimaDomanda();

  // Nasconde il pulsante "AVANTI" in attesa di una nuova risposta.
  const nextButton = document.getElementById("next-button");
  if (nextButton) {
    nextButton.style.display = "none";
  }
};

// --- PREPARAZIONE DELL'INTERFACCIA ---

// Selezioniamo gli elementi HTML che popoleremo dinamicamente.
const divH2 = document.getElementById("h2-domanda"); // Contenitore del testo della domanda.
const h2 = document.createElement("h2"); // L'elemento H2 che conterrà il testo.
divH2.appendChild(h2);

const risposteDiv = document.getElementById("risposte"); // Contenitore delle opzioni di risposta.
risposteDiv.innerHTML = ""; // Lo svuotiamo per sicurezza.

// Contenitore per l'immagine del Pokémon
const imageContainer = document.getElementById("pokemon-image-container");

/**
 * FUNZIONE: creaDomanda
 * SCOPO: È il cuore del sistema. Popola l'interfaccia con i dati della domanda corrente.
 * @param {number} index - L'indice della domanda da creare, preso da `currentQuestionIndex`.
 */
const creaDomanda = (index) => {
  const domanda = questions[index];
  
  // 1. Aggiorna il testo della domanda e l'immagine.
  h2.innerHTML = domanda.question;
  risposteDiv.innerHTML = ""; // Svuota le risposte precedenti.
  imageContainer.innerHTML = ""; // Svuota l'immagine precedente.

  // Crea e inietta l'immagine del Pokémon.
  const pokemonImage = document.createElement("img");
  pokemonImage.src = domanda.image_url;
  pokemonImage.alt = "Indovina il Pokémon";
  pokemonImage.className = "pokemon-image"; // Classe per lo stile (es. silhouette).
  imageContainer.appendChild(pokemonImage);

  // 2. Prepara e mischia le opzioni di risposta.
  const tutteLeRispostePossibili = [
    domanda.correct_answer,
    ...domanda.incorrect_answers,
  ];
  const risposteMischiate = mischiaArray([...tutteLeRispostePossibili]);

  // 3. Crea e aggiunge i bottoni per ogni opzione di risposta.
  risposteMischiate.forEach((answer, answerIndex) => {
    const singolaRispostaDiv = document.createElement("div");
    singolaRispostaDiv.className = "answer-option";

    // Controlla se questa risposta era stata precedentemente selezionata dall'utente.
    const selezionata = userAnswers[currentQuestionIndex] === answer;
    if (selezionata) {
      singolaRispostaDiv.classList.add("selected");
    }

    // Crea l'HTML interno per il bottone di risposta.
    singolaRispostaDiv.innerHTML = `
      <input type="radio" name="answer" value="${answer}" id="answer-${answerIndex}" ${
      selezionata ? "checked" : ""
    }>
      <label for="answer-${answerIndex}">${answer}</label>
    `;

    // Aggiunge l'evento 'click' per gestire la selezione della risposta.
    singolaRispostaDiv.addEventListener("click", () =>
      selezionaRisposta(answer, singolaRispostaDiv)
    );

    risposteDiv.appendChild(singolaRispostaDiv);
  });

  // 4. Nasconde il pulsante "AVANTI" all'inizio di ogni nuova domanda.
  const nextButton = document.getElementById("next-button");
  if (nextButton) {
    nextButton.style.display = "none";
  }
};

// --- AVVIO DEL QUIZ ---

// Al caricamento dello script, viene subito creata la prima domanda (indice 0).
creaDomanda(currentQuestionIndex);

// Aggiorna il contatore per mostrare "QUESTION 1 / 10".
// La funzione `aggiornaContatore` è definita in `scorrimentoDomande.js`.
if (typeof aggiornaContatore === "function") {
  aggiornaContatore();
}