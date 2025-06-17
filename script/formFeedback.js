//variabili html
const range = document.getElementById("custom-range");
const icons = document.querySelectorAll(".svg-steps img");

//attivare una stella
//classe per attivarla
const updateIcons = (value) => {
  icons.forEach((icon, index) => {
    icon.classList.toggle("active", index <= value);
  });
};
//attivazione al click
icons.forEach((icon, index) => {
  icon.addEventListener("click", () => {
    range.value = index;
    updateIcons(index);
  });
});
//invoco la funzione
updateIcons(range.value);
