//Making Bitmaps

import canvasSketch from 'canvas-sketch'

function point(x, y, cell ,fill, fontStyle) {
    this.x = x;
    this.y = y;
    this.cell = cell; 
    this.fill = fill;
    this.fontStyle = fontStyle;


    this.render = function(ctx) {

        ctx.font = this.fontStyle; // Changes font size
  
        //Maps 
        ctx.fillStyle = this.fill;
  
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.translate(this.cell * 0.5, this.cell * 0.5);
  
        ctx.beginPath();
        //context.fillRect(0, 0, cell, cell); // Creates pixels of square
        ctx.arc(0, 0, this.cell*0.5, 0, Math.PI * 2); // replaces each pixel with a circle
        ctx.fill();

        ctx.restore();
  
        
        //context.fillText(glyph,0,0);// Changes pixels to the text value// FOR TEXT
  
    }

    this.update = function(ctx) {
        this.render(ctx);
    }
}

const settings = {
    dimensions: [ 900, 900 ],
    animate: false
  };
  
  
  let text = "Q";
  let fontSize = 1200;
  let fontFamily = 'Isidora Sans';
  
  let manager;
  
  
  const typeCanvas = document.createElement('canvas');
  const typeContext = typeCanvas.getContext('2d');
  const img = document.getElementById("cat");
  
  const sketch = ({ context, width, height }) => {
  
    //This line of code creates and our tilemap
    //Helps us view our canvas from a pixel perspective 
    const cell = 10;
    const cols = Math.floor(width/cell);
    const rows = Math.floor(height / cell);
    const numCells = cols * rows; //Creates a cell grid size of 54 x 54
    const points = []; // Creates an empty array

    typeCanvas.width = width;
    typeCanvas.height = height;
    
  
  
  
    return ({ context, width, height }) => {
      typeContext.fillStyle = 'black';
    
      //Use cols
      typeContext.fillRect(0, 0, cols, rows);
        
      var ratioX = cols / img.naturalWidth;
      var ratioY = rows / img.naturalHeight;
      var ratio = Math.min(ratioX, ratioY);   

      typeContext.drawImage(img, 0, 0, img.naturalWidth * ratio, img.naturalHeight * ratio); //Resize Image
  
      const typeData = typeContext.getImageData(0, 0, cols, rows).data;
      
  
      //Draws the new canvas we created
      //context.drawImage(typeCanvas, 0, 0);
  
      context.fillStyle = "black";
      context.fillRect(0,0,width, height);
  
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
  
        const glyph = getGlyph(r); // We need to pass the brightness of the pixel to get glyph


        var pointTemp =  new point(x, y, cell, `rgb(${r}, ${g}, ${b})`, `${cell * 2}px ${fontFamily}`);
        pointTemp.update(context);
        points.push(pointTemp);        
    

      }

      
      


    };

  };
  

  //Depending on how bright the pixel is we can return differnt glyphs
  const getGlyph = (v) => {
    if(v < 50) return '';
    if(v < 100) return '.';
    if (v < 150) return '-';
    if (v < 200) return '+';
  
    return text;
  };
  
  /*const onKeyUp = (e) => {
    text = e.key.toUpperCase();
    manager.render();
    
  };
  
  document.addEventListener('keyup', onKeyUp);*/
  
  
  //This function waits for events and actions, and then it 
  //starts the function
  /*const start = async () => {
    manager = await canvasSketch(sketch, settings);
  };
    start();
  */
  

  canvasSketch(sketch, settings);
  
  
