const aStar = ({ r, c }, baseCell) => {

  // Initialization of open and closed lists, goal cell, current cell, and path
  const openList = [baseCell];
  const closedList = [];
  const goalCell = grid[getIndex(r, c)];
  let currentCell;
  const path = [];

  // Initialize costs, heuristics, and parent pointers for each cell in the grid
  for (const i in grid) {
    grid[i].cost = Infinity;
    grid[i].heuristic = 0;
    grid[i].parent = undefined;
  }

  // Set the cost of the base cell to 0
  baseCell.cost = 0;

  // Main A* algorithm loop
  while (openList.length > 0) {
    // Sort open list based on the total cost (f) of each cell
    openList.sort((x, y) => x.f - y.f);
    currentCell = openList.shift();

    // Break the loop if the goal cell is reached
    if (currentCell == goalCell) {
      break;
    }

    // Add the current cell to the closed list
    closedList.push(currentCell);

    // Explore neighbors of the current cell
    for (const n of currentCell.neighbors) {
      if (closedList.includes(n)) continue;

      // Calculate heuristic distance from neighbor to goal
      n.heuristic = manhattanDistance(n, goalCell);

      // Calculate recalculated cost for the neighbor
      const recalculatedCellCost = currentCell.cost + 1;

      if (!openList.includes(n)) {
        openList.push(n);
      } else if (recalculatedCellCost >= n.cost) {
        continue;
      }

      // Update neighbor's parent, cost, and total cost (f)
      n.parent = currentCell;
      n.cost = recalculatedCellCost;
      n.f = n.cost + n.heuristic;
    }
  }

  // Reconstruct the path from goal to start
  while (currentCell) {
    path.unshift(currentCell);
    currentCell = currentCell.parent;
  }
  return { path, closedList };
};

const greedySearch = ({ r, c }, baseCell) => {

  // Initialization of open and closed lists, goal cell, current cell, and path
  const openList = [baseCell];
  const closedList = [];
  const goalCell = grid[getIndex(r, c)];
  const path = [];
  let currentCell;


  // Initialize heuristics and parent pointers for each cell in the grid
  for (const i in grid) {
    grid[i].heuristic = manhattanDistance(grid[i], goalCell);
    grid[i].parent = undefined;
    grid[i].cost = 0;
  }

  // Main greedy search algorithm loop
  while (openList.length > 0) {
    openList.sort((x, y) => x.heuristic - y.heuristic);
    currentCell = openList.shift();

    if (currentCell == goalCell) {
      break;
    }

    closedList.push(currentCell);
    for (const n of currentCell.neighbors) {
      if (closedList.includes(n)) continue;

      // Calculate recalculated cost for the neighbor
      const recalculatedCellCost = currentCell.cost + 1;
      if (!openList.includes(n)) {
        openList.push(n);
      } else if (recalculatedCellCost >= n.cost) {
        continue;
      }

      // Update neighbor's parent, cost, and heuristic
      n.parent = currentCell;
      n.cost = recalculatedCellCost;
      n.heuristic = manhattanDistance(n, goalCell);
    }
  }
  while (currentCell) {
    path.unshift(currentCell);
    currentCell = currentCell.parent;
  }
  return { path, closedList };
};

const dijkstraSearch = ({ r, c }, baseCell) => {

  // Initialization of open and closed lists, goal cell, current cell, and path
  const openList = [baseCell];
  const closedList = [];
  const goalCell = grid[getIndex(r, c)];
  let currentCell;
  const path = [];


  // Initialize costs and parent pointers for each cell in the grid
  for (const i in grid) {
    grid[i].cost = Infinity;
    grid[i].parent = undefined;
  }
  baseCell.cost = 0;

  while (openList.length > 0) {
    openList.sort((x, y) => x.cost - y.cost);
    currentCell = openList.shift();

    if (currentCell == goalCell) {
      break;
    }

    closedList.push(currentCell);
    for (const n of currentCell.neighbors) {
      if (closedList.includes(n)) continue;

      // Calculate recalculated cost for the neighbor
      const recalculatedCellCost = currentCell.cost + 1;

      if (!openList.includes(n)) {
        openList.push(n);
      } else if (recalculatedCellCost >= n.cost) {
        continue;
      }

      // Update neighbor's parent and cost
      n.parent = currentCell;
      n.cost = recalculatedCellCost;
    }
  }

  // Reconstruct the path from goal to start
  while (currentCell) {
    path.unshift(currentCell);
    currentCell = currentCell.parent;
  }

  return { path, closedList };
};

