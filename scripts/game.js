// console.log("Game.js Start");

class Game {
  constructor() {
    //STARTING CLASSES NEEDE
    this.raquet = new Raquet();
    this.poop = new Poop();

    //SETTING THE FRAME THE GAME IS CURENTLY ON
    this.frames = 0;

    //THIS STATEMENT IS USED END THE GAME
    this.isGameOn = true;

    //THIS IS USED TO PAUSE THE GAME
    this.gamePause = false;

    //STORE SPAWNED FLIES
    this.fliesArray = [];

    //THIS STATEMENT IS USED TO CHANGE THE AMOUNT OF FLIES THAT ARE SPAWNED EVERY FRAME BUT THIS VALUE WILL BE CHANGED WHEN THE GAME STARTS
    this.fliesSpawnRate = 120; /*DIVIDE BY 60 TO GET SECONDS */

    //WITH THIS WE CAN CHANGE THE SPEED ON THE FLIES WHE AN NEW FLY IS CREATED BUT THIS VALUE WILL BE CHANGED WHEN THE GAME STARTS
    this.fliesSpeedX = 3;
    this.fliesSpeedY = 2;

    //METHOD USED TO STAR MUSIC AND WE START THE MUSIC WHEN THE GAME STARTS
    this.startbackgroundMusic();

    // THIS IS TO KNOW IF THE HIT ANIMATION HAS TO BE PROCESED OR NOT
     this.doHitAnimation = false;

    //HERE WE WILL STORE THE SPLATS CREATED ONCE A FLY IS KILLED
    this.splatArray = [];

    //THIS THIS STATEMENT IS USED TO SAVE THE SCORE AND THE HI-SCORE
    this.score = 0;
    this.hiScore = 0;

    //CREATING THE ACCESS TO THE DOM PLACEMENT OF WERE SCORE AND HI-SCORE IS VISUALIZED
    this.scoreNode = document.querySelector("#score");
    this.hiScoreNode = document.querySelector("#hiScore");

    // WITH THIS METHOD WE LOAD THE HI-SCORE AND WE LOAD THE GAME SCORE WHEN THE GAME STARTS
    this.loadHiScore();

    //THIS STATMENT IS USED TO CREATE A RANDOM INCREASE OF DIFICULTY AFTER WE FINISH THE STATED BEGGINING OF GAME DIFICULTY PLAN
    this.randomDificulty = 0;
  }

