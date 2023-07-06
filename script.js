const DefaultRows= 16;
const DefaultColumns= 16;

const drawingGrid =  document.getElementById('draw-area');
const gridSizeSlider = document.getElementById('range-slider');
const gridSizeText = document.getElementById('size-value'); 

createDrawingMatrix(DefaultRows, DefaultColumns);

drawingGrid.addEventListener('mouseover', function(event) {
    if (event.target.classList.contains('grid-pixel')) {
      event.target.style.backgroundColor = 'red'; 
    }
});

gridSizeSlider.addEventListener('input', function(){
    const newSize = this.value;
    gridSizeText.innerHTML = `${newSize} x ${newSize}`;
    createDrawingMatrix(newSize, newSize);
})

function createDrawingMatrix (numRows, numColumns){
    
    drawingGrid.innerHTML = '';
    const gridMatrix =  numRows * numColumns;
    
    for(let i = 0; i < gridMatrix; i++){
        const gridPixel = document.createElement('div');
        gridPixel.classList.add('grid-pixel');
        drawingGrid.appendChild(gridPixel);
    }
    drawingGrid.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
    drawingGrid.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;

    // alert(gridSizeSlider.value);

}



/* //Event handler for whe the mouse leaves the pixel

drawingGrid.addEventListener('mouseout', function(event) {
    if (event.target.classList.contains('grid-pixel')) {
      event.target.style.backgroundColor = ''; // Reset the background color
    }
});
*/



