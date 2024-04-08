const gridConts = document.getElementById('gridContainer')
const reset = document.getElementById('eraser');
const rainbow = document.getElementById('rainbow')
const resetButton = document.getElementById('reset')
const range = document.getElementById('size')
const showGrid = document.getElementById('toggleGrid')
showGrid.style.backgroundColor='#FF9595'

let colorSelector = document.getElementById('colorInput');
let selected = "#000000";
let grid = document.getElementById('gridContainer');
let size = 16;
let mouseDown = false;
let eraserMode = false;
let rainbowMode = false;
let opacityMode = false;
let isGrid = true;



range.addEventListener('input', function() {
  updateGrid(range.value);
});


showGrid.addEventListener('click',function() {
  isGrid = isGrid ? false : true;
  console.log(isGrid)
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
  event.target.style.backgroundColor = selected;}
};





function updateGrid (newValue) {
  gridConts.innerHTML=''
  createDivs(newValue)
  console.log(newValue)
}

updateGrid(range.value)

  