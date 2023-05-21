const gameCanvas = document.getElementById("gameCanvas");
const c = gameCanvas.getContext("2d");
gameCanvas.height = window.innerHeight;
gameCanvas.width = window.ndoinnerWidth;

export class Background {
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

export class Portal {
  constructor(x, y, höjd) {
    this.x = x;
    this.y = y;
    this.höjd = höjd;
  }
}

export class Hinder {
  constructor(varX, varY, längdX) {
    this.varX = varX;
    this.varY = varY;
    this.längdX = längdX;
  }
}

export class Monster {
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

export function monsterRitas(monsterLista) {
  monsterLista.forEach((monster) => {
    c.drawImage(monsterImg, monster.x, monster.y, monster.längd, monster.höjd);
    if (monster.x > monster.högerGräns) {
      monster.riktning = -1;
    } else if (monster.x < monster.vänsterGräns) {
      monster.riktning = 1;
    }
    monster.x += monster.hastighet * monster.riktning;
  });
}

export function gravity(player) {
  player.velocityY += player.gravity;
  player.y += player.velocityY;
}

export function spelPlan(hinderLista) {
  for (let j = 0; j < hinderLista.length; j++) {
    const e = hinderLista[j];
    c.beginPath();
    c.moveTo(e.varX, e.varY);
    c.lineTo(e.varX + e.längdX, e.varY);
    c.stroke();
  }
}

export function monsterdöd(monsterLista, player) {
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
      j--;
    }
  }
}

export function spelarDöd(monsterLista, player) {
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
}

export function Faller(player, hinderLista) {
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

export function Tak(player, hinderLista) {
  for (let i = 0; i < hinderLista.length; i++) {
    const streck = hinderLista[i];
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

export function spelPlan1(portal) {
  c.beginPath();
  c.moveTo(portal.x, portal.y);
  c.lineTo(portal.x, portal.y + portal.höjd);
  c.stroke();
}

export function portalCheck(portal, player) {
  if (player.x > portal.x && player.y > portal.y) {
    window.location.href = "spel-meny.html";
  }
}
