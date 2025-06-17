// al click del bottone benchmark.html devo GENERARE() una domanda e ASSEGNARE() un risultato ad una variabile che sarà lo score
//ASSEGNARE() = la funzione che stava scrivendo amedeo con l if. assegna se corretta un punteggio s enon corretta uno 0
//GENERARE() = genero indice con getRnadom(), le stesse domande nn devono ricapitare. ergo i risultati iindice usciti non devono ripetersi IF. creo h2, creo risposte, submitto form per ASSEGNARE() e far nuovamente GENERARE() fino a i <10 (perchè dieci sono le domande)
const questions = [
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "In computing, what does LAN stand for?",
    correct_answer: "Local Area Network",
    incorrect_answers: [
      "Long Antenna Node",
      "Light Access Node",
      "Land Address Navigation",
    ],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "When Gmail first launched, how much storage did it provide for your email?",
    correct_answer: "1GB",
    incorrect_answers: ["512MB", "5GB", "Unlimited"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "This mobile OS held the largest market share in 2012.",
    correct_answer: "iOS",
    incorrect_answers: ["Android", "BlackBerry", "Symbian"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "What does LTS stand for in the software market?",
    correct_answer: "Long Term Support",
    incorrect_answers: [
      "Long Taco Service",
      "Ludicrous Transfer Speed",
      "Ludicrous Turbo Speed",
    ],
  },
  {
    type: "boolean",
    difficulty: "easy",
    category: "Science: Computers",
    question: "The first IBM PC was released in 1981.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    type: "boolean",
    difficulty: "easy",
    category: "Science: Computers",
    question: "Linus Torvalds created Linux and Git.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    type: "boolean",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "The NVidia GTX 1080 gets its name because it can only render at a 1920x1080 screen resolution.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    type: "boolean",
    difficulty: "easy",
    category: "Science: Computers",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    type: "boolean",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "The programming language &quot;Python&quot; is based off a modified version of &quot;JavaScript&quot;.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
];

const maxQuestions = 10; // numero massimo di domande
let score = 0; // punteggio
let currentIndex = 0; // indice corrente
const usedIndices = []; // array in cui finiscono domande usate

const questionEl = document.getElementById("h2-domanda");
// targhetto il div dove va la domanda
const answersEl = document.getElementById("risposte");
// targhetto il div dove vanno le risposte
const counterEl = document.querySelector(".question-counter p");
// targhetto il p del contatore delle domande

const getRandomQuestion = () => {
  // funzione per
  // generare domande casuali
  let i; // variabile indice
  // uso un ciclo do while
  do {
    i = Math.floor(Math.random() * questions.length);
    // il nostro do farà si che il nostro indice sarà
    // un numero compreso tra la lunghezza dell'array di domande
  } while (usedIndices.includes(i));
  // la condizione di while controlla se il nostro array
  // di domande già usate include quell'indice generato dal do
  usedIndices.push(i);
  // fino a quando il while non sarà true ovvero fino a quando
  // l'indice non sarà presente in usedIndices
  return questions[i];
  // ci ritornerà la domanda con l'indice generato randomicamente
};

const mischiaArray = (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    const b = i + Math.floor(Math.random() * (array.length - i));
    [array[i], array[b]] = [array[b], array[i]];
  }
  return array;
};
// metodo Fisher-Yates che mescola gli array
// ci serve come funzione da invocare
// in seguito per mescolare le risposte

const showedQuestion = () => {
  // funzione che controlla se abbiamo già mostrato
  // tutte le domande
  if (currentIndex >= maxQuestions) {
    // se l'indice corrente
    // è maggiore o uguale alla variabile di domande
    // massime che abbiamo impostato
    // vuol dire che il nostro quiz è finito
    localStorage.setItem("score", score);
    // con localStorage.setItem salviamo il nostro score
    // nel local storage del browser
    window.location.href = "results.html";
    // window.location.href ci reinderizza all'html dei risultati
    return;
    // il return ci serve per non reiterare altre domande
    // e far fermare l'esecuzione del codice in maniera definitiva
    // una volta finite le domande
  }

  const q = getRandomQuestion();
  // invoco la funzione assegnando il suo valore alla variabile q
  questionEl.innerHTML = `<h2>${q.question}</h2>`;
  // l'html del nostro div in questo modo e con i template literals
  // sarà l'h2 in cui l'indice della funzione
  // prenderà una domanda casuale e stamperà quella q.question
  // fa riferimento alla proprietà dell'array iniziale
  answersEl.innerHTML = "";
  // ogni giro le nostre risposte saranno svuotate

  let allAnswers;
  // variabile per tutte le risposte
  if (
    q.type === "boolean" && // se il tipo è booleano
    q.correct_answer.match(/true|false/i) && // controlla se
    // la risposta corretta contiene true o false la i fa si che non
    // si tenga conto di minuscole o maiuscole
    q.incorrect_answers.length === 1
    // controlla che la lunghezza delle risposte scorrette
    // sia 1
  ) {
    allAnswers = ["True", "False"];
    // voglio fare in modo che le mie risposte booleane
    // non siano mescolate, ma che il mio true sia sempre all'inizio
  } else {
    allAnswers = mischiaArray([q.correct_answer, ...q.incorrect_answers]);
    // se non è booleano mischio gli array con la funzione creata
    // appositamente. Separo gli array di risposte corrette e
    // scorrette con lo spread operator (...)
  }
  allAnswers.forEach((answer) => {
    // ciclo tutte le risposte con forEach.
    const btn = document.createElement("button");
    // creo l'elemento bottone dove andranno le risposte
    btn.textContent = answer;
    // il bottone avrà come testo la risposta ciclata
    btn.className = "answer-btn";
    // assegno una classe per modifcarlo in CSS in seguito
    btn.addEventListener("click", () => {
      // aggiungo evento di
      // ascolto al bottone
      if (answer === q.correct_answer) score++;
      // se la risposta è corretta lo score aumenta di 1
      currentIndex++;
      // e l'indice corrente pure
      showedQuestion();
      // l'invocazione della funzione permette di fare apparire
      // la domanda successiva fino al raggiungimento di maxQuestion
    });

    answersEl.appendChild(btn);
    // appendo bottone al suo padre dichiarato all'inizio
  });

  counterEl.innerHTML = `QUESTION ${
    currentIndex + 1
    // ogni giro di domanda il nostro contatore aumenterà di 1
  } <span>/ ${maxQuestions}</span>`;
};

window.onload = showedQuestion;
// al caricamento della pagina verrà lanciata la prima domanda
