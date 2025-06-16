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

let index = 0;
let risposteDate = [];
//trova div h2
const divH2 = document.getElementById("h2-domanda");
// Aggiungi h2 per domanda
const h2 = document.createElement("h2");
//appendi h2 al padre
divH2.appendChild(h2);
// creo div di risposte
const risposteDiv = document.getElementById("risposte");
risposteDiv.innerHTML = "";

//funzione crea domanda
const creaDomanda = (index) => {
  //crea domanda
  const domanda = questions[index];
  //cambia valore h2
  h2.innerHTML = domanda.question;

  //della singola domanda creo array di domande corrette e incorrette
  const tutteLeRispostePossibili = [
    domanda.correct_answer,
    ...domanda.incorrect_answers,
  ];

  // Mescola le risposte per renderle casuali
  const risposteMischiate = shuffleArray([...tutteLeRispostePossibili]);
};
