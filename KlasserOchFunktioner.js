const gameCanvas = document.getElementById("gameCanvas");
const c = gameCanvas.getContext("2d");
gameCanvas.height = window.innerHeight;
gameCanvas.width = window.innerWidth;

// Skapar bakgrunden
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
  constructor(x, y, längd) {
    this.x = x;
    this.y = y;
    this.längd = längd;
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

// Bilder som skapar en "animationsbild" för spelaren. Bilden på monster
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

// Implementerar gravtationseffekten
export function gravitation(spelare) {
  spelare.hastighetY += spelare.gravitaionKonstant;
  spelare.y += spelare.hastighetY;
}

// Ritar hinder på spelplanen
export function spelPlan(hinderLista) {
  for (let j = 0; j < hinderLista.length; j++) {
    const hinder = hinderLista[j];
    c.beginPath();
    c.moveTo(hinder.x, hinder.y);
    c.lineTo(hinder.x + hinder.längd, hinder.y);
    c.stroke();
  }
}

// Dödar mpnster när spelaren hoppar på den
export function monsterDöd(monsterLista, spelare) {
  for (let j = 0; j < monsterLista.length; j++) {
    const monster = monsterLista[j];

    if (
      spelare.y + spelare.höjd > monster.y &&
      spelare.y + spelare.höjd < monster.y + monster.höjd &&
      monster.x < spelare.x + spelare.bredd &&
      spelare.x < monster.x + monster.längd &&
      spelare.hastighetY > 0
    ) {
      spelare.hastighetY = 0;
      monsterLista.splice(j, 1);
      j--;
    }
  }
}

// Dödar spelaren om den rörde monstret "inte ovanifrån" eller hamnat utanför spelplan
export function spelarDöd(monsterLista, spelare) {
  for (let i = 0; i < monsterLista.length; i++) {
    if (spelare.y > gameCanvas.height) {
      return true;
    }

    const monster = monsterLista[i];

    if (
      ((spelare.y < monster.y + monster.höjd && spelare.y > monster.y) ||
        (spelare.y + spelare.höjd > monster.y &&
          spelare.y < monster.y + monster.höjd)) &&
      ((spelare.x < monster.x + monster.längd &&
        spelare.x + spelare.bredd > monster.x) ||
        (spelare.x + spelare.bredd > monster.x &&
          spelare.x < monster.x + monster.längd))
    ) {
      return true;
    }
  }
}

// Gör så att spelaren faller tills den kommer i kontakt med hinder
export function faller(spelare, hinderLista) {
  for (let i = 0; i < hinderLista.length; i++) {
    const streck = hinderLista[i];
    if (
      spelare.y + spelare.höjd > streck.y &&
      spelare.y + spelare.höjd < streck.y + 25 &&
      streck.x < spelare.x + spelare.bredd &&
      spelare.x < streck.x + streck.längd
    ) {
      return true;
    }
  }
  return false;
}

// Gör så att spelaren kan inte gå igenom hinder nerifrån också
export function tak(spelare, hinderLista) {
  for (let i = 0; i < hinderLista.length; i++) {
    const streck = hinderLista[i];
    if (
      streck.x < spelare.x + spelare.bredd &&
      spelare.x < streck.x + streck.längd &&
      spelare.y < streck.y &&
      spelare.y > streck.y - 15
    ) {
      spelare.hastighetY = 0;

      return true;
    }
  }
}

export function ritaPortaler(portal) {
  c.beginPath();
  c.moveTo(portal.x, portal.y);
  c.lineTo(portal.x, portal.y + portal.höjd);
  c.stroke();
}

export function portalCheck(portal, spelare) {
  if (
    spelare.x > portal.x &&
    spelare.y > portal.y &&
    spelare.y < portal.y + portal.höjd
  ) {
    window.location.href = "spel-meny.html";
  }
}
