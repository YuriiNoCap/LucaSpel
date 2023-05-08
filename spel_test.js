// importera bilder(run1,2,3,4...runs), allt i en lista, frame, set interval, player rita, player uppdatera

//  ------------ Setup ------------
window.focus;
const SCREENWIDTH = innerWidth;
const SCREENHEIGHT = innerHeight;
let gameCanvas = document.getElementById("gameCanvas");
let c = gameCanvas.getContext("2d"); // Drawing object
gameCanvas.height = SCREENHEIGHT / 2;
gameCanvas.width = SCREENWIDTH / 2;
// -------------------------------------
// Player variables
let playerX = 100;
let playerY = 100;
let playerWidth = 10;
let playerHeight = 10;
let dx = 2;
let dy = 2;

let directions = {
  left: false,
  right: false,
  up: false,
  down: false,
};

class Player {
  constructor(images) {
    this.image = images;
    this.width = 60;
    this.height = 60;
    this.x = this.width / 2;
    this.y = this.height / 2;
    this.currentImage = 0;
  }

  draw() {
    c.drawImage(
      this.image[this.currentImage],
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  changeImage(direction) {
    switch (direction) {
      case "left":
        this.currentImage = 1;
        break;
      case "right":
        this.currentImage = 2;
        break;
      case "up":
        this.currentImage = 3;
        break;
      case "down":
        this.currentImage = 0;
        break;
      default:
        this.currentImage = 0;
        break;
    }
  }
}

const images = [
  document.getElementById("karaktär"),
  document.getElementById("karaktär_vänster_höger"),
  document.getElementById("karaktär_vänster_höger"),
  document.getElementById("karaktär_upp"),
];

player = new Player(images);

// -------------------------------------
// ------------ Player movement ------------
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      directions.left = true;
      player.changeImage("left");
      break;
    case "ArrowRight":
      directions.right = true;
      player.changeImage("right");
      break;
    case "ArrowUp":
      directions.up = true;
      player.changeImage("up");
      break;
    case "ArrowDown":
      directions.down = true;
      player.changeImage("down");
      break;
    default:
      break;
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      directions.left = false;
      break;
    case "ArrowRight":
      directions.right = false;
      break;
    case "ArrowUp":
      directions.up = false;
      break;
    case "ArrowDown":
      directions.down = false;
      break;
    default:
      break;
  }
});
// -------------------------------------
// ------------ Animation ------------
function animate() {
  requestAnimationFrame(animate); // Run gameloop recursively
  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height); // Clear screen

  player.draw();

  if (directions.right) {
    player.x += dx;
  }

  if (directions.left) {
    player.x -= dx;
  }

  if (directions.up) {
    player.y -= dy;
  }

  if (directions.down) {
    player.y += dy;
  }
}
// -------------------------------------
// ------------ Start game ------------
animate();
