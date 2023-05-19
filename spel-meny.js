function showDifficulty() {
  // Hämta body-elementet från DOM:en
  var body = document.getElementsByTagName("body")[0];

  // Ta bort allt befintligt innehåll
  body.innerHTML = "";

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
  });
  difficultyDiv.appendChild(easyButton);

  var hardButton = document.createElement("button");
  hardButton.innerHTML = "Svårt";
  hardButton.addEventListener("click", function () {
    startGame("hard");
  });
  difficultyDiv.appendChild(hardButton);

  // Lägg till svårighetsgraden i DOM:en
  body.appendChild(difficultyDiv);
}

function startGame(difficulty) {
  // Ta bort allt befintligt innehåll
  var body = document.getElementsByTagName("body")[0];
  body.innerHTML = "";

  // Skapa spelet baserat på svårighetsgraden
  var canvas = document.createElement("canvas");
  canvas.id = "gameCanvas";
  canvas.style.display = "block";
  body.appendChild(canvas);

  // Skapa spellogik baserat på svårighetsgraden
  if (difficulty === "easy") {
    // Implementera spelet i lätt svårighetsgrad
    window.location.href = "easy.html";
  } else if (difficulty === "hard") {
    // Implementera spelet i svår svårighetsgrad
  }
}
