const DefaultRows= 16;
const DefaultColumns= 16;

const drawingGrid =  document.getElementById('draw-area');
const gridSizeSlider = document.getElementById('range-slider');
const gridSizeText = document.getElementById('size-value'); 
const gridModeValue = document.getElementById('grid-toggle-switch');
const drawingModeValue = document.getElementById('mode-toggle-switch')
const hoverDrawingOn = document.getElementById('hover-on');
const clickDrawingOn = document.getElementById('click-draw-on');

createDrawingMatrix(DefaultRows, DefaultColumns);


//Event listeners handling the drawing mode selector
let hoverDrawing = true;
let mouseDown =  false;

hoverDrawingOn.classList.add('active');

hoverDrawingOn.addEventListener('click', function(){
    clickDrawingOn.classList.remove('active');
    hoverDrawingOn.classList.add('active');
    hoverDrawing = true;
});

clickDrawingOn.addEventListener('click', function(){
    clickDrawingOn.classList.add('active');
    hoverDrawingOn.classList.remove('active');
    hoverDrawing = false;
});

drawingGrid.addEventListener('mousedown', function() {
    mouseDown = true;
  });
  
drawingGrid.addEventListener('mouseup', function() {
    mouseDown = false;
});

drawingGrid.addEventListener('mouseover', function(event) {
    if (hoverDrawing && event.target.classList.contains('grid-pixel')) {
      event.target.style.backgroundColor = 'black'; 
    } else if (!hoverDrawing && mouseDown && event.target.classList.contains('grid-pixel')) {
      event.target.style.backgroundColor = 'red'; 
    }
});

//Event listener handling the grid size text
gridSizeSlider.addEventListener('input', function(){
    const newSize = this.value;
    gridSizeText.innerHTML = `${newSize} x ${newSize}`;
})

gridSizeSlider.addEventListener('change', function(){
    const newSize = this.value;
    createDrawingMatrix(newSize, newSize);
})


//Event listener handling the Grid On/Off status
gridModeValue.addEventListener('change', function(){
    const pixels = document.querySelectorAll('.grid-pixel');

    if (gridModeValue.checked){
        
        pixels.forEach(pixel => {
            pixel.classList.add('grid-pixel-border');
        });
    }else{
        pixels.forEach(pixel => {
            pixel.classList.remove('grid-pixel-border');
        });
    }
})


//Creates a matrix of div elements and places them inside the grid area
function createDrawingMatrix (numRows, numColumns){
    
    drawingGrid.innerHTML = '';
    const gridMatrix =  numRows * numColumns;
    
    for(let i = 0; i < gridMatrix; i++){
        const gridPixel = document.createElement('div');
        gridPixel.classList.add('grid-pixel');
        if (gridModeValue.checked){
            gridPixel.classList.add('grid-pixel-border');
        }
        drawingGrid.appendChild(gridPixel);
    }
    drawingGrid.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
    drawingGrid.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
}



/* //Event handler for whe the mouse leaves the pixel

drawingGrid.addEventListener('mouseout', function(event) {
    if (event.target.classList.contains('grid-pixel')) {
      event.target.style.backgroundColor = ''; // Reset the background color
    }
});
*/



