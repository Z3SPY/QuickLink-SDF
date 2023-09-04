import React, { useState, useRef, useEffect}from 'react'
import './Canvas.css'


// Points Class Start //
class Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
  cell: number;
  fill: string;
  fontStyle: string;
  vx: number;
  vy: number;
  ease: number;
  friction: number;
  dx: number;
  dy: number;
  distance: number;
  force: number;
  angle: number;

  constructor(x: number, y: number, cell: number, fill: string, fontStyle: string, width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.originX = Math.floor(x);
    this.originY = Math.floor(y);
    this.cell = cell;
    this.fill = fill;
    this.fontStyle = fontStyle;

    this.vx = 0;
    this.vy = 0;
    this.ease = 0.2;

    this.friction = 0.95;
    this.dx = 0;
    this.dy = 0;
    this.distance = 0;
    this.force = 0;
    this.angle = 0;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.font = this.fontStyle;

    ctx.fillStyle = this.fill;

    ctx.save();
    ctx.translate(this.x + 10, this.y + 70);
    ctx.translate(this.cell * 0.5, this.cell * 0.5);

    ctx.beginPath();
    ctx.arc(0, 0, this.cell * 0.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  update(ctx: CanvasRenderingContext2D, mousePos: { x: number; y: number; radius: number }) {
    this.dx = mousePos.x - this.x;
    this.dy = (mousePos.y - this.y);
    this.distance = this.dx * this.dx + this.dy * this.dy;
    this.force = -mousePos.radius / this.distance;

    if (this.distance < mousePos.radius) {
      this.angle = Math.atan2(this.dy, this.dx);
      this.vx += this.force * Math.cos(this.angle);
      this.vy += this.force * Math.sin(this.angle);
    } 

    this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
    this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;

    this.render(ctx);
  }
}

// Points Class END //

const globalMousePos: { radius: number; x: number; y: number } = {
  radius: 3000,
  x: 0,
  y: 0,
};

const img : any = document.getElementById("cat")!;

const settings = {
  dimensions: [window.screen.height * .70, window.screen.width * .40]
}

let fontSize = 1200;
let fontFamily = 'Isidora Sans';


console.log("yo" + (settings.dimensions[0]) + (settings.dimensions[1]));
// Canvas Component Start //
const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotState, setRotState] = useState("translate(0%, 0%) perspective(600px) rotateY(10deg) rotateX(10deg)");

  //Canvas State For Rotate Animation Start
  var State = "";
  let lFollowX : number  = 0;
  let lFollowY : number = 0;
  let  rotationX : number = 0;
  let  rotationY  : number = 0;
  let friction : number = 1 / 12;

  

  function updateCanvasState(xRot : number , yRot : number) {
    rotationX += (xRot - rotationX) * friction;
    rotationY += (yRot - rotationY) * friction;
    setRotState("translate(0%, 0%) perspective(1000px) rotateY("+-rotationX+"deg) rotateX("+rotationY+"deg)");
    //console.log(rotationY + " " + rotationX);
  }

  //Canvas State For Rotate Animation Start


  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    let frameCount = 0;
    let animationFrameId : any = null!;

    const cell : number = 14;
    const cols : number = Math.floor((settings.dimensions[0] - 100)/cell);
    const rows : number = Math.floor((settings.dimensions[1] - 100)/ cell);
    const numCells : number = cols * rows; //Creates a cell grid size of 54 x 54
    const points : Array<Point> = []; // Creates an empty array

    //Our Draw comes Here

    //Img
      //Start
      context.fillStyle = '#FFF5E0';
      //Use cols
      context.fillRect(0, 0, cols, rows);

        
      var ratioX = cols / img.naturalWidth;
      var ratioY = rows / img.naturalHeight;
      var ratio = Math.min(ratioX, ratioY);
         

      context.drawImage(img, 3, 0, img.naturalWidth * ratio + 15, img.naturalHeight * ratio + 15); //Resize Image
      const typeData = context.getImageData(0, 0, cols, rows).data;
    //Img End

    //Maps the image to a bit map, maps pixels in 54 * 54 bitmap
    for (let i =0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / rows);

      const x = col * cell;
      const y = row * cell;

      //Read RGBA values
      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      var pointTemp =  new Point(x, y, cell, `rgb(${r}, ${g}, ${b})`, `${cell * 2}px ${fontFamily}`, settings.dimensions[0], settings.dimensions[1]);
      pointTemp.update(context, globalMousePos);
      points.push(pointTemp);        

    }

    var catContext = document.getElementById("CatCanvas");

window.addEventListener('mousemove', (event) => {

  if (catContext != null) {
    const rect = catContext.getBoundingClientRect();
    globalMousePos.x = (event.clientX - rect.left) - 50;
    globalMousePos.y = (event.clientY - rect.top) - 50;

    var lMouseX = Math.max(-200, Math.min(100, settings.dimensions[0]/ 2 - globalMousePos.x));
    var lMouseY = Math.max(-200, Math.min(100, settings.dimensions[1]/2 - event.clientY));
    
    lFollowX = (12 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
    lFollowY = (10 * lMouseY) / 100;
  }

  

  updateCanvasState(lFollowX, lFollowY);
  
  //console.log(globalMousePos);
});
    const render = () => {
      frameCount++
      context.clearRect(0, 0, settings.dimensions[0], settings.dimensions[1]);
      points.forEach(p => {
        p.update(context, globalMousePos);
      })
      animationFrameId = window.requestAnimationFrame(render);
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
    

  }, []);
  

  return (
    <div id="Animated">
      <canvas ref={canvasRef} width={settings.dimensions[0] - 50} height={settings.dimensions[1]}
      style={{ 'transform': rotState}} 
      className="positioning md:hidden sm:hidden lg:flex left-2/4 shadow-2xl" id="CatCanvas"></canvas>
    </div>
  );
};

// Canvas Component End //

export default Canvas;