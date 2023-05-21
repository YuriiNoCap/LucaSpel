function showDifficulty() {
  var body = document.getElementsByTagName("body")[0];

  body.innerHTML = "";

  var difficultyDiv = document.createElement("div");

  var text = document.createElement("p");
  text.innerHTML = "Välj svårighetsgrad:";
  difficultyDiv.appendChild(text);

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

  body.appendChild(difficultyDiv);
}

function startGame(difficulty) {
  var body = document.getElementsByTagName("body")[0];
  body.innerHTML = "";

  var canvas = document.createElement("canvas");
  canvas.id = "gameCanvas";
  canvas.style.display = "block";
  body.appendChild(canvas);

  if (difficulty === "easy") {
    window.location.href = "lätt-spelplan.html";
  } else if (difficulty === "hard") {
    window.location.href = "svår-spelplan.html";
  }
}
