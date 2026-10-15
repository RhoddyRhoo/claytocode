
// =============== PLAYGROUND CANVAS ====================== //

const canvas = document.getElementById("canvas"); /* find canvas element in HTML */ 
const ctx = canvas.getContext("2d"); /* context, get the tools for drawing on the canvas */

// CANVAS SIZE (drawing resolution)

canvas.width = 900;
canvas.height = 550;

// DRAWING SETTINGS

let currentColour = "black"; /* default colour */
let currentSize = 5; /* default size */

let drawing = false; /* by default there is no drawing */
let erasing = false; /* by defaul;t there is no erasing */

// START DRAWING

canvas.addEventListener("mousedown", function(event) {
    drawing = true; /* test for mouse down, when it is down function event, drawing happens */
    
    //start a completely new line
    ctx.beginPath(); /* context, draw usuing the default settings/tools */
    
    draw(event);
});

// STOP DRAWWING

canvas.addEventListener("mouseup", function() {
    drawing = false;
    
    //end the currenyt line
    ctx.beginPath();
});

canvas.addEventListener("mouseleave",function() {
    drawing = false;
    
    ctx.beginPath();
});

// DRAW WHILE MOVING MOUSE
canvas.addEventListener("mousemove", function(event) {
    if (drawing) {
        draw(event);
    }
});

// DRAW FUNCTION

function draw(event) {
    
    // get the mouse position inside the canvas
    const rect = canvas.getBoundingClientRect(); /* gets the position and size of the canvas on the page */
    
    const x = event.clientX - rect.left; /* event.clientX = mouse's horizontal position on the whole page */
    const y = event.clientY - rect.top; /* rect.top = how far from the top of the canvas is my mouse? */
    
    //choose whether we are drawing or erasing
    if (erasing) {
        ctx.strokeStyle = "#E4C8AB"; /* canvas colour, essentially colouring in the same canvas colour, looks like erasing */
    } else {
        ctx.strokeStyle = currentColour;
    }
    
    ctx.lineWidth = currentSize;
    ctx.lineCap = "round";
    
    //draw a line from the previous mouse postion
    ctx.lineTo(x, y);
    ctx.stroke();
}

// COLOUR BUTTONS

const colourButtons = document.querySelectorAll(".colour");

colourButtons.forEach(function(button) {
    button.addEventListener("click", function(){
        currentColour = button.dataset.colour;
        erasing = false;
    });
});

//PEN SIZE BUTTONS

const sizeButtons = document.querySelectorAll(".size");
sizeButtons.forEach(function(button) {
    button.addEventListener("click",function() {
        currentSize = Number(button.dataset.size);
        erasing = false;
    });
        
});

// ERASER

const eraser = document.getElementById("eraser");
eraser.addEventListener("click", function() {
    erasing =true;
});

// CLEAR
const clear = document.getElementById("clear");
clear.addEventListener("click", function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}); 