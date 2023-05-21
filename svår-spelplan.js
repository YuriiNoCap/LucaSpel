import {
  Background,
  Hinder,
  Monster,
  monsterRitas,
  gravitation,
  spelPlan,
  monsterDöd,
  spelarDöd,
  faller,
  tak,
  ritaPortaler,
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

let spelare = {
  gravitaionKonstant: 0.5,
  hastighetY: 0,
  x: 20,
  y: 300,
  dx: 5,
  faller: true,
  höjd: 50,
  bredd: 50,
  riktning: {
    vänster: false,
    höger: false,
    up: false,
    down: false,
  },
  standingImg: standingImg,
  jumpingImg: jumpingImg,
  movingImg: movingImg,
  currentImg: standingImg,
};

const Hinder1 = new Hinder(0, 513, gameCanvas.width);
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

let monsterLista = [Monster1, Monster2, Monster3, Monster4, Monster5];

const Portal1 = new Portal(gameCanvas.width - 2, 0, 70);

// Eventlyssnare som reagerar när man trycker på knappen
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      spelare.riktning.vänster = true;
      spelare.currentImg = movingImg;
      break;
    case "ArrowRight":
      spelare.riktning.höger = true;
      spelare.currentImg = movingImg;
      break;

    default:
      break;
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      spelare.riktning.vänster = false;
      break;
    case "ArrowRight":
      spelare.riktning.höger = false;
      break;
    case "ArrowUp":
      if (spelare.faller == false) {
        spelare.hastighetY = -15;
      }
      gravitation(spelare);
      break;
    default:
      break;
  }
});

function animate() {
  requestAnimationFrame(animate);

  if (faller(spelare, hinderLista)) {
    spelare.hastighetY = 0;
    spelare.faller = false;
  } else {
    gravitation(spelare);
    spelare.faller = true;
  }
  if (tak(spelare, hinderLista)) {
    spelare.hastighetY = 3;
    spelare.faller = true;
  }

  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  setInterval(portalCheck(Portal1, spelare), 10);
  background.draw();
  monsterRitas(monsterLista);
  monsterDöd(monsterLista, spelare);
  if (spelarDöd(monsterLista, spelare)) {
    window.location.href = "timer.html";
  }

  spelPlan(hinderLista);
  ritaPortaler(Portal1);
  if (spelare.riktning.höger) {
    spelare.currentImg = movingImg;
    c.drawImage(
      spelare.currentImg,
      spelare.x,
      spelare.y,
      spelare.bredd,
      spelare.höjd
    );
    spelare.x += spelare.dx;
  } else if (spelare.riktning.vänster) {
    spelare.currentImg = movingImg;
    c.save();
    c.scale(-1, 1);
    c.drawImage(
      spelare.currentImg,
      -spelare.x - spelare.bredd,
      spelare.y,
      spelare.bredd,
      spelare.höjd
    );
    c.restore();
    spelare.x -= spelare.dx;
  } else if (spelare.hastighetY != 0) {
    spelare.currentImg = jumpingImg;
    c.drawImage(
      spelare.currentImg,
      spelare.x,
      spelare.y,
      spelare.bredd,
      spelare.höjd
    );
  } else {
    spelare.currentImg = standingImg;
    c.drawImage(
      spelare.currentImg,
      spelare.x,
      spelare.y,
      spelare.höjd,
      spelare.höjd
    );
  }
}
animate();