// Destination class to represent a goal destination on the grid
function Destination(r, c) {
  this.r = r;
  this.c = c;
  this.prevr = r;
  this.prevc = c;
  this.x = c * size;
  this.y = r * size;
  this.dir = {
    x: 0,
    y: 0,
  };
  this.call = grid[getIndex(r, c)];

  this.findPath = function (r, c, algorithm) {
    return this[algorithm](r, c);
  };

  this.AStar = (r, c) => {
    return aStar({ r, c }, this.call);
  };

  this.greedySearch = (r, c) => {
    return greedySearch({ r, c }, this.call);
  };

  this.dijkstraSearch = (r, c) => {
    return dijkstraSearch({ r, c }, this.call);
  };

  const showDestination = (aStarDestinationTheme, destinationName) => {
    fill(aStarDestinationTheme);
    textSize(32);
    text(destinationName, this.x, this.y);
    noStroke();
    ellipse(this.x + size / 2, this.y + size / 2, size * 0.5);
  };
  this.show = () => showDestination(theme.aStarDestination, "A*");
  this.show1 = () => showDestination(theme.greedyDestination, "Greedy");
  this.show2 = () => showDestination(theme.dijkstraDestination, "Dijkstra");
}

// Cell class to represent individual cells on the grid
function Cell(r, c) {
  this.c = c;
  this.r = r;
  this.cells = [true, true, true, true];
  this.visited = false;
  this.neighbors = [];
  this.cost = 0;

  // Method to display the cell on the canvas
  this.show = function (s, c) {
    let w = size;
    let x = this.c * w;
    let y = this.r * w;

    stroke(c);
    strokeWeight(s);

    if (this.cells[0]) line(x, y, x + w, y);
    if (this.cells[1]) line(x + w, y, x + w, y + w);
    if (this.cells[2]) line(x, y + w, x + w, y + w);
    if (this.cells[3]) line(x, y, x, y + w);
  };

  this.checkNeighbors = function () {
    let neighbors = [];

    let top = grid[getIndex(this.r - 1, this.c)];
    let right = grid[getIndex(this.r, this.c + 1)];
    let bottom = grid[getIndex(this.r + 1, this.c)];
    let left = grid[getIndex(this.r, this.c - 1)];

    top && !top.visited && neighbors.push(top);
    right && !right.visited && neighbors.push(right);
    bottom && !bottom.visited && neighbors.push(bottom);
    left && !left.visited && neighbors.push(left);

    let rIndex = floor(random() * neighbors.length);
    n = neighbors[rIndex];
    if (n) {
      let alreadyNeigbor = false;
      for (const neighbor of this.neighbors) {
        if (n == neighbor) {
          alreadyNeigbor = true;
        }
      }
      if (!alreadyNeigbor) {
        this.neighbors.push(n);
        n.neighbors.push(this);
      }
    }
    return n;
  };
}

// Walker class to represent the moving agent on the grid
function Walker() {
  this.call = goal.c + goal.r * rows;
  this.x = goal.c * size + size / 2;
  this.y = goal.r * size + size / 2;
  this.s = size / updateFrequency;
  this.dir = {
    x: 0,
    y: 0,
  };

  // Method to display the walker on the canvas
  this.show = function () {
    fill(theme.walker);
    noStroke();
    ellipse(this.x, this.y, size / 2);
  };

  // Method to update the walker's position
  this.update = function () {
    let currentIndex = getIndex(
      round((this.y - size / 2) / size),
      round((this.x - size / 2) / size)
    );
    let currentCell = grid[currentIndex];
    this.call = currentIndex;
    let nextIndex = getIndex(
      round((this.y - size / 2) / size) + this.dir.y,
      round((this.x - size / 2) / size) + this.dir.x
    );
    let nextCell = grid[nextIndex];

    if (!areNeighbors(currentCell, nextCell)) {
      this.dir.x = 0;
      this.dir.y = 0;
    }

    this.x += this.dir.x * this.s;
    this.y += this.dir.y * this.s;

    if (!(this.x - size / 2 > 0 && this.x - size / 2 < width - size)) {
      this.dir.x = 0;
    }
    if (!(this.y - size / 2 > 0 && this.y - size / 2 < height - size)) {
      this.dir.y = 0;
    }

    if (this.dir.x == 0) {
      this.x = lerp(this.x, currentCell.c * size + size / 2, 0.5);
    }
    if (this.dir.y == 0) {
      this.y = lerp(this.y, currentCell.r * size + size / 2, 0.5);
    }
  };
}

