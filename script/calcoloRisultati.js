document.addEventListener("DOMContentLoaded", () => {
  const score = parseInt(localStorage.getItem("score"), 10);
  // recupero lo score con localStorage.getItem e lo pongo in base
  // decimale mettendo il 10 alla fine
  const total = parseInt(localStorage.getItem("quiz"), 10);
  // recupero il totale con localStorage.getItem e lo pongo in base
  // decimale mettendo il 10 alla fine
  const correctPercentage = ((score / total) * 100).toFixed(1);
  // la nostra percentuale di risposte corrette sarà lo score
  // sul totale per 100, aggiungo il metodo toFixed(1) per arrotondare
  // ad una cifra decimale
  const wrong = total - score;
  // il valore dele domande errate saranno il nostro totale
  const wrongPercentage = ((wrong / total) * 100).toFixed(1);
  // la nostra percentuale di risposte scorrette sarà wrong,
  // dichiarato prima,
  // sul totale per 100, aggiungo il metodo toFixed(1) per arrotondare
  // ad una cifra decimale

  const correctPerc = document.getElementById("correct-percentage");
  // targhetto h2
  correctPerc.innerHTML = `Correct <br> ${correctPercentage}%`;
  // gli assegno il valore
  const correctValue = document.getElementById("correct-value");
  // targhetto p
  correctValue.innerText = `${score}/${total} questions`;
  // gli assegno il valore
  const wrongPerc = document.getElementById("wrong-percentage");
  // targhetto h2
  wrongPerc.innerHTML = `Wrong <br> ${wrongPercentage}%`;
  // gli assegno il valore
  const wrongValue = document.getElementById("wrong-value");
  // targhetto p
  wrongValue.innerText = `${wrong}/${total} questions`;

  const examState = document.getElementById("exam");
  // targhetto il div dove ci andrà la frase del risultato
  if (correctPercentage >= 60) {
    // se la percentuale di risposte corrette è maggiore di 60
    // creo un h2 e un p e gli do il testo con innerHTML
    const examPassed = document.createElement("h2");
    examPassed.innerHTML =
      "Congratulations! <span> You passed the exam. </span>";
    const pExam = document.createElement("p");
    pExam.innerText =
      "We'll send you the certificate in few minutes. Check your email (including promotions / spam folder";
    examState.appendChild(examPassed);
    // appendo l'h2 al div
    examPassed.appendChild(pExam);
    // appendo il p all'h2
  } else {
    const examNotPassed = document.createElement("h2");
    examNotPassed.innerHTML = "Unfortunately, <span> you did not pass.</span>";
    const pExamNotPassed = document.createElement("p");
    pExamNotPassed.innerText = "Try again to improve your score!";
    examState.appendChild(examNotPassed);
    // appendo l'h2 al div
    examNotPassed.appendChild(pExamNotPassed);
    // appendo il p all'h2
  }
});
