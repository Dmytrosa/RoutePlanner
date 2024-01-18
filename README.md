# Pathfinding Visualizer

## Overview

This project is a pathfinding visualizer implemented in JavaScript using the p5.js library. The visualizer allows users to explore three different pathfinding algorithms: A*, Greedy Search, and Dijkstra's Algorithm. The goal is to showcase how these algorithms find paths in a city-like grid from a starting point to a destination.

## Components

### 1. Maze Generation

- The maze is generated using a combination of randomMap and city algorithms.
- The `Cell` class represents individual cells in the grid, and the `removeCells` function is used to create paths between neighboring cells.
- Walls between cells are displayed on the canvas using the `show` method.

### 2. Search Algorithms

- A* Search, Greedy Search, and Dijkstra's Algorithm are implemented to find paths from a specified starting point to the goal.
- The `aStar`, `greedySearch`, and `dijkstraSearch` functions implement the respective algorithms.
- Each algorithm maintains open and closed lists, calculates heuristics, and updates costs and parent pointers to find the optimal path.

### 3. Walker and Destination

- The `Walker` class represents the moving agent in the maze, and its position is updated based on user input.
- The `Destination` class represents goal destinations in the maze, and it provides methods for finding paths using different search algorithms.

### 4. Path Visualization

- Paths found by A*, Greedy Search, and Dijkstra's Algorithm are visualized on the canvas using the `showPath` function.
- The paths are displayed with different colors for clarity.

### 5. User Interaction

- The user can control the walker's movement using arrow keys.
- The application supports real-time mode, where the goal is updated based on the walker's position.

## Assumptions and Implementation Details

1. **Initialization:**
   - The maze grid is initialized with cells, and the walker and goal are set.
   - The walker's initial position is set at the top-left corner, and the goal is set at the bottom-right corner by default.
   - Search algorithms are initialized with base cells representing the walker's current position.

2. **Algorithmic Details:**
   - The A* Search, Greedy Search, and Dijkstra's Algorithm are implemented with their respective data structures (open and closed lists) and heuristic/cost calculations.
   - The search algorithms find paths by exploring neighboring cells, updating costs, and backtracking to reconstruct the optimal path.

3. **User Interaction:**
   - The user can control the walker's movement using arrow keys.
   - The application allows the user to switch between real-time mode and manual mode for updating the goal.

4. **Visualization:**
   - The canvas is updated in real-time to show the walker's movement and the paths found by different search algorithms.
   - Paths are displayed with different colors to distinguish between A*, Greedy Search, and Dijkstra's Algorithm.

5. **Spawn Points:**
   - The application provides input fields for specifying spawn points for A*, Greedy Search, Dijkstra's Algorithm, and the walker's initial position.
   - Valid coordinates (e.g., "0,0") are expected as input, and the application is restarted if invalid coordinates are provided.

6. **Exploration Highlighting:**
   - Explored cells are highlighted on the canvas to visualize the cells visited by the walker during its exploration.

## How to Use

1. **Spawn Points:**
   - Input valid coordinates in the provided input fields for A*, Greedy Search, Dijkstra's Algorithm, and the walker's initial position.
   - Click the "Start" button to begin the application.

2. **Navigation:**
   - Use arrow keys to control the walker's movement.
   - Explore the maze and observe the paths found by different search algorithms.

3. **Restart:**
   - Refresh the page to restart the application with new spawn points.

# Pathfinding Visualizer

This project is a pathfinding visualizer implemented in JavaScript using the p5.js library. The visualizer allows users to explore three different pathfinding algorithms: A*, Greedy Search, and Dijkstra's Algorithm. The goal is to showcase how these algorithms find paths in a maze-like grid from a starting point to a destination.

## Getting Started

1. **Clone the Repository:** Clone this repository to your local machine.

```bash
git clone https://github.com/Dmytrosa/RoutePlanner.git
```

2. **Open `index.html`:** with yarn.

```bash
yarn start
```
