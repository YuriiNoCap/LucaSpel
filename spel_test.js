//  ------------ Setup ------------
window.focus;

const gameCanvas = document.getElementById("gameCanvas");
const c = gameCanvas.getContext("2d"); // Drawing object
gameCanvas.height = window.innerHeight;
gameCanvas.width = window.innerWidth;

function showDifficulty() {
  // Hämta body-elementet från DOM:en
  var body = document.getElementsByTagName("body")[0];

  // Skapa en div för svårighetsgraden
  var difficultyDiv = document.createElement("div");

  // Lägg till text
  var text = document.createElement("p");
  text.innerHTML = "Välj svårighetsgrad:";
  difficultyDiv.appendChild(text);

  // Skapa två knappar för att välja svårighetsgrad
  var easyButton = document.createElement("button");
  easyButton.innerHTML = "Lätt";
  easyButton.addEventListener("click", function () {
    startGame("easy");
  });
  difficultyDiv.appendChild(easyButton);

  var hardButton = document.createElement("button");
  hardButton.innerHTML = "Svårt";
  hardButton.addEventListener("click", function () {
    startGame("hard");
  });
  difficultyDiv.appendChild(hardButton);

  // Ta bort "Ok"-knappen
  body.removeChild(document.getElementsByTagName("button")[0]);

  // Lägg till svårighetsgraden i DOM:en
  body.appendChild(difficultyDiv);
}

function startGame(difficulty) {
  // Skapa spelet baserat på svårighetsgraden
  if (difficulty === "easy") {
    // Skapa spelet i lätt svårighetsgrad
  } else if (difficulty === "hard") {
    // Skapa spelet i svår svårighetsgrad
  }

  // Ta bort svårighetsgradsdiv:en från DOM:en
  var body = document.getElementsByTagName("body")[0];
  body.removeChild(document.getElementsByTagName("div")[0]);
}

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

class Monster {
  constructor(hastighet, x, y, höjd, längd, vänsterGräns, högerGräns){
    this.hastighet = hastighet;
    this.höjd=höjd;
    this.längd=längd;
    this.x = x;
    this.y =y;
    this.vänsterGräns = vänsterGräns
    this.högerGräns = högerGräns
    this.riktning = 1
  }
}





const Monster1 = new Monster(2, 10, 420, 60,60,10,500)
const Monster2 = new Monster(5,30,30,25,25,30,150)
const monsterLista = [Monster1, Monster2]

function monsterRitas(){
  monsterLista.forEach(monster => {
    c.fillRect(monster.x, monster.y, monster.längd, monster.höjd);
    if (monster.x >monster.högerGräns) {
      monster.riktning=-1
    }
    else if (monster.x < monster.vänsterGräns) {
      monster.riktning=1
    }
    monster.x += monster.hastighet*monster.riktning
  });


}

const Hinder1 = new Hinder(0, 100, 400);
const Hinder2 = new Hinder(0, 550, gameCanvas.width);
const Hinder3 = new Hinder(410, 450, 100);
hinderLista = [Hinder1, Hinder2, Hinder3];

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
      player.y + player.height < streck.varY + 18 &&
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
      player.y <= streck.varY + streck.längdY &&
      player.y > streck.varY &&
      streck.varX < player.x + player.width &&
      player.x < streck.varX + streck.längdX
    ) {
      player.velocityY = 0;
      player.y = streck.varY + streck.längdY;
      player.direction *= -1;
    }
  }
}

// -------------------------------------
// Player variables

let player = {
  gravity: 0.5,
  velocityY: 0,
  x: 10,
  y: 10,
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
      j--; // Decrease j since we just removed a monster from the array
    }
  }
}



function spelarDöd() {
  monsterLista.forEach(monster => {
    if ((player.y<monster.y + monster.höjd
    &&(player.y> monster.y )
    || (player.y+player.height<monster.y+monster.höjd&&player.y+player.height&&player.y+player.height<monster.höjd))

    && (player.x<monster.x+monster.längd
    &&player.x+player.width>monster.x)) {
      console.log("Du dör")
      
    }
  });
  
}
  

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
  showDifficulty();
  requestAnimationFrame(animate); // Run gameloop recursively
  // Apply gravity
  

  c.fillRect(100, 100, 100, 100);
  if (Faller(player)) {
    player.velocityY = 0;
    player.faller = false;
  } else {
    gravity(player);
    player.faller = true;
  }
  Tak(player);

  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height); // Clear screen
  // Här händer det grejer

  background.draw();
  monsterRitas()
  monsterdöd()
  spelarDöd()
  


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
