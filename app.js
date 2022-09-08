const modeBtn = document.getElementById("mode-btn");
const cleanBtn = document.getElementById("clean-btn");
const eraserBtn = document.getElementById("eraser-btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 650;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;


ctx.strokeStyle = color.value;
ctx.fillStyle = color.value;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

function onMove(event) {
    if(isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    };
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
};

function onMouseDown(event){
    isPainting = true;
};

function cancelPainting(){
    isPainting = false;
};

function onLineWidthChage(event) {
    ctx.lineWidth = event.target.value;

}

function onColorChange(event) {
    // console.log(event.target.value);
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}


function onColorClick(event) {
    // console.dir(event.target.dataset.color);
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
};


function onModeClick(event){
    if(isFilling) {
        isFilling = false;
        modeBtn.innerText = "Fill"
    } else {
        isFilling = true;
        modeBtn.innerText = "Draw"
    }
};


function onCanvasClick() {
    if(isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
};


function onCleanClick() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

function onEraserClick() {
    ctx.strokeStyle = "white";
    isFilling = false;
};


function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    console.log(url);
    const image = new Image();
    image.src = url;
    image.onload = function() {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
    fileInput.value = null;
};


function onDoubleClick(event){
    const text = textInput.value;
    if(text !== "") {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = "32px sanserif";
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
    }
}


function onSaveImage() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

canvas.addEventListener("mousemove", onMove); //canvas.mousemove = onMove;
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("dblclick", onDoubleClick);


lineWidth.addEventListener("change", onLineWidthChage);
color.addEventListener("change", onColorChange);




colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
cleanBtn.addEventListener("click", onCleanClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveImage);