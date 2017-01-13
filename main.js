var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var para = document.querySelector('p');
var count = 0;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}
function Shape(){
  this.x = random(0,width);
  this.y = random(0,height);
  this.velX = random(-7,7);
  this.velY = random(-7,7);
  this.exists = true;
}
function Ball(x,y,velX,velY,exists){
  Shape.call(this,x,y,velX,velY,exists);

  this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')';
  this.size = random(10,20);
}

function EvilCircle(x,y,exists){
  Shape.call(this,x,y,exists);

  this.color = 'white';
  this.size = 10;
  this.velX = 20;
  this.velY = 20;
}

EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 2;
  ctx.arc(this.x, this.y, this.size, 0,2*Math.PI);
  ctx.stroke();
}
EvilCircle.prototype.checkBounds = function(){
  if((this.x + this.size) >= width){
    this.x -= this.size;
  }
  if((this.x - this.size) <= 0){
    this.x += this.size;
  }
  if((this.y + this.size ) >= height){
    this.y -= this.size;
  }
  if((this.y - this.size) <= 0){
    this.y += this.size;
  }
}
EvilCircle.prototype.setControls = function(){
  var _this = this;
  window.onkeydown = function(e){
    if(e.keyCode == 65){
      _this.x -= _this.velX;
    }else if(e.keyCode === 68){
      _this.x += _this.velX;
    }else if(e.keyCode === 87){
      _this.y -= _this.velY;
    }else if(e.keyCode === 83){
      _this.y += _this.velY;
    }
  }
}
EvilCircle.prototype.collisionDetect  = function(){
  for (var j = 0; j < balls.length; j++){
    if(balls[j].exists === true){
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx**2 + dy**2);
      if(distance < this.size + balls[j].size){
        count -= 1;
        balls[j].exists = false;
      }
    }
  }
}
/*function Ball() {
  this.x = random(0,width);
  this.y = random(0,height);
  this.velX = random(-7,7);
  this.velY = random(-7,7);
  this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')';
  this.size = random(10,20);

}
*/
Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
  ctx.fill();
}
Ball.prototype.update = function(){
  if((this.x + this.size) >= width){
    this.velX = -(this.velX);
  }
  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }
  if((this.y + this.size) >= height){
    this.velY = -(this.velY);
  }
  if((this.y - this.size) <= 0){
    this.velY = -(this.velY);
  }
  this.x += this.velX;
  this.y += this.velY;
}
Ball.prototype.collisionDetect = function(){
  for (var j = 0; j < balls.length;j++){
    if((!(this.x === balls[j].x && this.y === balls[j].y && this.velX === balls[j].velX && this.velY === balls[j].velY))){
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx*dx + dy*dy);

      if(distance < this.size + balls[j].size){
        balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ','+ random(0,255)+')';
        balls[j].velX = -(balls[j].velX);
        balls[j].velY = -(balls[j].velY);
        this.velX = -(this.velX);
        this.velY = -(this.velY);
      }
    }
  }
}
var balls = [];
var lilEvil = new EvilCircle();
lilEvil.setControls();
var loop = function(){
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);

  while(balls.length < 28){
    var ball = new Ball();
    balls.push(ball);
    count += 1;
  }
  for(var i = 0; i < balls.length; i++){
    if(balls[i].exists === true){
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  para.innerHTML = "Ball count: " + count;
  }
  lilEvil.draw();
  lilEvil.checkBounds();
  lilEvil.collisionDetect();
  requestAnimationFrame(loop);
};
loop();
