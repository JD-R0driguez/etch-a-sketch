const DefaultRows= 16;
const DefaultColumns= 16;
let pixelColor = '#000000';
let rainBowMode = false;

const drawingGrid =  document.getElementById('draw-area');
const clearGrid = document.getElementById('clear');

const hoverDrawingOn = document.getElementById('hover-mode');
const clickDrawingOn = document.getElementById('click-mode');
const gridVisibleOn = document.getElementById('grid-on');
const gridVisibleOff = document.getElementById('grid-off');
const gridSizeSlider = document.getElementById('range-slider');
const gridSizeText = document.getElementById('grid-size'); 
const colorPick = document.getElementById('color-ball');
const rainBowModeButton = document.getElementById('multi-color');
const monoColorButton = document.getElementById('one-color');


createDrawingMatrix(DefaultRows, DefaultColumns);

//Event Listener to clear the grid
clearGrid.addEventListener('click', function(){
    const pixels = document.querySelectorAll('.grid-pixel');
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = 'white';
    })
});    

//Event Listener to handle color selection and color mode
monoColorButton.classList.add('active');

colorPick.addEventListener('input', function(){
    pixelColor = colorPick.value;
});

rainBowModeButton.addEventListener('click', function(){
    rainBowMode = true;
    rainBowModeButton.classList.add('active');
    monoColorButton.classList.remove('active');
});

monoColorButton.addEventListener('click', function(){
    rainBowMode = false;
    monoColorButton.classList.add('active');
    rainBowModeButton.classList.remove('active');
    
});

//Event listeners handling the drawing mode selector
let hoverDrawing = true;
let mouseDown =  false;
hoverDrawingOn.classList.add('active');

hoverDrawingOn.addEventListener('click', function(){
    hoverDrawing = true;
    hoverDrawingOn.classList.add('active');
    clickDrawingOn.classList.remove('active');
});

clickDrawingOn.addEventListener('click', function(){
    hoverDrawing = false;
    hoverDrawingOn.classList.remove('active');
    clickDrawingOn.classList.add('active');
});

drawingGrid.addEventListener('mousedown', function() {
    mouseDown = true;
  });
  
drawingGrid.addEventListener('mouseup', function() {
    mouseDown = false;
});

drawingGrid.addEventListener('mouseover', function(event) {
    if ((hoverDrawing || (mouseDown && !hoverDrawing)) && event.target.classList.contains('grid-pixel')) {
      if (rainBowMode){
        event.target.style.backgroundColor = generateRandomColor(); 
      }else{
        event.target.style.backgroundColor = pixelColor;
      }
    }
});

//Event listener handling the grid size text
gridSizeSlider.addEventListener('input', function(){
    const newSize = this.value;
    gridSizeText.textContent = `${newSize} x ${newSize}`;
})

gridSizeSlider.addEventListener('change', function(){
    const newSize = this.value;
    createDrawingMatrix(newSize, newSize);
})


//Event listener handling the Grid On/Off status
gridVisibleOn.classList.add('active');

gridVisibleOn.addEventListener('click', function(){
    gridVisibleOn.classList.add('active');
    const pixels = document.querySelectorAll('.grid-pixel');
    pixels.forEach(pixel => {
        pixel.classList.add('grid-pixel-border');
    });
});

gridVisibleOff.addEventListener('click', function(){
    const pixels = document.querySelectorAll('.grid-pixel');
    pixels.forEach(pixel => {
        pixel.classList.remove('grid-pixel-border');
    });
});


//Creates a matrix of div elements and places them inside the grid area
function createDrawingMatrix (numRows, numColumns){
    
    drawingGrid.innerHTML = '';
    const gridMatrix =  numRows * numColumns;
    
    for(let i = 0; i < gridMatrix; i++){
        const gridPixel = document.createElement('div');
        gridPixel.classList.add('grid-pixel');
        if (gridVisibleOn.checked){
            gridPixel.classList.add('grid-pixel-border');
        }
        drawingGrid.appendChild(gridPixel);
    }
    drawingGrid.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
    drawingGrid.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
}

//Creates an array of shades based in the current color selection
function generateRandomColor() {
    const r = Math.floor(Math.random() * 256); 
    const g = Math.floor(Math.random() * 256); 
    const b = Math.floor(Math.random() * 256); 
  
    // Convert the RGB values to hexadecimal format
    const componentToHex = (c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
  
    const redHex = componentToHex(r);
    const greenHex = componentToHex(g);
    const blueHex = componentToHex(b);
  
    const randomColor = "#" + redHex + greenHex + blueHex;
    return randomColor;
}
  



