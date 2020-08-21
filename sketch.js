var trex, trexrunnning
var ground, groundimg
var PLAY = 1
var END = 0
var gameState = PLAY
var count = 0
var invisibleGround 
var restart
var gameOver
var ObstaclesGroup
var CloudsGroup
var Cloud
var Cloudimg
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
var jumpsound
var trexdead
localStorage["highestScore"] = 0

function preload (){
  trexrunning = loadAnimation ("trex1.png","trex3.png","trex4.png" ) 
  groundimg = loadImage ("ground2.png")
  restartimg = loadImage ("restart.png")
  gameOverimg = loadImage ("gameOver.png")
  Cloudimg = loadImage ("cloud.png")
  obstacle1 = loadImage ("obstacle1.png")
  obstacle2 = loadImage ("obstacle2.png")
  obstacle3 = loadImage ("obstacle3.png")
  obstacle4 = loadImage ("obstacle4.png")
  obstacle5 = loadImage ("obstacle5.png")
  obstacle6 = loadImage ("obstacle6.png")
  jumpsound = loadSound ("BassAmbSlap 122 8c.mp3")
  trexdead = loadAnimation ("trex_collided.png")
}
function setup() {
  trex = createSprite (20, 140, 20, 10)
  trex.scale = 0.5
  trex.addAnimation ("trexrunning", trexrunning)
  trex.addAnimation ("trexcolliding",trexdead) 
  createCanvas(600, 200);
  ground = createSprite (200, 190, 600, 10); 
  ground.addImage ("groundimg", groundimg)
  invisibleGround = createSprite (200, 195, 600, 5);
  invisibleGround.visible = false
  restart =  createSprite (300, 80, 10, 10);
  restart.addImage ("restartimg", restartimg)
  gameOver = createSprite (300, 30, 40, 5)
  gameOver.addImage ("gameOverimg", gameOverimg)
  restart.visible = false 
  gameOver.visible = false
  ObstaclesGroup = new Group (); 
  CloudsGroup = new Group ();
  var obsticales
  

}

function draw() {
  //set background to white
  background("white");
  //display score
  text("Score: "+ count, 500, 13);
  
  text("High score: "+ localStorage["highestScore"], 350,13)
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    //scoring
    count = Math.round(World.frameCount/4);
    
    
    if (count>0 && count%100 === 0){
     // playSound("checkPoint.mp3");
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 169) {
      trex.velocityY = -12 ;
      //jumpsound.play();
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    obsticales();
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){
      //playSound("jump.mp3");
      gameState = END;
      //playSound("die.mp3");
   } 
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trexcolliding");
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnClouds() {
   if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random (80,120);
    cloud.addImage ("Cloudimg", Cloudimg)
    cloud.scale = 0.5;
    cloud.velocityX = -5;
   cloud.lifetime = 134;
    CloudsGroup.add(cloud);
 cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
}
function reset (){ 
//trex.setAnimation("trex");
gameState = PLAY;
CloudsGroup.destroyEach();
ObstaclesGroup.destroyEach();
//birdgroup.destroyEach();
restart.visible = false;
gameOver.visible = false;  
trex.changeAnimation ("trexrunning")
  if (localStorage["highestScore"] < count) {
   localStorage["highestScore"] = count  
  } 
  count = 0;
}

function obsticales (){
if (World.frameCount %90 === 0){ 
var obsticale1 = createSprite(600, 170, 30, 10);
  obsticale1.velocityX = -8;    
  var num = Math.round(random(1,6));
  switch(num) {
    case 1: obsticale1.addImage (obstacle1);
  break;
  
  case 2: obsticale1.addImage (obstacle2);
  break;
  
  case 3: obsticale1.addImage (obstacle3);
  break;
  
  case 4: obsticale1.addImage (obstacle4)
  break;
  
  case 5: obsticale1.addImage (obstacle5)
  break;
  
  case 6: obsticale1.addImage (obstacle6)
  break;
  
  default : break; 
  }
  
 obsticale1.scale = 0.5;
  obsticale1.lifetime = 100;
  ObstaclesGroup.add(obsticale1);
 }
 }



