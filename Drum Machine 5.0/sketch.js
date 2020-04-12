//-----------------------------------------declaration of global variables--------------------------------
let trackAMT;
let cnv;
let r; //radius of circles
let buttonCenters;
let beatLength;
let cellWidth;
let cellHeight;
let trackListeners;
var indexClicked;
var trackClicked;
let h1Pat, h2Pat, k1Pat, k2Pat, snPat, shPat; //instrument pattern. Array of numbers that we can manipulate to make patterns


//-------------------------------------------setup function extends until draw function------------------------
function setup() {
  cnv = createCanvas(800, 600);
  cnv.mousePressed(canvasPressed);
  background('grey');


  //---------------------------------------create pattens-----------------------------------------------
  h1Pat = [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1];
  h2Pat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  snPat = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1];
  shPat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  k1Pat = [1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0];
  k2Pat = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
  stepPat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];


  //-------------------------------------------declare important variables------------------------------
  trackAMT = 6;
  beatLength = 16;
  r = 20;
  indexClicked = 0;
  trackClicked = 0;
  cellWidth = width / beatLength;
  cellHeight = height / trackAMT;
  buttonCenters = [];
  //--------------------------------------------array of track listener functions ------------------------------//
  //-------------------------------------calculate indexClicked and hard code trackClicked-----------------------//
  trackListeners = [
    function track1Listener(x1, y1, x2, y2) {
      let d = dist(x1, y1, x2, y2);
      if (d < r) {
        indexClicked = floor(beatLength * mouseX / width);
        trackClicked = 1;
      }
    },
    function track2Listener(x1, y1, x2, y2) {
      let d = dist(x1, y1, x2, y2);
      if (d < r) {
        indexClicked = floor(beatLength * mouseX / width);
        trackClicked = 2;
      }
    },
    function track3Listener(x1, y1, x2, y2) {
      let d = dist(x1, y1, x2, y2);
      if (d < r) {
        indexClicked = floor(beatLength * mouseX / width);
        trackClicked = 3;
      }
    },
    function track4Listener(x1, y1, x2, y2) {
      let d = dist(x1, y1, x2, y2);
      if (d < r) {
        indexClicked = floor(beatLength * mouseX / width);
        trackClicked = 4;
      }
    },
    function track5Listener(x1, y1, x2, y2) {
      let d = dist(x1, y1, x2, y2);
      if (d < r) {
        indexClicked = floor(beatLength * mouseX / width);
        trackClicked = 5;
      }
    },
    function track6Listener(x1, y1, x2, y2) {
      let d = dist(x1, y1, x2, y2);
      if (d < r) {
        indexClicked = floor(beatLength * mouseX / width);
        trackClicked = 6;
      }
    },
  ];
}
//---------------------------------------draw function!!!-------------------------------------------------//

//draw the grid at initialization
function draw() {
  ellipseMode(CENTER);
  drawTrack(h1Pat, whatY(1));
  drawTrack(h2Pat, whatY(2));
  drawTrack(snPat, whatY(3));
  drawTrack(shPat, whatY(4));
  drawTrack(k1Pat, whatY(5));
  drawTrack(k2Pat, whatY(6));
  getTrackCenters();
}

//-------------------------------------------------------logic for GUI--------------------------------------
//function to make a step button
function makeButton(x, y) {
  ellipse(x, y, 40, 40);
}

//calculate the y axis point of the various tracks
function whatY(trackNum) {
  return (trackNum * cellHeight) - 40;

}

//draw a horizontal track given the track number and y axis point form the whatY function
function drawTrack(track, yCord) {
  for (var i = 0; i < beatLength; i++) {
    if (track[i] === 0) {
      noStroke();
      fill('rgba(255,101,80,0.2)');
      makeButton(i * cellWidth + 25, yCord);
    } else if (track[i] === 1) {
      noStroke();
      fill('rgba(0,255,0, 0.05)');
      makeButton(i * cellWidth + 25, yCord);
    }
  }
}


//calculates the x axis points of the various 16 step points
function getTrackCenters() {
  for (var i = 0; i < beatLength; i++) {
    buttonCenters.push(i * cellWidth + 25);
  }
}


//reset the index clicked and track clicked buttons to 0 so it only works if you hit a button
function reset() {
  indexClicked = 0;
  trackClicked = 0;
}

//attach the track listeners to the track buttons given the y axis coordinate and the corresponding listener function in the array
function attachTrackListener(y, listener) {
  for (var i = 0; i < beatLength; i++) {
    listener(mouseX, mouseY, buttonCenters[i], whatY(y));
  }
}

//////---------------------------------logic executed when the canvas is pressed----------------------//
function canvasPressed() {
  //attach track listeners
  attachTrackListener(1, trackListeners[0]);
  attachTrackListener(2, trackListeners[1]);
  attachTrackListener(3, trackListeners[2]);
  attachTrackListener(4, trackListeners[3]);
  attachTrackListener(5, trackListeners[4]);
  attachTrackListener(6, trackListeners[5]);
  console.log(indexClicked);
  console.log(trackClicked);
  if (trackClicked === 1) {
    if (h1Pat[indexClicked] === 0) {
      h1Pat[indexClicked] += 1;
    } else {
      h1Pat[indexClicked] += -1;
    }
    drawTrack(h1Pat, whatY(1));
    attachTrackListener(1, trackListeners[0]);

  } else if (trackClicked === 2) {
    if (h2Pat[indexClicked] === 0) {
      h2Pat[indexClicked] += 1;
    } else {
      h2Pat[indexClicked] += -1;
    }
    drawTrack(h2Pat, whatY(2));
    attachTrackListener(2, trackListeners[1]);
  } else if (trackClicked === 3) {
    if (snPat[indexClicked] === 0) {
      snPat[indexClicked] += 1;
    } else {
      snPat[indexClicked] += -1;
    }
    drawTrack(snPat, whatY(3));
    attachTrackListener(3, trackListeners[2]);
  }else if (trackClicked === 4) {
    if (shPat[indexClicked] === 0) {
      shPat[indexClicked] += 1;
    } else {
      shPat[indexClicked] += -1;
    }
    drawTrack(shPat, whatY(4));
    attachTrackListener(4, trackListeners[3]);
  }else if (trackClicked === 5) {
    if (k1Pat[indexClicked] === 0) {
      k1Pat[indexClicked] += 1;
    } else {
      k1Pat[indexClicked] += -1;
    }
    drawTrack(k1Pat, whatY(5));
    attachTrackListener(5, trackListeners[4]);
  } else if (trackClicked === 6) {
    if (k2Pat[indexClicked] === 0) {
      k2Pat[indexClicked] += 1;
    } else {
      k2Pat[indexClicked] += -1;
    }
    drawTrack(k2Pat, whatY(6));
    attachTrackListener(6, trackListeners[5]);
  }
  reset();
}
