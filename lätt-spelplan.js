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
} from "./KlasserOchFunktioner.js";

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

window.focus;

const gameCanvas = document.getElementById("gameCanvas");
const c = gameCanvas.getContext("2d");
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
const Hinder2 = new Hinder(430, 400, 100);
const Hinder3 = new Hinder(150, 400, 100);
const Hinder4 = new Hinder(650, 250, 100);
const Hinder5 = new Hinder(870, 150, 200);
const Hinder6 = new Hinder(1150, 70, 150);
const Hinder7 = new Hinder(0, -10, gameCanvas.width);

let hinderLista = [
  Hinder1,
  Hinder2,
  Hinder3,
  Hinder4,
  Hinder5,
  Hinder6,
  Hinder7,
];

const Monster1 = new Monster(2, 250, 300, 60, 60, 260, 370);

let monsterLista = [Monster1];

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
      if (player.faller == false) player.velocityY = -15;
      gravity(player);
      break;
    default:
      break;
  }
});

function animate() {
  requestAnimationFrame(animate);

  if (Faller(player, hinderLista)) {
    player.velocityY = 0;
    player.faller = false;
  } else {
    gravity(player);
    player.faller = true;
  }
  if (Tak(player, hinderLista)) {
    player.velocityY = 3;
    player.faller = true;
  }

  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  setInterval(portalCheck(Portal1, player), 10);
  background.draw();
  monsterRitas(monsterLista);
  monsterdöd(monsterLista, player);
  if (spelarDöd(monsterLista, player)) {
    window.location.href = "timer.html";
  }

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