  //THIS IS MY AMAZING DIFFICULTY ENGINE
  difficulyController = () => {
    //USED A SWITCH FOR NEATER CODE
    //CHANGING THE FLIES SPEED AND SPAWN RATE FOR EVERY 
    //NEW FLY SPAWNED WE CAN CREATE SOME FUKY EFFECTS

    switch (this.frames) {
      case 300:
        // IN GAME 5 SECONDS
        this.fliesSpeedX = 4;
        this.fliesSpeedY = 3;
        this.fliesSpawnRate = 60;
        break;
      case 600:
        // IN GAME 10 SECONDS
        // HERE WE SPAWN FASTER FLIES BUT AT A SLOWER RATE
        this.fliesSpeedX = 6;
        this.fliesSpeedY = 3;
        this.fliesSpawnRate = 120;
        break;
      case 840:
        // IN GAME 14 SECONDS, HAS A NICE GAME MUSIC BEAT
        // HERE WE SPAWN MANY FLIES BUT A SLOWER RATE TO CREAT A WAVE EFFECT
        this.fliesSpeedX = 2;
        this.fliesSpeedY = 2;
        this.fliesSpawnRate = 15;
        break;
      case 1200:
        // IN GAME 20 SECONDS
        this.fliesSpeedX = 4;
        this.fliesSpeedY = 3;
        this.fliesSpawnRate = 60;
        break;
      case 1500:
        // IN GAME 25 SECONDS
        this.fliesSpeedX = 6;
        this.fliesSpeedY = 3;
        this.fliesSpawnRate = 60;
        break;
      case 1800:
        // IN GAME 30 SECONDS
        // HERE WE SPAWN MANY FLIES BUT A SLOWER RATE TO CREAT A WAVE EFFECT
        this.fliesSpeedX = 3;
        this.fliesSpeedY = 3;
        this.fliesSpawnRate = 20;
        break;
      case 2100:
        // IN GAME 35 SECONDS
        // HERE WE SPAWN FASTER FLIES BUT AT A SLOWER RATE
        this.fliesSpeedX = 10;
        this.fliesSpeedY = 6;
        this.fliesSpawnRate = 120;
        break;
      case 2400:
        // IN GAME 40 SECONDS
        this.fliesSpeedX = 15;
        this.fliesSpeedY = 7;
        this.fliesSpawnRate = 90;
        break;
      case 2700:
        // IN GAME 45 SECONDS
        this.fliesSpeedX = 4;
        this.fliesSpeedY = 4;
        this.fliesSpawnRate = 20;
        break;
      // IN GAME 50 SECONDS
      case 3000:
        this.fliesSpeedX = 6;
        this.fliesSpeedY = 3;
        this.fliesSpawnRate = 60;
        break;
    }

    //AFTER THE PLANED 50 SECONDS DIFICULTY, WE START THE AUTO MODE
    //EVERY 5 SECONDS WE WILL DO A RANDOM DIFICULTY RANDOM

    if (this.frames > 3000 && this.frames % 300 === 0) {
      //WE WILL NOT INCREASE THE DIFICULTY IF THE VALUE OF randomDificulty IS 4
      this.randomDificulty = Math.floor(Math.random() * 4);

      //INCREASE NEW SPAWNED FLIES X SPEED
      if (this.randomDificulty === 0) {
        this.fliesSpeedX++;

        //INCREASE NEW SPAWNED FLIES Y SPEED
      } else if (this.randomDificulty === 1) {
        this.fliesSpeedY++;

        //INCREASE NEW SPAWNED FLIES SPAWN RATE
      } else if (this.randomDificulty === 2) {
        this.fliesSpawnRate = this.fliesSpawnRate - 10;
      }
    }
  };

  //METHOD USED TO INCRESE THE SOCRE AND UPDATING THE DOM
  scoreUP = () => {
    this.score++;
    this.scoreNode.innerText = `Score: ${this.score}`;
  };

  //METHOD USED TO TO RESET THE SCORE IN THE DOM
  scoreReset = () => {
    this.scoreNode.innerText = `Score: 0`;
  };

  //METHOD USED TO LOAD THE HI SCORE EVERYTHIME THE NEW OBJECT IS CREATED
  loadHiScore = () => {
    //VERIFY THAT THE THERE IS A VALUE STORED IN localStorage
    if (
      localStorage.getItem("highScore") === undefined ||
      localStorage.getItem("highScore") === null
    ) {
      //IF NO VALE IS STORED WE JUST THE THE DOM TO 0 AS THE HISCORE STATEMENT IS ALREADY 0
      this.hiScoreNode.innerText = `Hi-Score: 0`;
    } else {
      //IF WE HAVE A VALID VALUE STORED WE UPDATE HISCORE STATEMENT AND THE THE DOM WITH THE VALID VALUE
      this.hiScore = localStorage.getItem("highScore");
      this.hiScoreNode.innerText = `Hi-Score: ${this.hiScore}`;
    }
  };

  //THIS METHOD IS USED TO CHECK IF THE NEW SCORE IS HIGHER THAN HI-SCORE AND UPDATE THE localStorage
  saveHiScore = () => {
    if (this.score > this.hiScore) {
      localStorage.setItem("highScore", this.score);
    }
  };

