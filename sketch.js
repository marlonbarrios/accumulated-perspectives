'use strict';

var img;
var tileCountX = 4;
var tileCountY = 4;
var tileCount = tileCountX * tileCountY;
var imgTiles = [];
var tileWidth;
var tileHeight;
var randomMode = true; // Start in random mode
var intervalMin = 1000; // Minimum interval in milliseconds
var intervalMax = 5000; // Maximum interval in milliseconds
var nextChangeTime;

function preload() {
  img = loadImage('butt14.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Set the initial interval for changing the selected area
  setNextChangeTime();

  tileWidth = width / tileCountY;
  tileHeight = height / tileCountX;

  // Initialize imgTiles array
  sampleTiles();

  noFill();
  stroke(255);
  background(100, 100, 100);
}

function resize() {
  resizeCanvas(windowWidth, windowHeight);
  tileWidth = width / tileCountY;
  tileHeight = height / tileCountX;
  sampleTiles();
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
  imgTiles = [];

  for (var gridY = 0; gridY < tileCountY; gridY++) {
    for (var gridX = 0; gridX < tileCountX; gridX++) {
      var sampleX, sampleY;
      if (randomMode) {
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
