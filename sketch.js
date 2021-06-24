var PLAY = 1;
var END = 0;
var gameState = PLAY;

var jumpsound;
var scoresound;
var oversound

var MAN,MAN_img;
var panther,panther_img,panther_group;
var ground,ground_img,grass_img; 
var back_img;
var obstacle,obstacle_img,obstacle_group;
var standingman,back_img;;
var score = 0;
var edges;
var patheralone;

var gameOver, restart;


function preload(){

 MAN_img = loadAnimation("S1.png","S2.png","S3.png","S4.png","S5.png","S6.png")
 back_img = loadImage("back4.jpg");
 obstacle_img = loadImage("obstacle1.png");
 ground_img = loadImage("ground 5.jpg");
 standingman = loadImage("S1.png");
 grass_img = loadImage("spareground.png");
 panther_img = loadAnimation("E1.png","E2.png","E3.png");
 pantheralone = loadImage("E1.png");
 gameOverImg = loadImage("gameover.png");
 restartImg = loadImage("restart.png");

 jumpsound = loadSound("sounds/jump.wav");
 oversound = loadSound("sounds/Pocket.wav")
  scoresound = loadSound("sounds/collided.wav")

}


function setup() {
  createCanvas(displayWidth,655);
  
  edges = createEdgeSprites()
  
  MAN = createSprite(150, 489, 50, 50);
  MAN.addImage("standing",standingman);
  MAN.addAnimation("MAN",MAN_img)
  //MAN.debug=true;
  MAN.setCollider("rectangle",0,0,80,100)
  ground = createSprite(400,550,800,20);
  ground.addImage("GR1",grass_img);
  ground.velocityX = -5;


  panther_group = new Group();
  obstacle_group = new Group();

  gameOver = createSprite(width/2,250);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,400);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.2;
  restart.scale = 0.2;

  gameOver.visible = false;
  restart.visible = false;


}

function draw() {
  background(back_img);  
  MAN.bounceOff(edges);
  MAN.collide(ground);

  if(gameState === PLAY){

    ground.velocityX = -5;

    if(ground.x<480){
      ground.x = ground.width/2;   
       }
     

       if(keyDown("SPACE") && MAN.y >=450 ){
        MAN.changeAnimation("MAN",MAN_img)
        MAN.velocityY = -20;
    
       }

       MAN.velocityY += 0.8;

       
      spawnPanther();
      spawnObstacles();

      if(obstacle_group.isTouching(MAN)){
        score=score+1;
     
      obstacle_group[0].destroy();
      scoresound.play();
      }

      if(panther_group.isTouching(MAN)){
        gameState = END;
       oversound.play(); 
     } 
      

  }else if(gameState === END){


    gameOver.visible = true;
    restart.visible = true;

    MAN.changeAnimation("standing",standingman);
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    MAN.velocityY = 0;
    obstacle_group.setVelocityXEach(0);
    panther_group.setVelocityXEach(0);
    
    panther_group.destroyEach();
    
    
    if(mousePressedOver(restart)) {
          
          reset();
    }
    

  }
  
  textSize(20);
  stroke("black");
  strokeWeight(4)
  text("S c o r e =  " + score,120,50)


console.log(MAN.y)


  drawSprites();
}

function spawnObstacles(){
    
   if(frameCount %60 === 0 ){
     
    
      obstacle = createSprite(width-50,200,20,20);  
      obstacle.addImage("OB1",obstacle_img);
      obstacle.scale = 0.4;
      obstacle.velocityX = -6;
      obstacle.y = Math.round(random(120,300))
     
      obstacle.depth = MAN.depth;
      MAN.depth += 1;
     
      console.log(MAN.depth,obstacle.depth)
      obstacle_group.add(obstacle) 


    }  

}

function spawnPanther(){
  
  if(frameCount %125 === 0){
   
   
     panther = createSprite(width-50,489,20,20)
     //panther.debug =true
     panther.setCollider("rectangle",0,0,200,50)
     panther.addAnimation("panther",panther_img);
     panther.addImage("pantheralone",pantheralone);
     panther.velocityX = -6.5;
     panther.scale = 0.6;
     panther.depth = MAN.depth;
     MAN.depth += 1 
    panther_group.add(panther)


  }



}


function reset(){
  jumpsound.play();
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstacle_group.destroyEach();
  panther_group.destroyEach();
  

  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  
  score = 0;
  
}