  //THIS METHOD IS USED TO SPAWN FLIES
  fliesSpawn = () => {
    //WITH this.frames AND this.fliesSpawnRate WE CHANGE THE SPAWN RATE WE WANT FLIES TO SPAWN
    if (this.frames % this.fliesSpawnRate === 0) {
      //RANDOMIZING WALL TO SPWAN FROM
      this.randomWallUpRightDownLeft = Math.floor(Math.random() * 4);

      //RANDOMIZING FROM WHAT HIEGHT AND WIDTH TO SPAWN THE FLY
      this.randomWidth = Math.floor(Math.random() * gameBoxNode.offsetWidth);
      this.randomHeight = Math.floor(Math.random() * gameBoxNode.offsetHeight);

      //LIKE THIS WE CAN RANDOM FORM WHAT WALL WE WILL SPAWN THE FLY AND FROM THAT WALL WE WILL CHOOSE THE RANGE

      // console.log(randomWallUpRightDownLeft)
      //console.log("Spawned A Fly")

      //EACH TIME A NEW FLY IS CREATED WE WILL SEND THE NEEDED ARGUMENTS
      let newFly = new Fly(
        this.randomWallUpRightDownLeft,
        this.randomWidth,
        this.randomHeight,
        this.fliesSpeedX,
        this.fliesSpeedY
      );

      //WE WILL PUSH THE NEW CREATED FLY INTO THE FLIES ARRAY TO BE ABLE TO MANAGE THE FLIES WITH LOOPS EASLEY
      this.fliesArray.push(newFly);
    }
  };

  //THIS METHOD IS USED TO CREATE A NEW SPLAT EVERY TIME A FLY IS KILLED
  //WE NEED THE X AND Y VALUES OF THE SPLATED FLY TO BE ABLE TO POSITION THE SPLAT PROPERLY
  splatSpawn = (flyPosiionX, flyPosiionY) => {
    let newSplat = new Splat(flyPosiionX, flyPosiionY);

    //WE WILL PUSH THE NEW CREATED SPLAT INTO THE SPLAT ARRAY TO BE ABLE TO MANAGE THE SPLATS WITH LOOPS EASLEY
    this.splatArray.push(newSplat);
  };

  //THIS WILL LOOK FOR ACTIVE SPLATS TO ANIMATE IF splatActive === true
  //OR WILL DELETE SPLATS FROM splatArray AND FROM DOM IF splatActive === false
  //WE USE A FOR EACH LOOP TO GO THROUGH AL THE SPLATS
  splatControl = () => {
    this.splatArray.forEach((splatInSplatArray, index) => {
      if (splatInSplatArray.splatActive === true) {
        splatInSplatArray.splatAnimation();
      } else if (splatInSplatArray.splatActive === false) {
        splatInSplatArray.node.remove();
        this.splatArray.splice(index, 1);
      }
    });
  };

  //WE USE THIS METHOD TO DETECT COLLITIONS FROM THE RAQUET WITH THE FLIES
  raquetTofliesCollision = () => {
    //  console.log(this.fliesArray,length)

    //EACH TIME THE THE METHOD IS CALLED WE WILL PLAY THE SMACK SOUND EVEN IF WE DONT KILL A FLY
    this.playsmackSound();

    //WE USE A FOREACH TO GO THROUGH ALL THE FLIES IN THE fliesArray
    this.fliesArray.forEach((flyInFliesArray, index) => {
      // ALGO TO DETECT COLISION
      if (
        this.raquet.x < flyInFliesArray.x + flyInFliesArray.w &&
        this.raquet.x + this.raquet.w > flyInFliesArray.x &&
        this.raquet.y < flyInFliesArray.y + flyInFliesArray.h &&
        this.raquet.y + this.raquet.h > flyInFliesArray.y
      ) {
        // console.log(index)

        //IF A COLLISION IS DETECTED WE WILL SPAWN A SPLAT
        //DELETE THE FLY FORM THE ARRAY
        //DELTE THE FLY FROM THE DOM
        //CALL THE PLAYOUCH SOUND AND INCREASE THE SCORE

        this.splatSpawn(flyInFliesArray.x, flyInFliesArray.y);
        flyInFliesArray.node.remove();
        this.fliesArray.splice(index, 1);
        this.playOuchSound();
        this.scoreUP();
      }
    });

    //console.log(this.fliesArray.length)
  };

