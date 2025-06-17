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
