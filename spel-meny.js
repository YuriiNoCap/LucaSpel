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
    window.location.href = "lätt-spelplan.html";
  } else if (difficulty === "hard") {
    // Implementera spelet i svår svårighetsgrad
    window.location.href = "svår-spelplan.html";
  }
}
// '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// function showDifficulty() {
//   // Hämta body-elementet från DOM:en
//   var body = document.getElementsByTagName("body")[0];

//   // Ta bort allt befintligt innehåll
//   body.innerHTML = "";

//   // Skapa en div för svårighetsgraden
//   var difficultyDiv = document.createElement("div");

//   // Lägg till text
//   var text = document.createElement("p");
//   text.innerHTML = "Välj svårighetsgrad:";
//   difficultyDiv.appendChild(text);

//   // Skapa två knappar för att välja svårighetsgrad
//   var easyButton = document.createElement("button");
//   easyButton.innerHTML = "Lätt";
//   easyButton.addEventListener("click", function () {
//     startGame("easy");
//   });
//   difficultyDiv.appendChild(easyButton);

//   var hardButton = document.createElement("button");
//   hardButton.innerHTML = "Svårt";
//   hardButton.addEventListener("click", function () {
//     startGame("hard");
//   });
//   difficultyDiv.appendChild(hardButton);

//   // Lägg till svårighetsgraden i DOM:en
//   body.appendChild(difficultyDiv);
// }

// function startGame(difficulty) {
//   // Ta bort allt befintligt innehåll
//   var body = document.getElementsByTagName("body")[0];
//   body.innerHTML = "";

//   // Skapa spelet baserat på svårighetsgraden
//   var canvas = document.createElement("canvas");
//   canvas.id = "gameCanvas";
//   canvas.style.display = "block";
//   body.appendChild(canvas);

//   // Skapa spellogik baserat på svårighetsgraden
//   if (difficulty === "easy") {
//     // Implementera spelet i lätt svårighetsgrad
//     var gameCanvas = document.getElementById("gameCanvas");
//     var context = gameCanvas.getContext("2d");

//     // ... Lägg till koden för spelet i lätt svårighetsgrad ...

//     // Exempel: Simulera spelarens död efter 5 sekunder
//     setTimeout(function () {
//       // Ta bort spelplanen och visa "Game Over"
//       body.innerHTML = "";
//       var gameOverText = document.createElement("h1");
//       gameOverText.innerHTML = "Game Over";
//       body.appendChild(gameOverText);

//       // Återvänd till svårighetsgradsväljaren efter 2 sekunder
//       setTimeout(function () {
//         showDifficulty();
//       }, 2000);
//     }, 5000);
//   } else if (difficulty === "hard") {
//     // Implementera spelet i svår svårighetsgrad
//     window.location.href = "hard.html";
//   }
// }

// // Starta spelet genom att visa svårighetsgradsväljaren
// showDifficulty();

// -----------------------------------------------------------------------------

// function showDifficulty() {
//   // Hämta body-elementet från DOM:en
//   var body = document.getElementsByTagName("body")[0];

//   // Ta bort allt befintligt innehåll
//   body.innerHTML = "";

//   // Skapa en div för svårighetsgraden
//   var difficultyDiv = document.createElement("div");

//   // Lägg till text
//   var text = document.createElement("p");
//   text.innerHTML = "Välj svårighetsgrad:";
//   difficultyDiv.appendChild(text);

//   // Skapa två knappar för att välja svårighetsgrad
//   var easyButton = document.createElement("button");
//   easyButton.innerHTML = "Lätt";
//   easyButton.addEventListener("click", function () {
//     startGame("easy");
//   });
//   difficultyDiv.appendChild(easyButton);

//   var hardButton = document.createElement("button");
//   hardButton.innerHTML = "Svårt";
//   hardButton.addEventListener("click", function () {
//     startGame("hard");
//   });
//   difficultyDiv.appendChild(hardButton);

//   // Lägg till svårighetsgraden i DOM:en
//   body.appendChild(difficultyDiv);
// }

// function startGame(difficulty) {
//   // Ta bort allt befintligt innehåll
//   var body = document.getElementsByTagName("body")[0];
//   body.innerHTML = "";

//   // Skapa en div för spelplanen
//   var gameDiv = document.createElement("div");
//   gameDiv.id = "gameDiv";
//   body.appendChild(gameDiv);

//   // Skapa spellogik baserat på svårighetsgraden
//   if (difficulty === "easy") {
//     // Implementera spelet i lätt svårighetsgrad
//     var gameDiv = document.getElementById("gameDiv");
//     gameDiv.innerHTML = "<h1>Spelet - Lätt svårighetsgrad</h1>";

//     // ... Lägg till koden för spelet i lätt svårighetsgrad ...

//     // Exempel: Simulera spelarens död efter 5 sekunder
//     setTimeout(function () {
//       // Ta bort spelplanen och visa "Game Over"
//       gameDiv.innerHTML = "<h1>Game Over</h1>";

//       // Återvänd till svårighetsgradsväljaren efter 2 sekunder
//       setTimeout(function () {
//         showDifficulty();
//       }, 2000);
//     }, 5000);
//   } else if (difficulty === "hard") {
//     // Implementera spelet i svår svårighetsgrad
//     window.location.href = "hard.html";
//   }
// }

// // Starta spelet genom att visa svårighetsgradsväljaren
// showDifficulty();
