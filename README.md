# Array Fundamentals: Simon Lab
![simon](https://s3.amazonaws.com/upperline/curriculum-assets/p5js/labs/simon.gif)

It's your job to complete the code to make the "Simon" game.

The game works as follows, Simon will press down one of the colored buttons. Then you must copy him, pressing the same button he did. If you succeed, Simon will add another button to the pattern. He will start at the beginning and end with the newest button. After each of Simon's turns you must try to remember and repeat the entire pattern starting from the first button. What's the longest sequence you can remember?

## Arrays

We will be using Arrays to store a history of the entire pattern. There will be two main arrays. Your job will be to add elements to them and check them at certain indexes.

An array named `simon` will store all of Simon's move.

An array named `player` will keep track of your moves as you click on the buttons.

There's a lot of code here. Don't worry if 100% of it doesn't make sense. A lot of it is just making the game have a nice look and feel.  You need only write a small amount of code within four functions as instructed here.

## Instructions

**Note:** Any variable names mentioned in the instructions such as `simon`, `player`, `colors`, `gameOver`, `currentIndex` or `pressed` are **already defined and in scope** and **do not need to be defined with the `var` keyword**. You are simply reassigning or modifying the value of an existing variable.

Example:
```javascript
gameOver = true; // great! :)

var gameOver = true; // bad! :( this will break things
```
#### `simonsPress`

In this function you will be dealing with three variables `pressed`, `simon`, and `currentIndex`. You must assign a new value to `pressed`. That value should be the value of the array `simon` at the index specified by `currentIndex`.

#### `addToSimon`

Add code inside of a function named `addToSimon` that adds the next randomly selected color to the *end of the `simon` array.*  

To do this you should choose a random *index* within an array called `colors`.  For your first attempt use the `random` function to choose a random number between the smallest index `0` and the largest index. *Hint:* For an array with the `length` of `10`, the maximum index is `9`.

Store the random index in a variable and access the `colors` array at that index. Add that element to the end of the array `simon`.

Once you're done take a look at the `random` documentation to see if there are any other ways to solve this problem.

>*If you have successfully completed both of the above functions you will see Simon's first turn and you will be able to click around as a player*

#### `addToPlayer`

Inside of the `addToPlayer` function you need to add the value of the variable `pressed` to the end of the `player` array.  Again, `pressed` is already defined and has a value.  Your job is to use the array function that adds elements to the end of an array.

>*After this function is complete you and Simon will alternate turns after you have clicked the same number of buttons in his pattern. It will not do any match-checking though.*


#### `matchButtons`

The `matchButtons` function needs to check if *the last element of the `player` array* is **equal** to the value of the `simon` array at *the same index*. Example: if the array `player` had 5 items in it, I would need to check both arrays at index `4`.

If they are **not** equal to eachother, the value of the variable `gameOver` should be set `true`. Otherwise, no special action is needed.

>*Now you should have a fully functioning game. How could you improve it... add sound, scores?*


## The code
Copy and past the code here, it's a lot, but you will only need to complete the code in the four functions where indicated by the comments. Good luck!

```javascript
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

function simonsPress() {
  // Your code here...
  // Set 'pressed' equal to the value of
  // 'simon' at the index 'currentIndex'
}

function addToSimon() {
  // Your code here...
  // add a random element from the 'colors' array
  // to the end of the array called 'simon'
}

function addToPlayer() {
  // Your code here...
  // add the variable 'pressed' to the 'player' array
}


function matchButtons() {
  // Your code here...
  // If the last element of 'player' is not equal
  // to the 'simon' array at that same index number
  // set gameOver to 'true'
}


function drawSimon() {
  fill(0)
  ellipse(centerX, centerY, 550, 550);

  drawColors();

  handleColorPress();

  drawCenter();

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
```
