var bird;
var pipes = [];
var maxLines = 100;
var wind = [];

function setup() {
  createCanvas(1000, 600);
  bird = new Bird();
  //pipes.push(new Pipe());
  //wind.push(new Wind());
}

function draw() {
  background(0, 0, 220);

  for (var i = 0; i < pipes.length; i++) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log("HIT");
    }
  }

  // loop del viento
  for (var i = 0; i < maxLines; i++) {
    wind.push(new Wind());
  }

  //loop de los tubos
  for (var i = 0; i < maxLines; i++) {
    wind[i].update();
    wind[i].display();

  }

  bird.update();
  bird.show();

  // añadir nuevo pipe en base a al contador de frames 
  if (frameCount % 50 == 0) {
    pipes.push(new Pipe());
  }

  // tecla presionada para crear dash, incrementar velocidad del viento, 
  // borrar elementos de array pipes[]
  if (keyIsPressed === true) {
    if (key == ' ') {
      bird.dashRigth();
      for (var i = 0; i < maxLines; i++) {
        wind[i].increaseVelocity();
      }
      for (var i = 0; i < pipes.lenght; i++) {
        pipes.splice(i, 1);
      }
    }

  }
  if (keyIsPressed === true) {
    if (key == 'c') {
      bird.dashUp();
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
  this.highlight = false;


  this.hits = function (bird) {
    if (bird.y <= this.top + 40 || bird.y >= height - this.bottom - 40) {
      if (bird.x >= this.x - 10 && bird.x <= this.x + this.w + 40) {
        this.highlight = true;
        bird.resetGame();
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  this.show = function () {
    noStroke();
    fill(180, 0, 255);
    if (this.highlight) {
      fill(255);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  this.update = function () {
    this.x -= this.speed;
  }

}

//creación de bird
function Bird() {
  this.y = height / 4;
  this.x = width / 2 + width / 4;

  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;
  this.force = 200;
  this.velocityDash = 20;
  this.red = 255;
  this.green = 255;
  this.blue = 255;

  this.resetGame = function () {
    this.y = -40;
    this.x = width / 2 + width / 4;
    pipes = [];
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
}

//creación de el viento
function Wind() {

  this.x = random(20, width);
  this.y = random(height);
  this.lenght = 50;
  this.velocity = 15;
  this.velocityWhileDash = 40;

  this.resetGame = function () {
    this.x = random(20, width);
    this.y = random(height);
  }

  this.update = function () {
    this.x -= this.velocity;

    if (this.x < 0) {
      this.x = random(width + 20, width * 2);
    }
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
}

