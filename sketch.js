function setup() {
  createCanvas(600, 400, WEBGL);
  noFill();
  stroke(255);
}

let scaleFactor = 20;
let start = 0
let xOff = 0;
let yOff = start;
function draw() {
  background(51);

  rotateX(PI/3);                  // tilt the “floor”
  rotateZ(frameCount * 0.01);     // spin around vertical axis maybe

  let rows = floor((height * 2) / scaleFactor);  // approximate because WEBGL origin is center
  let cols = floor((width * 2) / scaleFactor);

  yOff = start
  for (let y = 0; y < rows - 1; y++) {
    xOff = 0
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * scaleFactor - width/2,   y * scaleFactor - height/2,map(noise(xOff,yOff),0,1,-50,50));
      vertex(x * scaleFactor - width/2,  (y + 1) * scaleFactor - height/2, map(noise(xOff,yOff),0,1,-50,50));
      xOff += 0.1
    }
    yOff += 0.1
    endShape();
  }
  start += 0.01
}
