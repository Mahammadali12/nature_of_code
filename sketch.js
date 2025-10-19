let walker;

function setup() {
  createCanvas(600, 400);
  // createCapture(VIDEO)
  walker = new Walker();
  loadPixels();
  background(51);
}

let startX = 0;
let startY = 10000;
let t = 0;
function draw() {
  walker.step()
  walker.show()
}



class Walker {
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.oldX = this.x;
    this.oldY = this.y;
    this.tX = 0;
    this.tY = 10000;
  }

  show() {
    // let x = getXvalue();
    // let y = getYvalue();
    // let oldX = x;
    // let oldY = y;
    // // circle(getXvalue(),getYvalue(),16);
    // this.oldX = this.x;
    // this.oldY = this.y;
  }
  
  step() {

    let xOff = startX
    for (let x = 0; x < width; x++) {
      let yOff = startY
      for (let y = 0; y < height; y++) {
        let index = (x+y*width)*4
        let brightness = map(noise(xOff,yOff,t),0,1,0,255)
        noiseDetail(6,0.5)

        pixels[index] = brightness
        pixels[index+1] = brightness
        pixels[index+2] = brightness
        pixels[index+3] = 255
        
        yOff += 0.01;        
      }
      xOff += 0.01;
    }
    t += 0.01
    // startY +=0.1;
    // startX +=0.1
      updatePixels();

    // noLoop()
    // this.x += map(noise(this.tX),0,1,-1,1);
    // this.y += map(noise(this.tY),0,1,-1,1);

    // this.tX += 0.01;
    // this.tY += 0.01;
    
  }

  // getXvalue(params) {
  //   let n = noise(tX);
  //   let x = map(n,0,1,-1,1);

  //   tX +=0.01;
  //   return x;
  // }


  // getYvalue(params) {
  //   let n = noise(tY);
  //   let y = map(n,0,1,-1,1);

  //   tY +=0.01;
  //   return y;
  // }
}