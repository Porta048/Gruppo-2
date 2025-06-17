//variabili html
const range = document.getElementById("custom-range");
const icons = document.querySelectorAll(".svg-steps img");

//attivare una stella
//classe per attivarla
const attivaStelle = (value) => {
  icons.forEach((icon, index) => {
    icon.classList.toggle("active", index <= value);
  });
};
//attivazione al click
icons.forEach((icon, index) => {
  icon.addEventListener("click", () => {
    range.value = index;
    attivaStelle(index);
  });
});
//invoco la funzione
attivaStelle(range.value);

//bottone goToEpicode
const btn2 = document.getElementById("goToEpicode");
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  window.location.href = "https://www.epicode.com/it/";
});