  //HERE WE WILL LOOK FOR COLLISION WITH THE FLIES AND THE POOP
  flyToPoopCollision = () => {
    this.fliesArray.forEach((flyInFliesArray) => {
      if (
        //ADDED -20 TO THE COLLITION ALGO TO MAKE THE HIT BOX A LITTLE SMALLER AND MAKE THE FLIES TOUCH BETTER THE POOP
        this.poop.x < flyInFliesArray.x + flyInFliesArray.w - 20 &&
        this.poop.x + this.poop.w - 20 > flyInFliesArray.x &&
        this.poop.y < flyInFliesArray.y + flyInFliesArray.h - 20 &&
        this.poop.y + this.poop.h - 20 > flyInFliesArray.y
      ) {
        //console.log("Fly is in Poop")
        //IF THE COLLISION IS TRUE WE WILL CALL THE gameOver METHOD
        this.gameOver();
      }
    });
  };

  //THE GAME OVER METHOD, WILL TRY TO SAVE THE HI-SCORE, RESET THE SCORE TURN THE STATEMENTE isGameOn = false TO STOP THE GAME LOOP
  //SWAP THE SCREENS TO THE GAME OVER SCREEN, STOP THE MUSIC AND PLAY THE UH-OH SOUND
  gameOver = () => {
    this.saveHiScore();
    this.scoreReset();
    this.isGameOn = false;
    gameScreenNode.style.display = "none";
    gameOverScreenNode.style.display = "flex";
    this.stopbackgroundMusic();
    Uh_OhSoundNode.play();
    Uh_OhSoundNode.volume = "0.2";
  };

  //METHOS TO STAR MUSIC AND SET THE VOLUME
  startbackgroundMusic = () => {
    backgroundMusicNode.play();
    backgroundMusicNode.volume = "0.1";
  };

  //METHOS TO PAUSE THE MUSIC AND SET THE MUSIC TO THE BEGGINING OF THE SONG
  stopbackgroundMusic = () => {
    backgroundMusicNode.pause();
    backgroundMusicNode.currentTime = 0;
  };

  //METHOD TO PLAY THE SMACK SOUND
  playsmackSound = () => {
    smackSoundNode.volume = "0.2";
    smackSoundNode.play();
  };

  //METHOD TO PLAY THE OUCH SOUND ONCES A FLY IS KILLED
  playOuchSound = () => {
    //RANDOM CHANCE TO PLAY OUCH SOUND SOMETIMES IT DOESNT PLAY NOT USING 0 AND 6
    // THE OUCH SOUND IS MY OWN VOICE!!!
    this.chanceToPlaySound = Math.floor(Math.random() * 4);

    if (this.chanceToPlaySound === 0) {
      // Ouch1SoundNode.volume = "0.8";
      Ouch1SoundNode.play();
    } else if (this.chanceToPlaySound === 1) {
      // Ouch2SoundNode.volume = "0.8";
      Ouch2SoundNode.play();
    } else if (this.chanceToPlaySound === 2) {
      // Ouch3SoundNode.volume = "0.8";
      Ouch3SoundNode.play();
    } else if (this.chanceToPlaySound === 3) {
      // Ouch4SoundNode.volume = "0.8";
      Ouch4SoundNode.play();
    }
  };

  //THIS METHOD IS USED TO GO THROUGH EACH FLY IN THE fliesArray AND ANIMATE IT
  animateFlies = () => {
    this.fliesArray.forEach((flyInFliesArray, index) => {
      flyInFliesArray.flyFlyAnimation();
    });
  };

  //WITH THIS METHOD WE CALL THE MOVE MEHTOD FOR EACH FLY IN THE fliesArray
  moveFlies = () => {
    this.fliesArray.forEach((flyInFliesArray) => {
      flyInFliesArray.move();
    });
  };

  //THIS IS THE GAME LOOP, HERE CALL ALL THE MEHTOD THAT NEED TO BE CALLED EVERY FRAME
  //ALSO IT IS USED TO STOP OR PAUSE THE GAME
  gameLoop = () => {
    // console.log("In the Game Loop")
    this.difficulyController();
    this.frames++;
    this.fliesSpawn();
    this.flyToPoopCollision();
    this.animateFlies();
    this.splatControl();
    this.raquet.hitAnimation();
    this.poop.poopAnimation();
    this.moveFlies();

    if (this.isGameOn === true && this.gamePause === false) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}


