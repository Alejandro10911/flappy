/* Proyecto basado de la lista de reprodución llamada 
"Coding Challenges" del canal de youtube The Coding Train,
en específico del video Coding challenge #31: Flappy Bird.

Referencia:
https://www.youtube.com/watch?v=cXgA1d_E-jY&t=797s */


var bird;
var pipes = [];
var wind = [];
var ambienceSound;
var hitSound;
var windSound;

function preload() {
  ambienceSound = loadSound('sounds/ambience.mp3');
  hitSound = loadSound('sounds/lose_sound.mp3');
  windSound = loadSound('sounds/wind.mp3');
}

function setup() {
  createCanvas(1000, 600);
  bird = new Bird();
  ambienceSound.setVolume(0.2);
  hitSound.setVolume(0.1);
  windSound.setVolume(0.7);
  ambienceSound.loop();
  windSound.loop();
}

function draw() {
  background(0, 0, 220);

  for (var i = 0; i < pipes.length; i++) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log("HIT");
    }

    if (pipes[i]) {
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

  }
  //console.log(wind.length);
  //console.log(pipes.length);

  for (var i = wind.length - 1; i >= 0; i--) {
    wind[i].update();
    wind[i].display();

    if (wind[i].offscreen()) {
      wind.splice(i, 1);
    }

  }

  bird.update();
  bird.show();

  // añadir nuevo pipe en base al contador de frames 
  if (frameCount % 60 == 0) {
    pipes.push(new Pipe());
  }

  // añadir nuevo wind en base al contador de frames
  if (frameCount % 1 == 0) {
    wind.push(new Wind());
  }

  // tecla presionada para crear dash, incrementar velocidad del viento
  if (keyIsPressed === true) {
    if (key == 'd') {
      bird.dashRigth();
      for (var i = wind.length - 1; i >= 0; i--) {
        wind[i].increaseVelocity();
      }
    }

  }
  if (keyIsPressed === true) {
    if (key == 'w') {
      bird.dashUp();
    }
  }
  if (keyIsPressed === true) {
    if (key == 's') {
      bird.dashDownn();
    }
  }

}
function mouseClicked() {
  bird.up();
}

// creación de los tubos
function Pipe() {

  var spacing = 150;
  var centery = random(spacing, height - spacing);

  this.top = centery - spacing / 2;
  this.bottom = height - (centery + spacing / 2);
  this.x = width;
  this.w = 80;
  this.speed = 6;
  this.velocityWhileDash = 12;
  this.valueOutScreen = 0;


  this.hits = function (bird) {
    if (bird.y <= this.top + 30 || bird.y >= height - this.bottom - 30) {
      if (bird.x >= this.x - 10 && bird.x <= this.x + this.w + 30) {
        bird.resetGame();
      }
    }
  }

  this.show = function () {
    noStroke();
    fill(180, 0, 255);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  this.update = function () {
    this.x -= this.speed;
  }

  this.offscreen = function () {
    if (this.x < - this.w) {
      return true
    } else {
      return false
    }
  }

}

//creación de bird
function Bird() {
  this.y = height / 4;
  this.x = width / 2 + width / 4;

  this.gravity = 0.6;
  this.lift = -25;
  this.velocity = 0;
  this.force = 230;
  this.velocityDash = 20;
  this.red = 255;
  this.green = 255;
  this.blue = 255;

  this.resetGame = function () {
    this.y = height / 4;
    this.x = width / 2 + width / 4;
    pipes = [];
    wind = [];
    hitSound.play();
  }

  this.show = function () {
    fill(this.red, this.green, this.blue);
    noStroke();
    circle(this.x, this.y, 60);
  }

  this.up = function () {
    this.velocity += this.lift;
  }

  this.update = function () {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;
    this.x -= this.force / 30;

    if (this.y > height || this.x < 0) {
      this.resetGame();
    }

  }

  // mecánica dash
  this.dashRigth = function () {
    this.x += this.velocityDash;
    this.velocity = 0;
  }
  this.dashUp = function () {
    this.y -= this.velocityDash;
    this.velocity = 0;
  }
  this.dashDownn = function () {
    this.y += this.velocityDash;
    this.velocity = 0;
  }
}

//creación de el viento
function Wind() {

  this.x = random(width + 20, width + 50);
  this.y = random(height);
  this.lenght = 80;
  this.velocity = 25;
  this.velocityWhileDash = 40;
  this.w = 0;

  this.update = function () {
    this.x -= this.velocity;
  }

  this.display = function () {
    stroke(255);
    strokeWeight(2);
    line(this.x, this.y, this.x + this.lenght, this.y)
  }

  // incrementar velocidad del viento mientras sucede el dash
  this.increaseVelocity = function () {
    this.x -= this.velocityWhileDash;
  }

  this.offscreen = function () {
    if (this.x < - this.w) {
      return true
    } else {
      return false
    }
  }
}

