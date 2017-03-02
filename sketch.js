var rd, blu, grn, yllw, centerX, centerY, colors;

var startFrame = 0;
var currentIndex = 0;
var delay = 50;

var pressed = false;
var simonMode = true;
var gameOver = false;

var simon = [];
var player = [];



function setup() {
  createCanvas(600, 600);
  centerX = width/2;
  centerY = height/2;

  rd = { x: centerX + 110, y: centerY + 110 };
  blu = { x: centerX - 110, y: centerY + 110 };
  grn = { x: centerX - 110, y: centerY - 110 };
  yllw = { x: centerX + 110, y: centerY - 110 };

  colors = [rd, blu, grn, yllw];

  addToSimon();
}

function draw() {
  background(250);
  noStroke();

  drawSimon();

  if (simonMode) {
    simonsTurn();
  } else {
    listen();
  }

  if (gameOver) {
    noStroke();
    fill(0, 0, 0, 150);
    rect(0, 0, width, height);

    simonMode = false;
  }

}

function matchButtons() {
  if (player[player.length -1] != simon[player.length - 1]) {
    gameOver = true;
  }
}

function simonsPress() {
  pressed = simon[currentIndex];
}

function addToSimon() {
  var nextColor = random(colors);
  simon.push(nextColor);
}

function addToPlayer() {
  var playerSelection = pressed;
  player.push(playerSelection);
}

function simonsTurn() {
  if (frameCount > startFrame + delay) {
    if (!pressed) {
      startFrame = frameCount;
      simonsPress();
    } else {
    pressed = false;
    currentIndex++;
    }
  }

  if (currentIndex > simon.length - 1) {
    simonMode = false;
    player = [];
    currentIndex = 0;
  }
}

function listen() {
  matchButtons();

  if (player.length == simon.length) {
    addToSimon();
    startFrame = frameCount;
    simonMode = true;
    pressed = false;
  }
}

function mousePressed() {
  if (!simonMode) {
    pressed = {
      x: mouseX,
      y: mouseY
    };

    setPressed();
  }
}

function mouseReleased() {
  if (pressed && !simonMode) {
    addToPlayer();
    pressed = false;
  }
}


function setPressed() {
  var distFromCenter = dist(centerX, centerY, pressed.x, pressed.y);

  if (distFromCenter > 100 && distFromCenter < 225) {

    if (pressed.x < centerX - 15 && pressed.y < centerY - 15) {
      pressed = grn;

    } else if (pressed.x < centerX - 15 && pressed.y > centerY - 15) {
      pressed = blu;

    } else if (pressed.x > centerX - 15 && pressed.y < centerY - 15) {
      pressed = yllw;

    } else if (pressed.x > centerX - 15 && pressed.y > centerY - 15) {
      pressed = rd;
    }

  } else {
    pressed = false;
  }
}


function drawColors() {
  // red
  fill(225,50,50);
  arc(centerX, centerY, 500, 500, 0, HALF_PI);

  // blue
  fill(0,100,255);
  arc(centerX, centerY, 500, 500, HALF_PI, PI);

  // green
  fill(50,225,100);
  arc(centerX, centerY, 500, 500, PI, PI + HALF_PI);

  // yellow
  fill(215, 215, 0);
  arc(centerX, centerY, 500, 500, PI + HALF_PI, PI * 2);
}

function handleColorPress() {

  fill(255, 255, 255, 20);
  ellipse(pressed.x, pressed.y, 100, 100);

  fill(255, 255, 255, 25);
  ellipse(pressed.x, pressed.y, 60, 60);

  fill(255, 255, 255, 30);
  ellipse(pressed.x, pressed.y, 20, 20);


  stroke(30);
  strokeWeight(8);

  if (pressed == grn) {
    fill(255,255, 255, 60);
    arc(centerX, centerY, 500, 500, PI, PI + HALF_PI);

  } else if (pressed == blu) {
    fill(255,255, 255, 60);
    arc(centerX, centerY, 500, 500, HALF_PI, PI);

  } else if (pressed == yllw) {
    fill(255,255, 255, 98);
    arc(centerX, centerY, 500, 500, PI + HALF_PI, PI * 2);

  } else if (pressed == rd) {
    fill(255,255, 255, 60);
    arc(centerX, centerY, 500, 500, 0, HALF_PI);
  }
}

function drawCenter() {
  noStroke();
  fill(0);
  ellipse(centerX, centerY, 200, 200);

  strokeWeight(30);
  stroke(0);

  line(centerX, 50, centerX, height - 50);
  line(50, centerY, width - 50, centerY);
}

function drawSimon() {
  fill(0)
  ellipse(centerX, centerY, 550, 550);

  drawColors();

  handleColorPress();

  drawCenter();

}
