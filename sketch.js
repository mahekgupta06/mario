var mario, mario_running, mario_collided;
var bg, bgImage;
var brickGroup, brickImage;
var coinsGroup, coinImage, coinScore=0;
var coinSound

function preload(){
  mario_running =  loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png",
  "images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png");
  bgImage = loadImage("images/bgnew.jpg");
  brickImage = loadImage("images/brick.png");
  coinImage = loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png","images/con5.png","images/con6.png",)
  coinSound = loadSound("sounds/coinSound.mp3")
}

function setup() {
  createCanvas(1000, 600);

  bg = createSprite(580,300);
  bg.addImage(bgImage);
  bg.scale =0.5;
 
  bg.velocityX = -6;
  mario = createSprite(200,505,20,50);
  mario.addAnimation("running", mario_running);
  mario.scale =0.2;
  ground = createSprite(200,585,400,10);
  ground.visible = false;
  bricksGroup = new Group();
  coinsGroup = new Group();
}

function draw() {
 
  if (bg.x < 100){
    bg.x=bg.width/4;
  }
  if(mario.x<200){
    mario.x=200;
  }

  if(mario.y<50){
    mario.y=50;
  }

  if(keyDown("space") ) {
    mario.velocityY = -16;
  }
  mario.velocityY = mario.velocityY + 0.5;
  generateBricks();
  for(var i = 0 ; i< (bricksGroup).length ;i++){
    var temp = (bricksGroup).get(i) ;
    
    if (temp.isTouching(mario)) {
       mario.collide(temp);
      }
        
    }
generateCoins();
for(var i = 0 ; i< (coinsGroup).length ;i++){
  var temp = (coinsGroup).get(i) ;
  if (mario.isTouching(temp) ){
    coinSound.play()
    temp.destroy()
    temp=null
    coinScore++
    console.log(coinScore)
  }
}
  mario.collide(ground);

  drawSprites();
  textSize(30)
  text("coins collected:"+ coinScore, 700,50)
  
}


function generateBricks() {
  if (frameCount % 70 === 0) {
    var brick = createSprite(1200,120,40,10);
    brick.y = random(50,450);
    brick.addImage(brickImage);
    brick.scale = 0.5;
    brick.velocityX = -5;
    
    brick.lifetime =250;
    bricksGroup.add(brick);
  }
}

function generateCoins(){
  if (frameCount % 50 === 0){
    var coin =createSprite(1200,120,40,10);
    coin.y= random(80,350);
    coin.addAnimation("coin", coinImage)
    coin.scale = 0.1;
    coin.velocityX = -5;

    coin.lifetime =250;
    coinsGroup.add(coin);

  }
}