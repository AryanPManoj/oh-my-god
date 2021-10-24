var PLAY = 1;
var END = 0;
var dino,dino2,dino3,dino4;
var ground2,invisibleGround,ground;
var gameOverImage;
var obstacle;
var score;


function preload(){
var dino2 = loadImage("trex1.png","trex3.png","trex4.png");
var dino = loadImage("trex_collided.png");
var ground2 = loadImage("background0.png");
var ground = loadImage("ground2.png");
var obstacle = loadImage("bomb.png");
var gameOverImage = loadImage("gameOver.png");
}
function setup(){
  createCanvas(600,200);
  dino2 = createSprite(100,200)
  dino2.addAnimation("running","dino2");
  dino2=addAnimation("collided","dino");
  dino.scale=0.5
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground","ground2.png");
  ground.x = ground.width/2
  ground.scale = 2.0;
  ground.velocityX = -4;
    
  ground.depth = dino2.depth;
  dino2.depth = dino2.depth + 1;
  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;
  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverImage);

  obstaclesGroup = createGroup();
  dino2.setCollider(10,10,10,10);
  dino2.debug = true;

  gameOver.scale = 0.5;

  score = 0;
}

function draw() {
  background(0);
    groundImage.scale=0.1
  if (gameState === PLAY) {
    gameOver.visible = false;

    ground.velocityX = -(4 + 3 * score / 100)

    score = score + Math.round(getFrameRate() / 60);

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //jump when the space key is pressed
    if (keyDown("space") && dino2.y >= 100) {
      dino2.velocityY = -12;
    }
    dino2.velocityY = earth.velocityY + 0.7


    spawnObstacles();

    if (obstaclesGroup.isTouching(dino2)) {
      gameState = END;

    }
  } else if (gameState === END) {
    gameOver.visible = true;
    dino.changeAnimation("collided", dino);

    ground.velocityX = 0;
    dino.velocityY = 0

    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);

    if (mousePressedOver(gameOver)) {
      reset();
    }
  }


  dino2.collide(invisibleGround);


  drawSprites();


  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 480, 40);
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  obstaclesGroup.destroyEach();
  dino.changeAnimation("running", dino2);
  score = 0;

}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -6;

    //generate random obstacles            
    var rand = Math.round(random(1, 3));
    switch (rand) {
        case 1:
        obstacle.addImage("bomb.png");
        obstacle.scale = 2.0
        break;
      default:
        break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
