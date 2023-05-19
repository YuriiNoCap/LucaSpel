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
const monsterImg = new Image();
monsterImg.src =
  "Images/Mönster/Skärmbild_2023-05-19_121921-removebg-preview.png";

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
const Hinder3 = new Hinder(150, 350, 100);
hinderLista = [Hinder1, Hinder2, Hinder3];
// console.log(hinderLista);

class Monster {
  constructor(hastighet, x, y, höjd, längd, vänsterGräns, högerGräns) {
    this.hastighet = hastighet;
    this.höjd = höjd;
    this.längd = längd;
    this.x = x;
    this.y = y;
    this.vänsterGräns = vänsterGräns;
    this.högerGräns = högerGräns;
    this.riktning = 1;
  }
}

const Monster1 = new Monster(2, 200, 420, 60, 60, 130, 500);
const Monster2 = new Monster(5, 30, 30, 50, 50, 30, 150);
const monsterLista = [Monster1, Monster2];

function monsterRitas() {
  monsterLista.forEach((monster) => {
    // Ritar monstret som en bild istället för en rektangel
    c.drawImage(monsterImg, monster.x, monster.y, monster.längd, monster.höjd);
    if (monster.x > monster.högerGräns) {
      monster.riktning = -1;
    } else if (monster.x < monster.vänsterGräns) {
      monster.riktning = 1;
    }
    monster.x += monster.hastighet * monster.riktning;
  });
}

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

function monsterdöd() {
  for (let j = 0; j < monsterLista.length; j++) {
    const monster = monsterLista[j];

    if (
      player.y + player.height > monster.y &&
      player.y + player.height < monster.y + monster.höjd &&
      monster.x < player.x + player.width &&
      player.x < monster.x + monster.längd &&
      player.velocityY > 0
    ) {
      player.velocityY = 0;
      console.log("Monster killed!");
      monsterLista.splice(j, 1);
    }
  }
}

// function spelarDöd() {
//   monsterLista.forEach((monster) => {
//     if (
//       ((player.y < monster.y + monster.höjd && player.y > monster.y) ||
//         (player.y + player.height < monster.y + monster.höjd &&
//           player.y + player.height &&
//           player.y + player.height < monster.höjd)) &&
//       player.x < monster.x + monster.längd &&
//       player.x + player.width > monster.x
//     ) {
//       console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
//       return true
      
//     }
//   });
// }


function spelarDöd() {
  for (let i = 0; i < monsterLista.length; i++) {
    const monster = monsterLista[i];
    
    if (
      ((player.y < monster.y + monster.höjd && player.y > monster.y) ||
        (player.y + player.height < monster.y + monster.höjd &&
          player.y + player.height &&
          player.y + player.height < monster.höjd)) &&
      player.x < monster.x + monster.längd &&
      player.x + player.width > monster.x
    ) {
      console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
      return true;
    }
  }
  
  return false; // Returnera false om ingen kollision har inträffat
}


function Faller(player) {
  for (let i = 0; i < hinderLista.length; i++) {
    const streck = hinderLista[i];
    if (
      player.y + player.height >= streck.varY &&
      player.y + player.height < streck.varY + 15 &&
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
    // console.log(streck);
    // console.log(streck.varY);
    // console.log(player.y);
    if (
      streck.varX < player.x + player.width &&
      player.x < streck.varX + streck.längdX &&
      player.y < streck.varY &&
      player.y > streck.varY - 15
    ) {
      player.velocityY = 0;

      return true;
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

// Portal
// let gameCanvas = document.getElementById("gameCanvas");
let spelplan1 = document.getElementById("spelplan1");

let portal = {
  x: 500,
  y: 460,
  height: 50,
};

let portalLista = [portal];

function spelPlan1() {
  for (let j = 0; j < portalLista.length; j++) {
    const e = portalLista[j];
    c.beginPath();
    c.moveTo(e.x, e.y);
    c.lineTo(e.x, e.y + e.height);
    c.stroke();
  }
}

function portalCheck() {
  if (player.x > portal.x && player.y > portal.y) {
    gameCanvas.style.display = "none";
    spelplan1.style.display = "block";
  }
}

setInterval(portalCheck, 10);

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
// -------------------------------------
// ------------ Animation ------------
function animate() {
  
  requestAnimationFrame(animate); // Run gameloop recursively
  if (Faller(player)) {
    player.velocityY = 0;
    player.faller = false;
  } else {
    gravity(player);
    player.faller = true;
  }
  if (Tak(player)) {
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
  background.draw();
  monsterRitas();
  monsterdöd();
  // if (spelarDöd()) {
  //   const gameOverElement = document.createElement("div");
  //   gameOverElement.id = "game-over";
  //   gameOverElement.innerText = "Game Over";
  //   document.body.appendChild(gameOverElement);
  //   pausaSpelet();

  //   setTimeout(function () {
  //     window.location.href = "spel-meny.html";
  //   }, 2000);
  // }

  
  // if (spelarDöd()) {
    
  //   const gameOverElement = document.createElement("div");
  //   gameOverElement.id = "game-over";
  //   gameOverElement.innerText = "Game Over";
  //   document.body.appendChild(gameOverElement);
  //   document.body.style.pointerEvents = "none";

  //   setTimeout(function () {
  //     window.location.href = "spel-meny.html";
  //   }, 1000);
    
  // }


  // if (spelarDöd()) {
  //   document.body.innerHTML = "<h1>Game Over</h1>";
  //   setTimeout(function () {
  //     window.location.href = "spel-meny.html";
  //   }, 2000);
  // }

  if (spelarDöd()){
    window.location.href = "timer.html";
  }

  // Set the font properties



  spelPlan();
  spelPlan1();
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
