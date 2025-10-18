function setup() {
  createCanvas(600, 400);

  walker = new Walker();
  
  background(255);
}


let t =0;
function draw() {
  walker.show();
  walker.step();
  t+=0.01;
}


class Walker {

  constructor(parameters) {
    this.x = width / 2;
    this.y = height / 2;

  }

  show (){
    stroke(204,102,0);
    // fill(204,102,0);
    point(this.x, this.y);
    
  }
  step() {

    // if (random(1) > 0.5) {
    //   if (this.x < mouseX) {
    //     this.x++;
    //   }else
    //   {
    //     this.x--;
    //   }

    //   if (this.y < mouseY) {
    //     this.y++;
    //   }else
    //   {
    //     this.y--;
    //   }


    //   rect(100,100)
    // } 
    // else
    // {


    // let xstep = floor(random(5)) - 1;
    // let ystep = floor(random(5)) - 1;

    // if (xstep > 1) {
    //   xstep = 1
    // }
    // if (ystep > 1) {
    //   ystep = 1
    // }

    // this.x += xstep;
    // this.y += ystep;
  //   rect(100,100)
  // }


  } 
}

