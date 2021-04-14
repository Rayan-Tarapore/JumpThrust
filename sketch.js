const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var engine,world;

var rocket
var rand,rand1
var blockGroup

var score
var back
var backSprite
var rocketImage,rocketFlameImage

var gameMode
function preload(){
   rocketImage = loadImage("rocketIm.png");
   rocketFlameImage = loadImage("rocketFlame.png");
   back = loadImage("BluePixelSpace.png");
}

function setup(){
createCanvas(800,450);
backSprite = createSprite(400,225,800,450);
backSprite.addImage(back);
back.resize(800,450);

score = 0
gameMode = 0;

rocket = createSprite(150,500,20,60);

rocket.setCollider("rectangle",0,0,24,60);

blockGroup = new Group();

engine = Engine.create();
world = engine.world;   


}

function draw(){
    score = score+0.3;

if(rocket.velocityY>0){
imageMode(CENTER);
rocket.addImage(rocketImage);
rocketImage.resize(64,64);


} else if(rocket.velocityY<=0){
imageMode(CENTER);
rocket.addImage(rocketFlameImage);
rocketFlameImage.resize(64,64);
}

 Engine.update(engine);

 //Screen
 if(gameMode===0){
 camera.position.x = -800

 noStroke();
 fill(0,255,230);
 rectMode(CENTER);
 rect(-810,225,400,200);
 textSize(40);
 textStyle("bold");
 noStroke();
 fill("white");
 textFont("lucida console");
 text("Jump-Thrust",-950,200);
 textSize(20);
 text("Press SPACE to Start",-935,250)
 
 }
 drawSprites();

 //Play Mode
 if(gameMode===1){
 //gravity
 rocket.velocityY = rocket.velocityY+0.5;
spawn(40);
collision();


//Score
textSize(24);
textStyle("bold");
noStroke();
textFont("courier new");
fill("#FEC200")
textSize(24);
text("S",7,24);
fill("#F78608")
text("c",21,24);
fill("#EE3711")
text("o",35,24);
fill("#E6172F")
text("r",49,24);
fill("#D20983")
text("e",63,24);
text(Math.round(score),85,24);


 }



}


//JumpThrust
function keyPressed(){
if(keyCode===32&&gameMode===1){
    rocket.velocityY = -7;
} else if(keyCode===32&&gameMode===0){
    camera.position.x = 400
    gameMode=1
    rocket.velocityY = 0;
        rocket.y = 200;
}

}
//spawn blocks
function spawn(constraint){
    rand1 = random(-constraint,constraint);
    rand = Math.round(rand1);
 if(frameCount%60===0){
  push();
  var blockUp = createSprite(810,75+rand,20,150+2*rand);
  blockUp.shapeColor = "255";
  var blockDown = createSprite(810,375+rand,20,150-2*rand);
  blockDown.shapeColor = "black";
  blockUp.lifetime = 500;
  blockDown.lifetime = 500;
  blockGroup.add(blockUp);
  blockGroup.add(blockDown);
  blockUp.velocityX = -2
  blockDown.velocityX = -2;
  pop();

 }
}
//collision
function collision(){
    if(rocket.isTouching(blockGroup)||rocket.y>450||rocket.y<0){
        
        gameMode=0
        blockGroup.destroyEach();
        score = 0;

        
    }
}