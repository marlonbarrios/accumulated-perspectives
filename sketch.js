'use strict';

var img; // Variable to hold the base image
var tileCountX = 4; // Number of tiles in the X direction
var tileCountY = 4; // Number of tiles in the Y direction
var tileCount = tileCountX * tileCountY; // Total number of tiles
var imgTiles = []; // Array to hold the sampled image tiles
var tileWidth; // Width of each tile
var tileHeight; // Height of each tile
var randomMode = true; // Start in random mode
var intervalMin = 1000; // Minimum interval in milliseconds for changing the sampled areas
var intervalMax = 5000; // Maximum interval in milliseconds for changing the sampled areas
var nextChangeTime; // Time for the next change
var fadePercentage = 0.2; // Percentage of tiles to fade in/out

function preload() {
  // Load the base image
  img = loadImage('butt14.png');
}

function setup() {
  // Set up the canvas
  createCanvas(windowWidth, windowHeight);

  // Set the initial interval for changing the selected area
  setNextChangeTime();

  // Calculate the initial tile dimensions
  tileWidth = width / tileCountY;
  tileHeight = height / tileCountX;

  // Initialize the imgTiles array with sampled image tiles
  sampleTiles();

  // Set drawing properties
  noFill();
  stroke(255);
  background(100, 100, 100); // Initial background color
}

function resize() {
  // Resize the canvas and recalculate tile dimensions when the window is resized
  resizeCanvas(windowWidth, windowHeight);
  tileWidth = width / tileCountY;
  tileHeight = height / tileCountX;
  sampleTiles(); // Resample when window is resized
}

function draw() {
  if (millis() > nextChangeTime) {
    // Change the sampled areas randomly at random intervals
    sampleTiles();

    // Set the next change time
    setNextChangeTime();
  }

  // Display the sampled areas in a tiling form
  var imgIndex = 0;
  for (var gridY = 0; gridY < tileCountY; gridY++) {
    for (var gridX = 0; gridX < tileCountX; gridX++) {
      image(imgTiles[imgIndex], gridX * tileWidth, gridY * tileHeight, tileWidth, tileHeight);
      imgIndex++;
    }
  }
}

function sampleTiles() {
  // Sample areas from the base image and store them in the imgTiles array
  imgTiles = [];

  for (var gridY = 0; gridY < tileCountY; gridY++) {
    for (var gridX = 0; gridX < tileCountX; gridX++) {
      var sampleX, sampleY;
      if (randomMode) {
        // Randomly sample areas
        sampleX = int(random(width - tileWidth));
        sampleY = int(random(height - tileHeight));
      } else {
        // You can modify this part to sample areas in a specific pattern
        sampleX = gridX * (width / tileCountX);
        sampleY = gridY * (height / tileCountY);
      }
      imgTiles.push(img.get(sampleX, sampleY, tileWidth, tileHeight));
    }
  }
}

function setNextChangeTime() {
  // Set the next change time within the interval
  nextChangeTime = millis() + int(random(intervalMin, intervalMax));
}

function keyPressed() {
  if (key === ' ') {
    // Clear background with space bar
    background(100, 100, 100);
  } else if (key === 's' || key === 'S') {
    // Save canvas as an image with 's' key
    saveCanvas('accumulation', 'png');
  }
}
