//  ------------ Setup ------------
window.focus;

const gameCanvas = document.getElementById("gameCanvas");
const c = gameCanvas.getContext("2d"); // Drawing object
gameCanvas.height = window.innerHeight;
gameCanvas.width = window.innerWidth;

//Images
const standingImg = new Image();
standingImg.src =
  "Images/Karaktär/Skärmbild_2023-05-05_123538-removebg-preview.png";
const jumpingImg = new Image();
jumpingImg.src =
  "Images/Karaktär/Skärmbild_2023-05-05_124527-removebg-preview.png";
const movingImg = new Image();
movingImg.src =
  "Images/Karaktär/Skärmbild_2023-05-05_123531-removebg-preview.png";

// Spel plan
class Background {
  constructor(src) {
    this.image = src;
    this.x = 0;
    this.y = 0;
    this.width = gameCanvas.width;
    this.height = gameCanvas.height;
  }

  draw() {
    c.drawImage(this.image, this.x, this.y, this.width, this.height);
    console.log(this.image);
  }
}
const img = document.getElementById("bild");
background = new Background(img);

class Hinder {
  constructor(varX, varY, längdX) {
    this.varX = varX;
    this.varY = varY;
    this.längdX = längdX;
  }
}
// const Hinder1 = new Hinder(0, 100, 400);
const Hinder1 = new Hinder(0, 512, gameCanvas.width);
const Hinder2 = new Hinder(410, 350, 100);
hinderLista = [Hinder1, Hinder2];

function gravity(player) {
  player.velocityY += player.gravity;
  player.y += player.velocityY;
}

function spelPlan() {
  for (let j = 0; j < hinderLista.length; j++) {
    const e = hinderLista[j];
    c.beginPath();
    c.moveTo(e.varX, e.varY);
    c.lineTo(e.varX + e.längdX, e.varY);
    c.stroke();
  }
}

function Faller(player) {
  for (let i = 0; i < hinderLista.length; i++) {
    const streck = hinderLista[i];
    if (
      player.y + player.height >= streck.varY &&
      player.y + player.height < streck.varY + 20 &&
      streck.varX < player.x + player.width &&
      player.x < streck.varX + streck.längdX
    ) {
      return true;
    }
  }
  return false;
}

function Tak(player) {
  for (let i = 0; i < hinderLista.length; i++) {
    const streck = hinderLista[i];
    if (
      player.y <= streck.varY &&
      player.y > streck.varY + 40 &&
      streck.varX < player.x + player.width &&
      player.x < streck.varX + streck.längdX
    ) {
      player.Faller = false;
    }
  }
}

// -------------------------------------
// Player variables

let player = {
  gravity: 0.5,
  velocityY: 0,
  x: 20,
  y: 450,
  dx: 5,
  faller: true,
  height: 50,
  width: 50,
  directions: {
    left: false,
    right: false,
    up: false,
    down: false,
  },
  standingImg: standingImg,
  jumpingImg: jumpingImg,
  movingImg: movingImg,
  currentImg: standingImg,
};

// -------------------------------------
// ------------ Player movement ------------
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      player.directions.left = true;
      player.currentImg = movingImg;
      break;
    case "ArrowRight":
      player.directions.right = true;
      player.currentImg = movingImg;
      break;

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
      // Only jump if player is on the ground
      if (player.faller == false) player.velocityY = -20;
      gravity(player);
      break;
    default:
      break;
  }
});
console.log(hinderLista);
// -------------------------------------
// ------------ Animation ------------
function animate() {
  requestAnimationFrame(animate); // Run gameloop recursively
  console.log(Faller(player));
  // Apply gravity
  if (Faller(player)) {
    player.velocityY = 0;
    player.faller = false;
  } else {
    gravity(player);
    player.faller = true;
  }
  if (Tak(player)) {
    player.velocityY = 0;
    gravity(player);
  }
  // if (player.y + player.height < Hinder.varY) {
  //   // Ska hoppa här
  // } else {
  // // Ska inte hoppa här
  // }

  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height); // Clear screen
  // Här händer det grejer
  background.draw();

  spelPlan();
  if (player.directions.right) {
    player.currentImg = movingImg;
    c.drawImage(
      player.currentImg,
      player.x,
      player.y,
      player.width,
      player.height
    );
    player.x += player.dx;
  } else if (player.directions.left) {
    player.currentImg = movingImg;
    c.save();
    c.scale(-1, 1);
    c.drawImage(
      player.currentImg,
      -player.x - player.width,
      player.y,
      player.width,
      player.height
    );
    c.restore();
    player.x -= player.dx;
  } else if (player.velocityY != 0) {
    player.currentImg = jumpingImg;
    c.drawImage(
      player.currentImg,
      player.x,
      player.y,
      player.width,
      player.height
    );
  } else {
    player.currentImg = standingImg;
    c.drawImage(
      player.currentImg,
      player.x,
      player.y,
      player.width,
      player.height
    );
  }
}
animate();
