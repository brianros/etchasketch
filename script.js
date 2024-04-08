const gridConts = document.getElementById('gridContainer')
const reset = document.getElementById('resetButton');
const rainbow = document.getElementById('rainbow')
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

showGrid.style.backgroundColor='#FF9595'

range.addEventListener('input', function() {
  updateGrid(range.value);
});


eraserT.addEventListener('click',function() {
  eraserMode = eraserMode ? false : true;
  eraserMode ? eraserT.style.backgroundColor='#FF9595' : eraserT.style.backgroundColor=''
});


showGrid.addEventListener('click',function() {
  isGrid = isGrid ? false : true;
  toggleGrid()
});

function toggleGrid() {
  isGrid ? showGrid.innerText='Grid ON' : showGrid.innerText='Grid OFF'
  isGrid ? showGrid.style.backgroundColor='#FF9595' : showGrid.style.backgroundColor=''
  let selection = document.querySelectorAll('.gridMember');
  selection.forEach(div => {
      div.classList.toggle('gridMemberBorder');
      
  });
}

reset.addEventListener('click',() => {
  resetlogic();
  
})

function resetlogic() {
  let toReset = document.querySelectorAll('.gridMember')
  toReset.forEach(div => {
    div.style.backgroundColor=('white')
    div.classList.add('reset');})
    setTimeout(() => {
      toReset.forEach(div => div.classList.remove('reset'));
       }, 1000); 

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
        newDiv.addEventListener('mousemove', paintDiv);
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
  else {
  event.target.style.backgroundColor = selected;}}
};





function updateGrid (newValue) {
  gridConts.innerHTML=''
  createDivs(newValue)
  console.log(newValue)
  textG.innerText = 'Select the grid size: ' + '\n' + range.value + ' by ' +range.value;
}

updateGrid(range.value)

  