// Function to generate a random Map
function randomMap() {
  for (const call of grid) {
    let n = call.checkNeighbors();
    if (n) removeCells(call, n);
  }
}

// Function to generate a city-like maze using depth-first search
function city() {
  while (true) {
    current.visited = true;
    let next = current.checkNeighbors();
    if (next) {
      stack.push(current);
      removeCells(current, next);
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();
    } else {
      for (const call of grid) {
        call.visited = false;
      }
      break;
    }
  }
}

// Function to remove walls between two cells
function removeCells(a, b) {
  let x = a.c - b.c;
  let y = a.r - b.r;

  if (x === 1) {
    a.cells[3] = false;
    b.cells[1] = false;
  }
  if (x === -1) {
    a.cells[1] = false;
    b.cells[3] = false;
  }

  if (y === 1) {
    a.cells[0] = false;
    b.cells[2] = false;
  } else if (y === -1) {
    a.cells[2] = false;
    b.cells[0] = false;
  }
}

// Function to display the path on the canvas
function showPath(path, pathColor) {
  strokeWeight(size / 8);
  stroke(pathColor);

  // Begin drawing the path
  beginShape();
  noFill();
  for (const call of path) {

    // Add vertex for each cell in the path
    vertex(call.c * size + size / 2, call.r * size + size / 2);
  }
  endShape();
}

// Function to determine the direction between two cells
function getDirection(c1, c2) {
  let x = c2.c - c1.c;
  let y = c2.r - c1.r;
  return { x, y };
}

// Function to highlight cells on the canvas
function highlightCells(calls) {
  for (const call of calls) {
    let x = call.c * size;
    let y = call.r * size;
    // Draw a semi-transparent rectangle to highlight the cell
    noStroke();
    fill(0, 255, 255, 60);
    rect(x, y, size, size);
  }
}

// Function to check if two cells are neighbors
function areNeighbors(c1, c2) {
  if (c1 && c2) {
    for (const n of c1.neighbors) {
      if (n == c2) return true;
    }
  }
  // Return false if cell1 and cell2 are not neighbors
  return false;
}

// Function to get the index of a cell in the grid array based on its row and column
function getIndex(r, c) {
  if (c > cols - 1 || r > rows - 1 || r < 0 || c < 0) return -1;
  // Calculate and return the index of the cell in the grid array
  return c + cols * r;
}

// Function to calculate the Manhattan distance between two cells
function manhattanDistance(c1, c2) {
  // Return the sum of horizontal and vertical distances between the two cells
  return abs(c1.c - c2.c) + abs(c1.r - c2.r);
}


let cols, rows, path, path1, path2, current, goal, theme, walker;
let size = 30;
let grid = [];
let stack = [];
let coins = [];
let realTime = true;
let framerate = 60;
let frameCount = 0;
let updateFrequency = 15;
let exploredCells = [];

let aStarSpawnInput, greedySpawnInput, dijkstraSpawnInput, walkmanSpawnInput;
let search = "AStar";
let geeedy = "greedySearch";
let dijkstra = "dijkstraSearch";

