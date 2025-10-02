// console.log("Raquet.js Start");

class Raquet {
  constructor() {
    // CREAT ELEMENT IN DOM
    this.node = document.createElement("img");
    this.node.src = "./images/Raquet_1.png";
    gameBoxNode.append(this.node);

    //POSICION PROPERTIES FOR RAQUET
    this.x = 10;
    this.y = 10;
    this.w = 120;
    this.h = 120;

    //INITIALIZATION VALUES

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
    this.node.style.zIndex = "99";

    //hitAnimationInFrame IS USED TO MOVE THROUGH THE DIFFERENT IMAGES OF THE RAQUET TO CREATE AN ANIMATION EFFECT
    this.hitAnimationInFrame = 1;
    // this.hitAnimationFps WE CAN CONTROL THE SPEED ON THE ANIMATION
    this.hitAnimationFps = 5;

    //UNDRAGABLE
    this.node.setAttribute("draggable", false);
  }

  //MOVE UPDATES RAQUETS X AND Y STATEMENTS WITH THE MOUSE LISTENER
  move(x, y) {
    this.x = x;
    this.y = y;
    this.positionUpdate();
    // console.log(x);
  }

  //UPDATE THE POSITION OF THE RAQUET ON THE DOM
  positionUpdate = () => {
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  };

  //THE CLICK FROM THE MOUSE WILL TRIGGER THIS METHOD TO START WITH THE COLLITION PROCESS AND THE ANIMATION
  raquetSplat = () => {
    //console.log("raquet.raquetSpat")
    gameObj.raquetTofliesCollision();
    gameObj.doHitAnimation = true;
  };

  //WE USE THE gameObj.frames TO KNOW IN WHAT FRAME WE ARE IN AND THE % WITH this.flyFlyAnimationFps TO STATE IN WHAT CONSECUTIVE FRAMES WE WANT TO PROCESS THE ANIMATION
  //AND WE CAN SWITCH BETWEEN THE IMAGES
  //WHEN THE ANIMATION IS FINISHED WE SET gameObj.doHitAnimation = false SO IT STOPS THE ANIMATION

  hitAnimation = () => {
    if (gameObj.doHitAnimation === true) {
      if (gameObj.frames % this.hitAnimationFps === 0) {
        if (this.hitAnimationInFrame === 1) {
          this.hitAnimationInFrame++;
          this.node.src = `./images/Raquet_${this.hitAnimationInFrame}.png`;
        } else if (this.hitAnimationInFrame === 2) {
          this.hitAnimationInFrame++;
          this.node.src = `./images/Raquet_${this.hitAnimationInFrame}.png`;
        } else if (this.hitAnimationInFrame === 3) {
          this.hitAnimationInFrame = 1;
          this.node.src = `./images/Raquet_${this.hitAnimationInFrame}.png`;
          gameObj.doHitAnimation = false;
        }
      }

      // console.log("Hit Animation In")
    }
  };
}
