function showDifficulty() {
  // Hämta body-elementet från DOM:en
  var body = document.getElementsByTagName("body")[0];

  // Skapa en div för svårighetsgraden
  var difficultyDiv = document.createElement("div");

  // Lägg till text
  var text = document.createElement("p");
  text.innerHTML = "Välj svårighetsgrad:";
  difficultyDiv.appendChild(text);

  // Skapa två knappar för att välja svårighetsgrad
  var easyButton = document.createElement("button");
  easyButton.innerHTML = "Lätt";
  easyButton.addEventListener("click", function () {
    startGame("easy");
    body.removeChild(difficultyDiv);
  });
  difficultyDiv.appendChild(easyButton);

  var hardButton = document.createElement("button");
  hardButton.innerHTML = "Svårt";
  hardButton.addEventListener("click", function () {
    startGame("hard");
    body.removeChild(difficultyDiv);
  });
  difficultyDiv.appendChild(hardButton);

  // Ta bort "Ok"-knappen
  body.removeChild(document.getElementsByTagName("button")[0]);

  // Lägg till svårighetsgraden i DOM:en
  body.appendChild(difficultyDiv);
}

function startGame(difficulty) {
  // Skapa spelet baserat på svårighetsgraden
  var canvas = document.getElementById("gameCanvas");
  canvas.style.display = "block";

  if (difficulty === "easy") {
    // Skapa spelet i lätt svårighetsgrad
  } else if (difficulty === "hard") {
    // Skapa spelet i svår svårighetsgrad
  }
}
