// FLY CLASS WITH ALL THE NECESSARY TO MANAGE FLIES

class Fly {
  constructor(
    // THIS PARAMETER IS USED TO DETEMINE ON WHICH WALL WILL THE FLY SPAWN
    wallUpRightDownLeft,

    //THESE PARAMETER IS USED TO DETERMINE ON WHAT POSITION OF THE CHOSEN WALL WILL THE FLY SPAWN
    positionWidth,
    positionHeight,

    //THESE PARAMENTES ARE USED TO DETERMINE THE SPEED IN WHICH THE FLY WILL FLY
    //AS THE HIGHT IS SMALLER THAN THE WIDTH NORMALY THE Y AXIS MOVEMENT SPEED IS LOWER
    movementSpeedX,
    movementSpeedY
  ) {
    // CREATE ELEMENT IN DOM
    this.node = document.createElement("img");
    this.node.src = "./images/Fly_1.png";
    gameBoxNode.append(this.node);

    //SENDING POSITION PARAMETERS TO THE METHOD
    this.startPosition(wallUpRightDownLeft, positionWidth, positionHeight);
    this.w = 81;
    this.h = 65;

    //INITIALISING FLY SPEED
    this.movementSpeedX = movementSpeedX;
    this.movementSpeedY = movementSpeedY;

    // THIS STATEMENT IS USED TO KNOW IF THE FLY IS KILLED OR NOT
    this.flyActive = true;

    //INITIALIZATION VALUES
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;

    //UNDRAGABLE
    this.node.setAttribute("draggable", false);

    //flyFlyAnimationInFrame IS USED TO MOVE THROUGH THE DIFFERENT IMAGES OF THE FLY TO CREATE AN ANIMATION EFFECT
    this.flyFlyAnimationInFrame = 1;
    // this.flyFlyAnimationFps WE CAN CONTROL THE SPEED ON THE ANIMATION
    this.flyFlyAnimationFps = 2;
  }

  startPosition = (wallUpRightDownLeft, positionWidth, positionHeight) => {
    //FORMULA TO DETERMIN FR0M WHAT SIDE FLIES WILL SPAWN AND WHAT POSITION
    //AFTER CHOOSING THE THE WALL WE WILL CHOOSE A RANDOM POSITION FOR THAT WALL
    if (wallUpRightDownLeft === 0) {
      this.y = 10;
      this.x = positionWidth;
    } else if (wallUpRightDownLeft === 1) {
      this.x = 1200;
      this.y = positionHeight;
    } else if (wallUpRightDownLeft === 2) {
      this.y = 680;
      this.x = positionWidth;
    } else if (wallUpRightDownLeft === 3) {
      this.x = 10;
      this.y = positionHeight;
    }
  };

  //RANDOMIZING TYPE OF MOVEMENT FLY WILL DO X MOVEMENT, Y MOVEMENT OR BOTH
  move = () => {
    // chooseRandomeMovementAlgo IS USED TO DETERMINE WHAT TYPE OF MOVEMENT THE FLY WILL DO
    this.chooseRandomeMovementAlgo = Math.floor(Math.random() * 3);
    // console.log(this.chooseRandomeMovementAlgo);
    if (this.chooseRandomeMovementAlgo === 0) {
      //   console.log(this.chooseRandomeMovementAlgo);
      this.moveAlgoX();
    } else if (this.chooseRandomeMovementAlgo === 1) {
      //   console.log(this.chooseRandomeMovementAlgo);
      this.moveAlgoY();
    } else if (this.chooseRandomeMovementAlgo === 2) {
      //   console.log(this.chooseRandomeMovementAlgo);
      this.moveAlgoX();
      this.moveAlgoY();
    }
    this.positionUpdate();
  };

  moveAlgoX = () => {
    //flyRandomMovement IS USED WITH RANDOM AND movementSpeed TO CREAT A SPORADIC FLY MOVEMENT (IN THE Y AXIS)
    this.flyRandomMovement = Math.floor(Math.random() * this.movementSpeedX);

    //WITH THIS IF WE FIND OUT IN WHAT POSITION IS THE FLY VS THE POOP TO MAKE IT GO IN THE DIRECTION OF THE POOP (IN THE X AXIS)
    if (gameObj.poop.x + 20 >= this.x) {
      this.x = this.x + this.flyRandomMovement;
    } else if (gameObj.poop.x + 20 <= this.x) {
      this.x = this.x - this.flyRandomMovement;
    }
  };

  moveAlgoY = () => {
    //flyRandomMovement IS USED WITH RANDOM AND movementSpeed TO CREAT A SPORADIC FLY MOVEMENT (IN THE Y AXIS)
    this.flyRandomMovement = Math.floor(Math.random() * this.movementSpeedY);

    //WITH THIS IF WE FIND OUT IN WHAT POSITION IS THE FLY VS THE POOP TO MAKE IT GO IN THE DIRECTION OF THE POOP (IN THE Y AXIS)
    if (gameObj.poop.y + 20 >= this.y) {
      this.y = this.y + this.flyRandomMovement;
    } else if (gameObj.poop.y + 20 <= this.y) {
      this.y = this.y - this.flyRandomMovement;
    }
  };

  //THIS METHOD IS USED TO UPDATE THE POSITION OF THE FLY IN THE DOM
  positionUpdate = () => {
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  };

  //flyFlyAnimationInFrame IS USED TO MOVE THROUGH THE DIFFERENT IMAGES OF THE FLY TO CREATE AN ANIMATION EFFECT
  // this.flyFlyAnimationFps WE CAN CONTROL THE SPEED ON THE ANIMATION

  //WITH THIS METHOD WE DO ALL THE ANIMATION MAGIC
  //I CREATED IMAGES WITH THE SAME NAME BUT ENDIND IN A DIFERENT NUMBER TO BE ABLE TO CALL THEM EASYLY FROM JS
  flyFlyAnimation = () => {
    // console.log("flyflylittlefly")

    //WE USE THE gameObj.frames TO KNOW IN WHAT FRAME WE ARE IN AND THE % WITH this.flyFlyAnimationFps TO STATE IN WHAT CONSECUTIVE FRAMES WE WANT TO PROCESS THE ANIMATION
    //AND WE CAN SWITCH BETWEEN THE IMAGES
    if (gameObj.frames % this.flyFlyAnimationFps === 0) {
      if (this.flyFlyAnimationInFrame === 1) {
        this.flyFlyAnimationInFrame++;
        this.node.src = `./images/Fly_${this.flyFlyAnimationInFrame}.png`;
      } else if (this.flyFlyAnimationInFrame === 2) {
        this.flyFlyAnimationInFrame = 1;
        this.node.src = `./images/Fly_${this.flyFlyAnimationInFrame}.png`;
      }
    }
  };
}
