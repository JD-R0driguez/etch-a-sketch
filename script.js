
const drawingGrid =  document.getElementById('draw-area');

drawingGrid.innerHTML = '';

let gridRows = 10;
let gridColumns = 10;
let gridMatrix =  gridRows * gridColumns;

for(let i = 0; i < gridMatrix; i++){
    const gridPixel = document.createElement('div');
    gridPixel.classList.add('grid-pixel');
    drawingGrid.appendChild(gridPixel);
}

drawingGrid.style.gridTemplateColumns = `repeat(${gridColumns}, 1fr)`;
drawingGrid.style.gridTemplateRows = `repeat(${gridRows}, 1fr)`;

drawingGrid.addEventListener('mouseover', function(event) {
    if (event.target.classList.contains('grid-pixel')) {
      event.target.style.backgroundColor = 'red'; 
    }
});


//Event handler for whe the mouse leaves the pixel

// drawingGrid.addEventListener('mouseout', function(event) {
//     if (event.target.classList.contains('grid-pixel')) {
//       event.target.style.backgroundColor = ''; // Reset the background color
//     }
// });



