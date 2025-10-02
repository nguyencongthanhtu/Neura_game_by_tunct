// console.log("Poop.js Start");

class Poop {
  constructor() {
    // CREAT ELEMENT IN DOM
    this.node = document.createElement("img");
    this.node.src = "./images/Poop_1.png";
    gameBoxNode.append(this.node);

    //POSICION PROPERTIES FOR RAQUET
    this.x = 540;
    this.y = 200;
    this.w = 260;
    this.h = 220;

    //INITIALIZATION VALUES

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;

    //poopAnimationInFrame IS USED TO MOVE THROUGH THE DIFFERENT IMAGES OF THE POOP TO CREATE AN ANIMATION EFFECT
    this.poopAnimationInFrame = 1;
    // this.poopAnimationFps WE CAN CONTROL THE SPEED ON THE ANIMATION
    this.poopAnimationFps = 60;

    //UNDRAGABLE
    this.node.setAttribute("draggable", false);
  }

  //HERE WE PROCESS THE ANIMATION FOR TH EPOOP
  poopAnimation = () => {
    // console.log("flyflylittlefly")

    //WE DID SOME FUN ANIMATION USING RANDOM
    //THE POOP LOOKS AT THE SIDES AND ALWAYS RETURNS TO THE CENTER THE SIDES A CHOSEN RANDOMLY IT CAN EVEN STAY LOOKING AT THE CENTER
    if (gameObj.frames % this.poopAnimationFps === 0) {
      if (this.poopAnimationInFrame === 0) {
        this.poopAnimationInFrame++;
        this.node.src = `./images/Poop_${this.poopAnimationInFrame}.png`;
      } else if (this.poopAnimationInFrame === 1) {
        this.poopAnimationInFrame = Math.floor(Math.random() * 3);
        this.node.src = `./images/Poop_${this.poopAnimationInFrame}.png`;
      } else if (this.poopAnimationInFrame === 2) {
        this.poopAnimationInFrame--;
        this.node.src = `./images/Poop_${this.poopAnimationInFrame}.png`;
      }
    }
  };
}
