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
  y: 300,
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
const Hinder2 = new Hinder(0, -10, gameCanvas.width);
const Hinder3 = new Hinder(100, 450, 150);
const Hinder4 = new Hinder(1000, 400, 150);
const Hinder5 = new Hinder(700, 200, 100);
const Hinder6 = new Hinder(500, 250, 200);
const Hinder7 = new Hinder(250, 170, 150);
const Hinder8 = new Hinder(500, 70, 778);

let hinderLista = [
  Hinder1,
  Hinder2,
  Hinder3,
  Hinder4,
  Hinder5,
  Hinder6,
  Hinder7,
  Hinder8,
];

const Monster1 = new Monster(3, 105, 460, 60, 60, 105, 205);
const Monster2 = new Monster(5, 1000, 200, 50, 50, 1000, 1200);
const Monster3 = new Monster(5, 300, 350, 60, 60, 300, 400);
const Monster4 = new Monster(7, 730, 330, 60, 60, 730, 1000);
const Monster5 = new Monster(3, 485, 202, 60, 60, 485, 600);
const Monster6 = new Monster(3, 500, 45, 27, 27, 500, 600);

let monsterLista = [Monster1, Monster2, Monster3, Monster4, Monster5, Monster6];

const Portal1 = new Portal(gameCanvas.width - 2, 0, 70);

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
      if (player.faller == false) player.velocityY = -15;
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
  if (spelarDöd(monsterLista, player)) {
    window.location.href = "timer.html";
  }
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
