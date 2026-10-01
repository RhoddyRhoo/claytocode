
const clay = document.getElementById("clay"); 
const prompt = document.getElementById("prompt");

// IDLE CLAY ANIMATION
const frameWidth = 500;
const frameCount = 10;
const frameSpeed = 100; // how quickly the frames change // 

// SQUISH CLAY ANIMATION
const squishFrameWidth = 500;
const squishFrameCount = 21;
const squishFrameSpeed = 100;

let currentFrame = 0; // keep track of which frame its currently showing, start at frame 0 then 0 -> 1 -> 2 etc. //
let squishing = false;

// IDLE CLAY ANIMATION // 
function animateClay() { 
    if (squishing) return; /* if clay is squishing (if user presses space), stop idle animation function */
    
    clay.style.backgroundPosition = `-${currentFrame * frameWidth}px 0`; //move the sprite sheet across frameWidth (500px) //
        // to show the next frame // 
    
    currentFrame++; // add 1 to current frame // 
    
    if (currentFrame >= frameCount) { // checks 'have we reached the end of the animation?'
        currentFrame = 0; // if we reach the end, start animation again from frame 0 //
    }
}

setInterval(animateClay, frameSpeed); // run animateClay function every frameSpeed (100 miliseconds) // 

// PRESS SPACE OR TAP
document.addEventListener("keydown", function(event) {
    
    if (event.code === "Space" && !squishing) {
        squishing = true;
        currentFrame = 0; /* play from frame 0 */ 
        
        // change to squish sprite sheet
        clay.style.backgroundImage =
            'url(assets/clay/clay-squish-sheet.png)';
        clay.style.backgroundSize = "10500px 500px"; /* size of squish animation */
        
        playSquish();
    }
});

document.addEventListener("click", function() {
    playSquish();
});

// SQUISH ANIMATION
function playSquish() {
    clay.style.backgroundPosition = `-${currentFrame * squishFrameWidth}px 0`;
    
    currentFrame++;
    
    if (currentFrame >= squishFrameCount) {
        currentFrame = squishFrameCount - 1; /* last frame -1 (frame 20 because we start with frame 0) */
        return; /* stop animation, so effectively stay on the last frame */ 
    }
    
    setTimeout(playSquish, squishFrameSpeed);
}

// =============== PLAYGROUND CANVAS ======================

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
    ctx.begingPath(); /* context, draw usuing the default settings/tools */
    
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
