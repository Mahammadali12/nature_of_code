let land;
let theta = 0;
let rows, columns;
let height, width;
let scl = 20;


function setup() {
  createCanvas(640, 400, WEBGL);
  height = 400;
  width = 400;

  land = new terrain(scl, height, width);
  rows = floor(height / scl);
  columns = floor(width / scl);
  // noFill();
}

function draw() {
  land.calculate();
  background(230);
  push();
  translate(-width/2, -height/2, -300);
  rotateX(PI / 3);
  // rotateZ(theta);
  land.render();
  pop();
  theta += 0.0025;
}  

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
    // console.log(this.z.length)
    // console.log(this.z[0].length)
    this.yOff = 0;
    for (let y = 0; y < rows; y++) {
      this.xOff = 0;
      for (let x = 0; x < columns; x++) {
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

    for (let  x = 0;  x < columns;  x++) {
      beginShape(QUAD_STRIP);
      for (let y = 0; y < rows; y++) {
        // console.log(x,y);
        stroke(0);
        let xPos = x * this.scl;
        let yPos = y * this.scl;
        fill(map(this.z[x][y],-100,100,0,255), 255);

        // vertex(xPos, yPos, 0);
        // vertex(xPos + this.scl,yPos, 0);
        vertex(xPos, yPos, this.z[x][y]);
        if (x+1 === columns) {
          vertex(xPos + this.scl,yPos, this.z[x][y]);
          
        }else{
          vertex(xPos + this.scl,yPos, this.z[x + 1][y]);
        }

      }
      endShape();
    }
  }

}
