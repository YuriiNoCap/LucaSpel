//  ------------ Setup ------------
window.focus;

const gameCanvas = document.getElementById("gameCanvas");
const c = gameCanvas.getContext("2d"); // Drawing object
gameCanvas.height = window.innerHeight;
gameCanvas.width = window.innerWidth;

// Spel plan
function spelPlan() {
  c.beginPath();
  c.moveTo(0, 520);
  c.lineTo(gameCanvas.width, 520);
  c.stroke();
}

// -------------------------------------
// Player variables

let player = {
  gravity: 0.5,
  velocityY: 0,
  playerWidth: 10,
  playerHeight: 10,
  x: 10,
  y: 10,
  //   y: window.innerHeight / 2,
  dx: 3,
  dy: 3,

  //   img: document.getElementById("hero"),
  height: 60,
  width: 60,
  directions: {
    left: false,
    right: false,
    up: false,
    down: false,
  },
};
// -------------------------------------
// ------------ Player movement ------------
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      player.directions.left = true;
      break;
    case "ArrowRight":
      player.directions.right = true;
      break;
    // case "ArrowUp":
    //   player.directions.up = true;
    //   break;
    // case "ArrowDown":
    //   player.directions.down = true;
    //   break;
    default:
      break;
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      player.directions.left = false;
      break;
    case "ArrowRight":
      player.directions.right = false;
      break;
    case "ArrowUp":
      if (player.y + player.playerHeight >= gameCanvas.height - 20) {
        // Only jump if player is on the ground
        player.velocityY = -10;
      }
      break;
    // case "ArrowUp":
    //   player.directions.up = false;
    //   break;
    // case "ArrowDown":
    //   player.directions.down = false;
    //   break;
    default:
      break;
  }
});
// -------------------------------------
// ------------ Animation ------------
function animate() {
  requestAnimationFrame(animate); // Run gameloop recursively
  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height); // Clear screen
  spelPlan();
  c.fillRect(player.x, player.y, player.playerWidth, player.playerHeight); // Draw player

  // Apply gravity
  player.velocityY += player.gravity;
  player.y += player.velocityY;

  if (player.directions.right) {
    player.x += player.dx;
  }

  if (player.directions.left) {
    player.x -= player.dx;
  }

  // Check if player has hit the bottom of the canvas
  if (player.y + player.playerHeight > gameCanvas.height - 20) {
    player.y = gameCanvas.height - player.playerHeight - 20;
    player.velocityY = 0;
  }
}

// -------------------------------------
// ------------ Start game ------------

c.beginPath();
c.moveTo(0, 0);
c.lineTo(300, 150);
c.stroke();

animate();
