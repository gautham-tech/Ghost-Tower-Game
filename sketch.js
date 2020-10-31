var PLAY = 1;
var END = 0;
var tower,towerImage;
var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;
var ghost,ghostImage;
var gameState = PLAY;
var l,lGroup;
var spookySound;

function preload(){
 
towerImage = loadImage("tower.png");
doorImage = loadImage("door.png");
climberImage = loadImage("climber.png");
ghostImage = loadImage("ghost-standing.png");
spookySound = loadSound("spooky.wav");
}

function setup(){
createCanvas(600,600); 
spookySound.loop();

tower = createSprite(300,300);
tower.addImage(towerImage); 
tower.velocityY = 1;

ghost = createSprite(300,300);
ghost.addImage(ghostImage);
ghost.scale = 0.3;

doorGroup = new Group();
climberGroup = new Group();
lGroup = new Group();
  
}

function draw(){
background(0);
  
if(gameState===PLAY){
  if(tower.y > 600){
   tower.y = 300;
   }
if(keyDown("right_arrow")){
   ghost.x = ghost.x + 3;
   }
  
if(keyDown("left_arrow")){
   ghost.x = ghost.x + -3;
   }
  if(keyDown("space")){
   ghost.velocityY = -5;
   }
  
ghost.velocityY = ghost.velocityY + 0.8;
 
if(climberGroup.isTouching(ghost)){
   ghost.velocityY = 0;
   }
  
  if(lGroup.isTouching(ghost)){
     ghost.destroy();
     gameState = END;
     }
  
spawnDoors();
drawSprites();
    }
else if(gameState===END){
        stroke("yellow"); fill("yellow"); textSize(30);               text("Game Over", 230,250)
         }    


}
function spawnDoors(){
if(frameCount%240===0){
   door = createSprite(300,-50);
   door.addImage(doorImage);
   climber = createSprite(300,10);
   climber.addImage(climberImage);
   door.velocityY = 1;
   ghost.depth = door.depth;
   ghost.depth = ghost.depth + 1;
   door.x = Math.round(random(120,400)); 
   doorGroup.add(door);
   climber.velocityY = 1;
   climber.x = door.x;
   climber.lifetime = 600;
   door.lifetime = 600;
   l = createSprite(climber,20,70,5);
   l.height = 2;
   l.x = climber.x;
   l.velocityY = 1;
   lGroup.add(l);
   climberGroup.add(climber);
   
   
   }  
}


