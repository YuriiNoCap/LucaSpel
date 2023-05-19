import {
  Background,
  Hinder,
  Monster,
  monsterRitas,
  gravity,
  spelPlan,
  monsterdöd,
  spelarDöd,
  Faller,
  Tak,
  spelPlan1,
  portalCheck,
  Portal,
  //   player,
} from "./KlasserOchFunktioner.js";

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
const monsterImg = new Image();
monsterImg.src =
  "Images/Mönster/Skärmbild_2023-05-19_121921-removebg-preview.png";

// -------------------------------------
// ------------ Player movement ------------

window.focus;

const gameCanvas = document.getElementById("gameCanvas");
const c = gameCanvas.getContext("2d"); // Drawing object
gameCanvas.height = window.innerHeight;
gameCanvas.width = window.innerWidth;

const img = document.getElementById("bild");
const background = new Background(img);

let player = {
  gravity: 0.5,
  velocityY: 0,
  x: 20,
  y: 0,
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

const Hinder1 = new Hinder(0, 512, gameCanvas.width);
const Hinder2 = new Hinder(410, 350, 100);
const Hinder3 = new Hinder(150, 350, 100);

let hinderLista = [Hinder1, Hinder2, Hinder3];

const Monster1 = new Monster(2, 10, 420, 60, 60, 10, 500);
const Monster2 = new Monster(5, 30, 30, 50, 50, 30, 150);

let monsterLista = [Monster1, Monster2];

const Portal1 = new Portal(500, 460, 50);

let spelplan1 = document.getElementById("spelplan1");

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
// -------------------------------------
// ------------ Animation ------------
function animate() {
  requestAnimationFrame(animate); // Run gameloop recursively
  // console.log(Faller(player));
  // console.log(Tak(player));

  // Apply gravity
  if (Faller(player, hinderLista)) {
    player.velocityY = 0;
    player.faller = false;
  } else {
    gravity(player);
    player.faller = true;
  }
  if (Tak(player, hinderLista)) {
    player.velocityY = 3;
    // gravity(player);
    player.faller = true;
  }
  // if (Tak(player)) {
  //   player.velocityY = 0;
  //   // gravity(player);
  // }
  // if (player.y + player.height < Hinder.varY) {
  //   // Ska hoppa här
  // } else {
  // // Ska inte hoppa här
  // }

  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height); // Clear screen
  // Här händer det grejer
  setInterval(portalCheck(Portal1, player), 10);
  background.draw();
  monsterRitas(monsterLista);
  monsterdöd(monsterLista, player);
  spelarDöd(monsterLista, player);
  // Set the font properties

  spelPlan(hinderLista);
  spelPlan1(Portal1);
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
