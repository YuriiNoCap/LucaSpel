// Definiera variabler för de två spelplanerna
let spelplan1 = document.getElementById("spelplan1");
let spelplan2 = document.getElementById("spelplan2");

// Definiera koordinaterna där portalen ska placeras
let portalX = 100; // X-koordinaten för portalen
let portalY = 200; // Y-koordinaten för portalen

// Definiera storleken på portalen
let portalWidth = 50;
let portalHeight = 50;

// Skapa en funktion som kontrollerar om spelaren går igenom portalen
function checkPortal() {
  let spelare = document.getElementById("spelare"); // Hitta spelaren på spelplanen

  // Kontrollera om spelaren är inom portalens område
  if (
    spelare.offsetLeft >= portalX &&
    spelare.offsetLeft + spelare.offsetWidth <= portalX + portalWidth &&
    spelare.offsetTop >= portalY &&
    spelare.offsetTop + spelare.offsetHeight <= portalY + portalHeight
  ) {
    // Flytta spelaren till den andra spelplanen
    spelplan1.style.display = "none"; // Göm den första spelplanen
    spelplan2.style.display = "block"; // Visa den andra spelplanen
  }
}

// Använd setInterval för att upprepa checkPortal-funktionen regelbundet
setInterval(checkPortal, 10);
