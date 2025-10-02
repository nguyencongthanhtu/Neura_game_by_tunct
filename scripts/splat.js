// console.log("Splat.js Start");

class Splat {
  constructor(positionX, positionY) {
    // CREAT ELEMENT IN DOM
    this.node = document.createElement("img");
    this.node.src = "./images/Splat_1.png";
    gameBoxNode.append(this.node);

    //WE NEED THE X AND Y VALUES OF THE SPLATED FLY TO BE ABLE TO POSITION THE SPLAT PROPERLY
    //WE USE THESE NUMBER TO CENTER PROPERLY WERE THE SPLAT APEARS
    this.x = positionX - 40;
    this.y = positionY - 60;

    this.w = 150;
    this.h = 150;

    //USE THIS STATEMENT TO KNOW WHEN WE HAVE TO DELETE THE SPLAT AND WHEN IT HAS TO BE ANIMATED
    this.splatActive = true;

    //INITIALIZATION VALUES

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;

    //splatAnimationInFrame IS USED TO MOVE THROUGH THE DIFFERENT IMAGES OF THE SPLAT TO CREATE AN ANIMATION EFFECT
    this.splatAnimationInFrame = 1;
    //this.splatAnimationFps WE CAN CONTROL THE SPEED ON THE ANIMATION
    this.splatAnimationFps = 3;
  }

  //WE USE THE gameObj.frames TO KNOW IN WHAT FRAME WE ARE IN AND THE % WITH this.splatAnimationFps TO STATE IN WHAT CONSECUTIVE FRAMES WE WANT TO PROCESS THE ANIMATION
  //AND WE CAN SWITCH BETWEEN THE IMAGES
  //WHEN THE ANIMATION IS FINISHED WE SET this.splatActive = false SO IT STOPS THE ANIMATION
  splatAnimation = () => {
    if (this.splatActive === true) {
      if (gameObj.frames % this.splatAnimationFps === 0) {
        if (this.splatAnimationInFrame === 1) {
          this.node.src = `./images/Splat_${this.splatAnimationInFrame}.png`;
          this.splatAnimationInFrame++;
        } else if (this.splatAnimationInFrame === 2) {
          this.node.src = `./images/Splat_${this.splatAnimationInFrame}.png`;
          this.splatAnimationInFrame++;
        } else {
          this.splatActive = false;
        }
      }
    }
  };
}
