//  ------------ Setup ------------
window.focus;

const gameCanvas = document.getElementById("gameCanvas");
const c = gameCanvas.getContext("2d"); // Drawing object
gameCanvas.height = window.innerHeight;
gameCanvas.width = window.innerWidth;

// Spel plan

class Hinder {
  constructor(varX, varY, längdX){
    this.varX = varX
    this.varY = varY
    this.längdX = längdX
  }

}

const Hinder1 = new Hinder(0,100,400)
const Hinder2 = new Hinder(0,gameCanvas.height,gameCanvas.width)
const Hinder3 = new Hinder(410,400,100)
hinderLista = [Hinder1,Hinder2,Hinder3]


function spelPlan() {
  for (let j = 0; j < hinderLista.length; j++) {
    const e = hinderLista[j];
    c.beginPath();
    c.moveTo(e.varX, e.varY);
    c.lineTo(e.varX+e.längdX, e.varY);
    c.stroke();
    
  }

}

// -------------------------------------
// Player variables

let player = {
  gravity: 0.5,
  velocityY: 0,

  x: 10,
  y: 10,
  //   y: window.innerHeight / 2,
  dx: 3,
  dy: 3,
  faller: true,

  //   img: document.getElementById("hero"),
  height: 60,
  width: 60,
  directions: {
    left: false,
    right: false,
    up: false,
    down: false,
  },
};
// -------------------------------------
// ------------ Player movement ------------
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      player.directions.left = true;
      break;
    case "ArrowRight":
      player.directions.right = true;
      break;
    // case "ArrowUp":
    //   player.directions.up = true;
    //   break;
    // case "ArrowDown":
    //   player.directions.down = true;
    //   break;
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
      if (faller=false) {
        // Only jump if player is on the ground
        console.log("hoppar")
        player.velocityY = -10;
      }
      break;
    // case "ArrowUp":
    //   player.directions.up = false;
    //   break;
    // case "ArrowDown":
    //   player.directions.down = false;
    //   break;
    default:
      break;
  }
});
console.log(hinderLista)
// -------------------------------------
// ------------ Animation ------------
function animate() {
  requestAnimationFrame(animate); // Run gameloop recursively



  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height); // Clear screen
  // Här händer det grejer

  spelPlan();
  c.fillRect(player.x, player.y, player.width, player.height); // Draw player

  // Apply gravity
  for (let i = 0; i < hinderLista.length; i++) {
    var hindret = hinderLista[i]
    if (player.y + player.height >= hindret.varY && hindret.varX <player.x && player.x< hindret.varX + hindret.längdX) {
      player.velocityY=0
      faller=false
      console.log("faller inte")
      break
    }
    else{
      faller=true
        console.log("faller")
        player.velocityY = +10;
        player.velocityY += player.gravity;
        player.y += player.velocityY;
        break
        
        
      }
    }




  if (player.directions.right) {
    player.x += player.dx;
  }

  if (player.directions.left) {
    player.x -= player.dx;
  }

 

}
animate();
