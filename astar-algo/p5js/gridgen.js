
function Spot(i, j) {

    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.previous = undefined;
    this.wall = false;
  
    if (random(1) < percWalls) {
      this.wall = true;
    }
  
    this.show = function(col) {
  
      if (this.wall) {
        fill(50, 50, 50);
        noStroke();
        rect(this.i*w, this.j*h, w - 1, h - 1)
      } else {
        fill(col);
        noStroke();
        rect(this.i*w, this.j*h, w - 1, h - 1)
      }

    }
  
    this.addNeighbors = function(grid) {
      var i = this.i
      var j = this.j
  
      if (i < cols - 1) {
        this.neighbors.push(grid[i+1][j])
      }
      if (i > 0) {
        this.neighbors.push(grid[i-1][j])
      }
      if (j < rows - 1) {
        this.neighbors.push(grid[i][j+1])
      }
      if (j > 0) {
        this.neighbors.push(grid[i][j-1])
      }
      if (i > 0 && j > 0 && (!grid[i-1][j].wall || !grid[i][j-1].wall)) {
        this.neighbors.push(grid[i - 1][j-1])
      }
      if (i < cols - 1 && j > 0 && (!grid[i+1][j].wall || !grid[i][j-1].wall)) {
        this.neighbors.push(grid[i + 1][j-1])
      }
      if (i < cols - 1 && j < rows - 1 && (!grid[i+1][j].wall || !grid[i][j+1].wall)) {
        this.neighbors.push(grid[i + 1][j+1])
      }
      if (i > 0 && j < rows - 1 && (!grid[i-1][j].wall || !grid[i][j+1].wall)) {
        this.neighbors.push(grid[i - 1][j+1])
      }
  
    }
  
  }

function gridgen() {

    let grid = new Array(cols)

    for (var i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
      }
      
      for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
          grid[i][j] = new Spot(i, j, percWalls);
        }
      }
    
      for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
          grid[i][j].addNeighbors(grid);
        }
      }

    return grid
}

function setGrid() {

    w = mazeX / cols;
    h = mazeY / rows;
  
    grid = gridgen(cols, rows, percWalls)
  
    start = grid[0][0]
    end = grid[cols - 1][rows - 1]

    // Make sure start and end are not walls
    start.wall = false;
    end.wall = false;
  
    openSet.push(start);
  
    // console.log(grid);
  }