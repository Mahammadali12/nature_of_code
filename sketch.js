let land;
let tri;
let rows, cols,scl = 20;
let theta = 0;
let width = 400;
let height = 400;

function setup() {
  createCanvas(width+100, height+100, WEBGL);
  land = new terrain(scl, width, height);
  rows = floor(width/scl);
  columns = floor(height/scl);
  tri = new Triangle(scl);
  // console.log(rows,columns);
  // console.log(width,height);
}
function draw() {
  // land.calculate();
  background(230);
  push();
  translate(-width/2, -height/2, -300);
  rotateX(PI / 3); 
  // rotateZ(theta);
  line(0,0,400,400);
  // console.log(width,height)
  land.render();
  tri.render();

  // example 3D circles/disc/sphere rendered in the same transformed space as terrain:
  // drawDisc3D(100, 60, 30, 24, 48, color(255,200,50));   // triangulated disc (flat)
  // drawFlatCircle3D(250, 120, 10, 36, color(100,200,255)); // 2D circle placed at z
  // drawSphere3D(320, 300, 40, 18, color(10,20,50));    // full 3D sphere

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

    // for (let  x = 0;  x <= this.z.length;  x++) {
    for (let  x = 0;  x <= rows-1;  x++) {
      beginShape(QUAD_STRIP);
      // for (let y = 0; y <= this.z[x].length; y++) {
      for (let y = 0; y <= columns; y++) {
        stroke(0);
        let xPos = x * this.scl ;
        let yPos = y * this.scl ;
        // console.log(xPos,yPos);

        // fill(map(this.z[x][y],-100,100,0,255));

        vertex(xPos, yPos, 0);
        // vertex(xPos, yPos, this.z[x][y]);
        // vertex(xPos + this.scl,yPos, this.z[x + 1][y]);
        vertex(xPos + this.scl,yPos, 0);
      }
      endShape();
    }
  }
}

class Triangle {
  constructor(size) {
    this.size = size;
    this.position = createVector();
    this.x = 0;
    this.y = 0;
    this.z = 0;

    this.xOff = 0;
    this.yOff = 0;
    this.zOff = 0;

  }
  render() {
    stroke(0);
    strokeWeight(0.5)
    this.x = map(noise(this.xOff),0,1,0,width);
    this.y = map(noise(this.xOff,this.yOff),0,1,0,height);
    this.z = map(noise(this.xOff,this.yOff,this.zOff),0,1,0,50);
    
    // console.log(this.x,this.y,this.z);
    // console.log(this.xOff,this.yOff,this.zOff);
    this.xOff += 0.01;
    this.yOff += 0.01;
    this.zOff += 0.001; 
    beginShape();
      fill(255);
      vertex(this.x , this.y, this.z);
      vertex(this.x , this.y + scl, this.z);
      vertex(this.x + scl, this.y + scl/2, this.z);
    endShape(CLOSE);
    drawSphere3D(this.x + scl/2, this.y + scl/2, this.z + 5, 4, color(125,249,255));
    
    beginShape();
      fill(0)
      vertex(this.x , this.y, 0.5);
      vertex(this.x , this.y + scl, 0.5);
      vertex(this.x + scl, this.y + scl/2, 0.5);
    endShape(CLOSE);
  }


}



function drawSphere3D(x, y, z, r, col) {
  push();
  translate(x, y, z);
  
  noStroke();
  if (col !== undefined) {
    // use emissiveMaterial so the sphere shows the color even if no lights() are present
    emissiveMaterial(col);
  } else {
    ambientMaterial(200);
  }
  sphere(r);
  pop();
}

// // --- added helpers: draw a flat 2D circle at a 3D position, a triangulated disc, and a sphere ---
// function drawFlatCircle3D(x, y, z, d, col) {
//   push();
//   translate(x, y, z);
//   noStroke();
//   if (col !== undefined) fill(col); else fill(200);
//   // circle() draws in local XY plane at z = 0
//   circle(0, 0, d);
//   pop();
// }

// function drawDisc3D(x, y, z, radius, detail = 36, col) {
//   push();
//   translate(x, y, z);
//   noStroke();
//   if (col !== undefined) fill(col); else fill(255);
//   // optional normal for lighting-facing +Z:
//   // normal(0, 0, 1);
//   beginShape(TRIANGLE_FAN);
//   vertex(0, 0, 0); // center
//   for (let i = 0; i <= detail; i++) {
//     let a = TWO_PI * i / detail;
//     vertex(cos(a) * radius, sin(a) * radius, 0);
//   }
//   endShape();
//   pop();
// }



