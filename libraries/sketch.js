class Hilbert{
  constructor(order){
    this.order = order;
  }
  point(i){
    const points = [[0,0]
              ,[0,1]
              ,[1,1]
              ,[1,0]];
    var index = i&3;
    var mapping = points[index];
    for (let x=1; x<this.order; x++){
      let offset = Math.pow(2, x);
      i = i>>2;
      index = i&3;
      if (index===0){
        const temp = mapping[0];
        mapping[0] = mapping[1];
        mapping[1] = temp;
      }
      if (index===1){
        mapping[1] += offset;
      }
      if (index===2){
        mapping[0] += offset;
        mapping[1] += offset;
      }
      if (index===3){
        const temp = offset - 1 - mapping[0];
        mapping[0] = offset - 1 - mapping[1];
        mapping[1] = temp;
        mapping[0] += offset;
      }
    }
    return mapping;
  }
}

let slider;
let order;
let size = Math.pow(2, order);
let scale = N/size;
var N ;
let counter =0;
let i=0;
let hilbert = new Hilbert(order);;

setup = function(){
    
    
    N = min(windowWidth, windowHeight);
    createCanvas(windowWidth*0.99, windowHeight*0.99);
    slider = createSlider(0, 7, 3, 1);
    slider.position(10, 10);
    slider.style('width', '80px');
    slider.input(updateOrder);
    scale = N/size;
    fill('#fff');
    textSize(16);
    textStyle(BOLD);
    order = slider.value();
    size = Math.pow(2, order);
    scale = N/size;
    counter = 0;
    i=0;
    hilbert = new Hilbert(order);
    colorMode(HSB, 360, 255, 255);
    background(0);
}

function updateOrder(){
  background(0);
  order = slider.value();
  size = Math.pow(2, order);
  scale = N/size;
  counter = 0;
  i=0;
  hilbert = new Hilbert(order);
}


draw = function(){
    // let val = slider.value();
    
    fill('#fff');
    textSize(16);
    textStyle(BOLD);
    strokeWeight(0);
    text(`Order Of Hilbert Curve ${slider.value()}`, slider.x + 5 ,45);
    stroke(255);
    strokeWeight(3);
    noFill();
    for(; i<min(counter, size*size-1); i++){
      let [x1, y1] = hilbert.point(i);
      let [x2, y2] = hilbert.point(i+1);  
      let h = map(i, 0, size*size, 0, 360);
      stroke(h, 255, 255);
      line(x1*scale+scale/2+width/4, y1*scale+scale/2, x2*scale+scale/2+width/4, y2*scale+scale/2);
    }
    counter+=1;
    if (counter >= size*size) {
      setTimeout(() => {background(0);i=0; counter = 0;}, 1000);
    }
}
