const gridConts = document.getElementById('gridContainer')
const reset = document.getElementById('resetButton');
const rainbowT = document.getElementById('rainbow')
const range = document.getElementById('size')
const showGrid = document.getElementById('toggleGrid')
const eraserT = document.getElementById('eraser')
const textG = document.getElementById('sliderText')

let colorSelector = document.getElementById('colorInput');
let selected = "#000000";
let grid = document.getElementById('gridContainer');
let size = 16;
let mouseDown = false;
let eraserMode = false;
let rainbowMode = false;
let opacityMode = false;
let isGrid = true;
let rainbowIndex = 0;

showGrid.style.backgroundColor='#FF9595'

range.addEventListener('input', function() {
  updateGrid(range.value);
});


showGrid.addEventListener('click',function() {
  isGrid = isGrid ? false : true;
  toggleGrid()
});  


function toggleEraser() {
  console.log('eraserMode: ' + eraserMode)
  eraserMode = eraserMode ? false : true;
  eraserMode ? eraserT.style.backgroundColor='#FF9595' : eraserT.style.backgroundColor=''
  console.log('eraserMode: ' + eraserMode)
}

eraserT.addEventListener('click',toggleEraser);


rainbowT.addEventListener('click',function() {
  rainbowMode = rainbowMode ? false : true;
  if (eraserMode) {toggleEraser()}
  rainbowMode ? rainbowT.style.backgroundColor='#FF9595' : rainbowT.style.backgroundColor=''
  });




function toggleGrid() {
  isGrid ? showGrid.innerText='Grid ON' : showGrid.innerText='Grid OFF'
  isGrid ? showGrid.style.backgroundColor='#FF9595' : showGrid.style.backgroundColor=''
  let selection = document.querySelectorAll('.gridMember');
  selection.forEach(div => {
      div.classList.toggle('gridMemberBorder');
      
  });
}

reset.addEventListener('click',resetlogic)

function resetlogic() {
  console.log('reset clicked')
  let toReset = document.querySelectorAll('.gridMember')
  toReset.forEach(div => {
    div.classList.add('reset')
    div.style.backgroundColor = 'white'})
    setTimeout(() => {updateGrid(range.value)},500)
       

}


document.body.onmousedown = () => {
  mouseDown = true;
};

document.body.onmouseup = () => {
  mouseDown = false;
};

colorSelector.addEventListener('input',  function (event) {
    const selectedColor = event.target.value;
    selected = selectedColor;
    console.log(selected);

  });

function createDivs(size){
  gridElements = size * size;
    for (let i = 0; i < gridElements; i++) {
        const newDiv = document.createElement('div');
        newDiv.addEventListener('mouseleave', paintDiv);
        newDiv.classList.add('gridMember');
        newDiv.style.width = 'calc(100% / ' + size + ')';
        newDiv.style.height = 'calc(100% / ' + size + ')';
        if (isGrid)  {newDiv.classList.add('gridMemberBorder')};
        gridConts.appendChild(newDiv);
        

    }
    

}


function paintDiv(event) {if (mouseDown)  {
  if (eraserMode) {
    event.target.style.backgroundColor = ''
    }
  else if (rainbowMode) {let rainbowColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
  
  
  event.target.style.backgroundColor = rainbowColors[rainbowIndex].toLowerCase(); // Set the current color
  rainbowIndex++; // Increment the color index
  console.log(rainbowIndex)
  if (rainbowIndex >= rainbowColors.length) {
      rainbowIndex = 0; // Wrap around to the first color if index exceeds the array length
      }
}
  else {event.target.style.backgroundColor = selected;}}
};

function updateGrid (newValue) {
  gridConts.innerHTML=''
  createDivs(newValue)
  console.log(newValue)
  textG.innerText = 'Select the grid size: ' + '\n' + range.value + ' by ' +range.value;
}

updateGrid(range.value)

  