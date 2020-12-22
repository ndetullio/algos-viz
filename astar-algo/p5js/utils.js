function solve() {
    keepSolving = true;
    current = undefined;
    openSet = [];
    paths = [];
    closedSet = [];
    w = 0;
    h = 0;
    path = [];
    grid = new Array();

    percWalls = nxSlider.value();

    setGrid();
    loop();
    draw();

  }

function sliderChange(x) {
    nxSText.value(nxSlider.value());
}
  
function removeFromArray(arr, elt) {
for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
    arr.splice(i, 1);
    }
}
}
  
function distance(a, b) {
var d = dist(a.i, a.j, b.i, b.j);
return d
}

function drawProgress() {

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
          grid[i][j].show(color(255));
        }
    }
    
    for (var i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(160, 160, 160));
    }

    for (var i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 255, 255));
    }

    path = [];
    var temp = current;
    path.push(temp);
    while(temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }

    paths.push(path);

    if (paths.length > numPaths) {
        paths.shift();
    }

    for (var j=0; j < paths.length; j++) {
        noFill();
        // stroke(57, 255, 20, alphas[j]);
        stroke(255, 0, 128, alphas[j]);
        strokeWeight(w/2);
        beginShape();
        localPath = paths[j];
        for (var i = 0; i < localPath.length; i++) {
            vertex(localPath[i].i*w + w/2, localPath[i].j*h + h/2)
        }
        endShape();
    }

    start.show(color(0, 78, 255, 150))
    end.show(color(102, 255, 0, 150))

    let stw = 2
    noFill();
    stroke(100, 100, 100);
    strokeWeight(stw)
    rect(stw/2, stw/2, mazeX, mazeY)

}

function drawAnnotations() {

    textSize(16);
    textAlign(LEFT, CENTER);
    fill(0);
    noStroke();
    text('buildings density', 10, 830);
  
    fill(50, 50, 50);
    noStroke();
    rect(590, 810, 20, 20);
    fill(0);
    text('building', 620, 820)

    fill(140, 140, 140);
    noStroke();
    rect(590, 840, 20, 20);
    fill(0);
    text('explored alley', 620, 850)

    fill(0, 255, 255);
    noStroke();
    rect(590, 870, 20, 20);
    fill(0);
    text('candidate for exploration', 620, 880)

    fill(255, 0, 128);
    noStroke();
    rect(590, 905, 20, 10);
    fill(0);
    text('optimal path', 620, 910)

}

function makeArr(startValue, stopValue, cardinality) {
    var arr = [];
    var step = (stopValue - startValue) / (cardinality - 1);
    for (var i = 0; i < cardinality; i++) {
      arr.push(startValue + (step * i));
    }
    return arr;
  }