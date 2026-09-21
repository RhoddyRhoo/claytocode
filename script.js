
const clay = document.getElementById("clay");

const frameWidth = 500;
const frameCount = 10;
const frameSpeed = 100;

let currentFrame = 0;

function animateClay() {
    clay.style.backgroundPosition = `-${currentFrame * frameWidth}px 0`;
    
    currentFrame++;
    
    if (currentFrame >= frameCount) {
        currentFrame = 0;
    }
}

setInterval(animateClay, frameSpeed);