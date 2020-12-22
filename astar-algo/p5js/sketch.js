var canvasX = 1000
var canvasY = 1000
var mazeX = 800
var mazeY = 800
var cols = 50;
var rows = 50;
var percWalls = 0.25;
var grid = new Array();
var paths = [];
var numPaths = 45;
var alphas = [];
var keepSolving = true;
var current;

var openSet = [];
var closedSet = [];
var start;
var end;
var w, h;
var path = [];

function setup() {

  createCanvas(canvasX, canvasY);

  nxSText = createInput(100);
  nxSText.position(135, 820);
  nxSText.size(25);
  nxSlider = createSlider(0, 1, percWalls, 0.01);
  nxSlider.position(5, 840);
  nxSlider.input(sliderChange);
  nxSlider.size(170);
  nxSText.value(nxSlider.value());


  // Restart button
  buttonRL = createButton("Solve next!");
  bsX = 150
  bsY = 50
  buttonRL.size(bsX, bsY);
  buttonRL.position(10, 890);
  buttonRL.style("font-size", "24px");
  buttonRL.mousePressed(solve);

  alphas = makeArr(0, 255, numPaths);

  setGrid()
}

function draw(numLoops) {

  background(255);

  // Solve search problem
  if (keepSolving) {

    message = runAstarStep();

    keepSolving = message == "still searching";
  
  } else {

    textSize(30);
    textAlign(LEFT, CENTER);
    fill(0);
    noStroke();
    text(message, 270, 850);

    loop(numPaths);

  }

  // Visualise progress
  drawProgress();
  drawAnnotations();

}

