// console.log("Main.js Start");
//* GLOBAL VARIABLES
let gameObj = null;
const startButtonNode = document.querySelector("#startButton");
const splashScreenNode = document.querySelector("#splashScreen");
const gameScreenNode = document.querySelector("#gameScreen");
const gameBoxNode = document.querySelector("#gameBox");
const gameOverScreenNode = document.querySelector("#gameOverScreen");
const restartButtonNode = document.querySelector("#restartButton");

//SOUND FILES
const backgroundMusicNode = document.querySelector("#backgroundMusic");
const smackSoundNode = document.querySelector("#smackSound");
const Ouch1SoundNode = document.querySelector("#Ouch1Sound");
const Ouch2SoundNode = document.querySelector("#Ouch2Sound");
const Ouch3SoundNode = document.querySelector("#Ouch3Sound");
const Ouch4SoundNode = document.querySelector("#Ouch4Sound");
const Uh_OhSoundNode = document.querySelector("#Uh_Oh");

//* GAME STATE MANAGEMENT

//HERE WE START THE GAME
function starGame() {
  //ACTIVATE FULL SCREEN MODDE ON WEB BROWSER
  document.documentElement.requestFullscreen();
  // console.log("startGame Function");

  //HIDE MOUSE CURSOR
  gameScreenNode.style.cursor = "none";

  //SWAP SCREENS
  splashScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";

  //  CREATING NEW GAME OBJECT
  gameObj = new Game();
  //console.log(gameObj);

  //ENTERING THE GAME LOOP CYCLE
  gameObj.gameLoop();
  // console.log(window);
}

//HERE WE RESTART THE GAME
function restarGame() {
  //TWO WAY OF RESTARTING THE GAME 1, RELOADING ALL THE PAGE. 2, DELETING ALL THE NODES ON SCREEN AND RESETTING gameObj.

  // location.reload();

  //WE MODIFY THE INNER HTML TO THE INITIAL VALUES WHEN WE LAUNCHED THE GAME
  gameBoxNode.innerHTML = `   <!-- UNDRAGABLE IMAGES -->
  <img
    src="./images/Game_Background.jpg"
    alt="Game Background Picture"
    onmousedown="return false;"
    ondragstart="return false;"
    draggable="false"
  />
  <div id="gameScore">
    <h2 id="hiScore">Hi-Score: 0</h2>
    <h2 id="score">Score: 0</h2>
  </div>`;

  //DOESNT DO NOTHING AND THERE IS NO NEED TO CLEAR gameObj AS IT WILL BE RE WRITTEN WHEN WE START A GAME
  //gameObj.clear;
  //console.log(gameObj);

  //TURN OFF HTE GAME OVER SCREEN AND BOOT/CALL starGame();
  gameOverScreenNode.style.display = "none";
  starGame();
}

//* EVENT LISTENERS

//GIVING LISTENERS TO BUTTONS SO THEY IVNVOKE FUNCTIONS
startButtonNode.addEventListener("click", starGame);
restartButtonNode.addEventListener("click", restarGame);

//ADDING EVENT LISTENER TO MOUSE CLICKS
gameBoxNode.addEventListener("click", () => {
  //WHEN WE CLICK WE CHECK CALL gameObj.raquet.raquetSplat() BUT IF THE GAME IS PAUSE WE AVOID IT
  if (gameObj.gamePause === false) {
    gameObj.raquet.raquetSplat();
  }
});

//LIKE THIS WE CAN KNOW WERE THE MOUSE POSTION IS AND SET THE RAQUET ON THE POSITION
window.addEventListener("mousemove", (mousePosition) => {
  if (gameObj !== null && gameObj.gamePause === false) {
    //CALCULATING GAMEBOX OFFSET FROM THE DOCUMENT TO KEEP POINTER ALIGNED
    const hOffSetCalculation = (document.body.clientHeight - 720) / 2;
    const wOffSetCalculation = (document.body.clientWidth - 1280) / 2;

    //SENDIND X, Y VALUES TO UPDATE RAQUET POSICION THIS -20 IS TO CENTER THE RAQUETS NET WITH POINTER
    gameObj.raquet.move(
      mousePosition.x - wOffSetCalculation - 20,
      mousePosition.y - hOffSetCalculation - 20
    );
  }
});

//ADDED SOME EXTRA STUFF M TO MUTE MUSIC AND P TO PAUSE THE GAME KEYBOARD LISTENERS
window.addEventListener("keydown", (event) => {
  // console.log(event.key);
  if (event.key === "m" || event.key === "M") {
    backgroundMusicNode.pause();
  } else if (event.key === "p" || event.key === "P") {
    if (gameObj.gamePause === true) {
      backgroundMusicNode.play();
      gameObj.gamePause = false;
      gameObj.gameLoop();
    } else if (gameObj.gamePause === false) {
      gameObj.gamePause = true;
      backgroundMusicNode.pause();
    }
  }
});
