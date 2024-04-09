const gridConts = document.getElementById('gridContainer');
const reset = document.getElementById('resetButton');
const rainbowT = document.getElementById('rainbow');
const range = document.getElementById('size');
const showGrid = document.getElementById('toggleGrid');
const eraserT = document.getElementById('eraser');
const textG = document.getElementById('sliderText');
const colorSelector = document.getElementById('colorInput');
let selected = "#000000";
let size = 16;
let mouseDown = false;
let eraserMode = false;
let rainbowMode = false;
let isGrid = true;
let hsl = [0, 100, 50];

showGrid.style.backgroundColor = '#FF9595';

// Event Listeners
range.addEventListener('input', handleRangeInput);
showGrid.addEventListener('click', toggleGrid);
eraserT.addEventListener('click', toggleEraser);
rainbowT.addEventListener('click', toggleRainbow);
reset.addEventListener('click', resetLogic);
colorSelector.addEventListener('input', handleColorInput);

function handleRangeInput() {
  updateGrid(range.value);
}

function toggleGrid() {
  isGrid = !isGrid;
  updateGrid(range.value);
  updateGridText();
}

function toggleEraser() {
  eraserMode = !eraserMode;
  updateButtonStyle(eraserT, eraserMode);
}

function toggleRainbow() {
  rainbowMode = !rainbowMode;
  updateButtonStyle(rainbowT, rainbowMode);
}

function resetLogic() {
  resetGrid();
}

function handleColorInput(event) {
  selected = event.target.value;
}

function updateButtonStyle(button, isActive) {
  isActive ? button.style.backgroundColor = '#FF9595' : button.style.backgroundColor = '';
}

function updateGridText() {
  showGrid.innerText = isGrid ? 'Grid ON' : 'Grid OFF';
  showGrid.style.backgroundColor = isGrid ? '#FF9595' : '';
}

function resetGrid() {
  gridConts.innerHTML = '';
  createDivs(range.value);
  setTimeout(() => { updateGridText(); }, 500);
}

function createDivs(size) {
  gridElements = size * size;
  for (let i = 0; i < gridElements; i++) {
    const newDiv = document.createElement('div');
    newDiv.addEventListener('mouseleave', paintDiv);
    newDiv.classList.add('gridMember');
    newDiv.style.width = 'calc(100% / ' + size + ')';
    newDiv.style.height = 'calc(100% / ' + size + ')';
    if (isGrid) { newDiv.classList.add('gridMemberBorder'); }
    gridConts.appendChild(newDiv);
  }
}

function paintDiv(event) {
  if (mouseDown) {
    if (eraserMode) {
      event.target.style.backgroundColor = '';
    } else if (rainbowMode) {
      event.target.style.backgroundColor = 'hsl(' + hsl[0] + ',' + hsl[1] + '%,' + hsl[2] + '%)';
      hsl[0] += 10;
      if (hsl[0] >= 360) {
        hsl[0] = 0;
      }
    } else {
      event.target.style.backgroundColor = selected;
    }
  }
}

function updateGrid(newValue) {
  gridConts.innerHTML = '';
  createDivs(newValue);
  textG.innerText = 'Select the grid size: \n' + range.value + ' by ' + range.value;
}

function initialize() {
  updateGrid(range.value);
  updateGridText();
}

initialize();