function setup() {
  // Create a canvas with a size of 480x480 pixels
  createCanvas(480, 480);
  // Calculate the number of columns and rows based on the cell size
  cols = floor(width / size);
  rows = floor(height / size);

  theme = {
    background: color(255, 220, 255),
    cells: color(40, 2, 116),
    goal: color(254, 122, 54),
    walker: color(150, 150, 150),
    path: color(255, 184, 222),
    aStarDestination: color(25, 14, 120),
    greedyDestination: color(255, 14, 22),
    dijkstraDestination: color(255, 154, 22),
  };

  // Initialize the grid and coins array
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      grid.push(new Cell(r, c));
      coins.push(!Math.floor(Math.random() * 3));
    }
  }

  // Set the current and goal cells
  current = grid[0];
  goal = grid[grid.length - 1];
  city();
  randomMap(true);

  // Create instances of Destination, Walker, and input elements for spawning
  aStarDestination = new Destination(0, 0);
  greedyDestination = new Destination(0, 0);
  dijkstraDestination = new Destination(0, 0);

  walker = new Walker();
  aStarSpawnInput = document.getElementById("aStarSpawn");
  greedySpawnInput = document.getElementById("greedySpawn");
  dijkstraSpawnInput = document.getElementById("dijkstraSpawn");
  walkmanSpawnInput = document.getElementById("walkmanSpawn");
}

// Variable to track whether the planner has started
let planerStarted = false;

// Function to start the application with specified spawn points
function startApp(e) {
  e.preventDefault();
  const aStarSpawn = parseCoordinates(aStarSpawnInput.value);
  const greedySpawn = parseCoordinates(greedySpawnInput.value);
  const dijkstraSpawn = parseCoordinates(dijkstraSpawnInput.value);
  const walkmanSpawn = parseCoordinates(walkmanSpawnInput.value);

  if (Number.isInteger(aStarSpawn.c) && Number.isInteger(greedySpawn.c) && Number.isInteger(dijkstraSpawn.c) && Number.isInteger(walkmanSpawn.c)) {
    // Set the destinations and walker's initial position
    aStarDestination = new Destination(aStarSpawn.r, aStarSpawn.c);
    greedyDestination = new Destination(greedySpawn.r, greedySpawn.c);
    dijkstraDestination = new Destination(dijkstraSpawn.r, dijkstraSpawn.c);
    walker.x = walkmanSpawn.c * size + size / 2;
    walker.y = walkmanSpawn.r * size + size / 2;
    planerStarted = true;
  } else {
    alert("Invalid coordinates. Please enter valid coordinates (e.g., 0,0).");
    window.location.reload();
  }
}

// Function to parse input coordinates
function parseCoordinates(input) {
  const coordinates = input.split(",").map(coord => parseInt(coord.trim()));
  return {
    r: coordinates[0],
    c: coordinates[1],
  };
}

// Main drawing function
function draw() {
  background(theme.background);
  highlightCells(exploredCells);
  walker.update();
  walker.show();

  // Show the maze cells with walls
  for (const call of grid) {
    call.show(size / 4, theme.cells);
  }

  // Show the background of the maze cells
  for (const call of grid) {
    call.show(size / 4 - 2, theme.background);
  }
  aStarDestination.show();
  greedyDestination.show1();
  dijkstraDestination.show2();

  if (frameCount % updateFrequency == 0) {
    path = aStarDestination.findPath(goal.r, goal.c, search).path;
    path1 = greedyDestination.findPath(goal.r, goal.c, geeedy).path;
    path2 = dijkstraDestination.findPath(goal.r, goal.c, dijkstra).path;
  }
  
  // If real-time mode is enabled, update the goal based on walker's position
  if (realTime) {
    let r, c;
    c = floor(min(walker.x, width) / size);
    r = floor(min(walker.y, height) / size);
    if (grid[getIndex(r, c)]) {
      goal = grid[getIndex(r, c)];
    }
  }
  frameCount = (frameCount + 1) % framerate;

  // Show paths based on A*, Greedy, and Dijkstra searches
  showPath(path, theme.aStarDestination);
  showPath(path1, theme.greedyDestination);
  showPath(path2, theme.dijkstraDestination);
}

// Function to handle key presses for walker movement
keyPressed = function () {
  if (keyCode === LEFT_ARROW) {
    walker.dir = { x: -1, y: 0 };
  } else if (keyCode === RIGHT_ARROW) {
    walker.dir = { x: 1, y: 0 };
  } else if (keyCode === UP_ARROW) {
    walker.dir = { x: 0, y: -1 };
  } else if (keyCode === DOWN_ARROW) {
    walker.dir = { x: 0, y: 1 };
  }

};
