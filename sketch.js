var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function draw() { 
  background(240);

  text("Score : " + score,500,50);
  
  if(gameState===PLAY){
  
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }
  
      if(keyDown("space")  && monkey.y >=248) {
        player.velocityY = -12;
      }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnBananas();
    spawnObstacles();

    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score = score + 2;
      monkey.scale +=0.005
    }
  
    if(obstacleGroup.isTouching(monkey)){
      gamestate = END;
    }
  }

  else if(gamestate === END){
    textSize(30);
    fill(255)
    text("Game Over",200,150);
    ground.velocityX = 0;
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();

    monkey.visible = false;
  }

  drawSprites();
}

function spawnBananas(){
  if(frameCount % 80 === 0){
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage("bana",bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -6;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    bananaGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 120 === 0){
    obstacle = createSprite(600,250,40,10);
    obstacle.velocityX = -6;
    obstacle.addImage("obsta",obstacleImage);
    obstacle.scale = 0.14;
    obstacle.lifetime = 300;
    monkey.depth = obstacle.depth + 1;
    obstacleGroup.add(obstacle);
  }
}