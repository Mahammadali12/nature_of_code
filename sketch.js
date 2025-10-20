let land;
let theta = 0;


function setup() {
  createCanvas(640, 400, WEBGL);
  land = new terrain(20, 800, 400);
  // noFill();
}

function draw() {
  land.calculate();
  background(230);
  push();
  translate(-width/2, -height/2, -300);
  rotateX(PI / 3);
  rotateZ(theta);
  land.render();
  pop();
  theta += 0.0025;


}  

// let scaleFactor = 20;
// let start = 0
// let xOff = 0;
// let yOff = start;
// function draw() {
//   background(51);

  
//   rotateX(PI/3);                   // tilt the “floor”
//   rotateZ( frameCount * 0.005);     // spin around vertical axis maybe

//   let rows = floor((height) / scaleFactor);  // approximate because WEBGL origin is center
//   let cols = floor((width) / scaleFactor);

//   yOff = start
//   for (let y = 0; y < rows - 1; y++) {
//     xOff = 0
//     beginShape(TRIANGLE_STRIP);
//     for (let x = 0; x < cols; x++) {
//       // vertex(x * scaleFactor - width/2,   y * scaleFactor - height/2);
//       // vertex(x * scaleFactor - width/2,  (y + 1) * scaleFactor - height/2);
//       vertex(x * scaleFactor - width/2,   y * scaleFactor - height/2,map(noise(xOff,yOff),0,1,-50,50));
//       vertex(x * scaleFactor - width/2,  (y + 1) * scaleFactor - height/2, map(noise(xOff,yOff),0,1,-50,-50));
//       xOff += 0.1
//     }
//     yOff += 0.1
//     endShape();
//   }
//   start += 0.01
// }



class terrain {

  make2Darray(rows,columns) {
    let dArr = new Array(columns);
    
      for (let i = 0; i < dArr.length; i++) {
        dArr[i] = new Array(rows);
      }
    
    return dArr;
  }

  constructor(scl, w, h) {
    this.rows = floor(h/scl);
    this.columns = floor(w/scl);
    this.z = this.make2Darray(this.rows,this.columns)
    this.zOff = 0;
    this.scl = scl;
  }

  calculate(){
    this.yOff = 0;
    for (let y = 0; y < this.rows; y++) {
      this.xOff = 0;
      for (let x = 0; x < this.columns; x++) {
        this.z[x][y] = map(noise(this.xOff, this.yOff, this.zOff), 0, 1, -100, 100);
        // this.x = x * this.scl - width / 2;
        // this.y = y * this.scl - height / 2;
        this.xOff += 0.1;
      }
      this.yOff += 0.1;
    }
    this.zOff += 0.01;
  }

  render(){

    for (let  x = 0;  x < this.z.length-1;  x++) {
      beginShape(QUAD_STRIP);
      for (let y = 0; y < this.z[x].length; y++) {
        stroke(0);
        let xPos = x * this.scl - (this.rows) / 2;
        let yPos = y * this.scl - (this.columns) / 2;
        vertex(xPos, yPos, this.z[x][y]);
        vertex(xPos + this.scl,yPos, this.z[x + 1][y]);
      }
      endShape();
    }
  }

}
