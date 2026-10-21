
const clay = document.getElementById("clay"); 
const prompt = document.getElementById("prompt");
const prompt2 = document.getElementById("prompt2");
prompt2.style.display = "none";
const prompt3 = document.getElementById("prompt3");
prompt3.style.display = "none";

    
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
let clayStarted = false;

// MOLD CLAY ANIMATION
const moldFrameWidth = 500;
const moldFrameCount = 15;
const moldFrameSpeed = 100;

let molding = false;
let moldFinished = false;
let moldFrame = 0;

// SCRIBE ANIMATION
const scribeFrameWidth = 500;
const scribeFrameCount = 122; 
const scribeFrameSpeed = 100;

let scribeFrame = 0;
let scribing = false;

// ================= IDLE CLAY ANIMATION // =============================
function animateClay() { 
    if (clayStarted) return; /* if clay is squishing (if user presses space), stop idle animation function */
    
    clay.style.backgroundPosition = `-${currentFrame * frameWidth}px 0`; //move the sprite sheet across frameWidth (500px) //
        // to show the next frame // 
    
    currentFrame++; // add 1 to current frame // 
    
    if (currentFrame >= frameCount) { // checks 'have we reached the end of the animation?'
        currentFrame = 0; // if we reach the end, start animation again from frame 0 //
    }
}

setInterval(animateClay, frameSpeed); // run animateClay function every frameSpeed (100 miliseconds) // 

// PRESS SPACE
document.addEventListener("keydown", function(event) {
    
    if (event.code === "Space" && !squishing) {
        clayStarted = true;
        squishing = true;
        currentFrame = 0;
        
        //hide the prompt
        prompt.style.display= "none";
        
        // Change to squish sprite sheet
        clay.style.backgroundImage =
            'url("assets/clay/clay-squish-sheet.png")';
            
        clay.style.backgroundSize = "10500px 500px";
        
        playSquish();
    }
});

// ====================== SQUISH ANIMATION ================ //
function playSquish() {
    
    clay.style.backgroundPosition =
        `-${currentFrame * squishFrameWidth}px 0`;
    
    currentFrame++;
    
    if (currentFrame >= squishFrameCount) {
        currentFrame = squishFrameCount - 1;
       
        squishFinished = true;
        squishing = false; 
        
        // show the mold prompt (prompt2) 
        prompt2.style.display = "block";
        
        return;
    }
    
    setTimeout(playSquish, squishFrameSpeed);
}

// ============== MOLD ANIMATION =========================== //
 function playMold() {
     
    //stop if the user is no longer holding
    if (!molding) return;
    
    clay.style.backgroundPosition = 
        `-${moldFrame * moldFrameWidth}px 0`;
     
    moldFrame++;
     
    //stop on the last frame
    if (moldFrame >= moldFrameCount) {
        moldFrame = moldFrameCount - 1;
        
        moldFinished = true;
        molding = false;
        
        //shiw the scribe instruction
        prompt3.style.display = "block";
        
        return;
    }
     
    setTimeout(playMold, moldFrameSpeed); 
 }

// START MOLDING WHEN USER CLICKS AND HOLDS

clay.addEventListener("mousedown", function() {
    
    if (moldFinished) return;
    molding = true;
    prompt2.style.display = "none";
    moldFrame = 0;
    
    //change to mold sprite sheet
    clay.style.backgroundImage = 
        'url("assets/clay/mold-clay.png")';
    
    clay.style.backgroundSize = "7500px 500px";
    
    playMold();
});

//STOP MOLDING WHEN USER LETS GO OF MOUSE
clay.addEventListener("mouseup", function() {
    molding = false;
});

clay.addEventListener("mouseleave", function(){
    molding = false;
});

// ============= SCRIBE ANIMATION ==================== //

// PRESS S TO START SCRIBING

document.addEventListener("keydown", function(event) {
    
    if (event.code === "KeyS" && moldFinished && !scribing) {
        
        scribing = true;
        scribeFrame = 0;
        
        //hide the prmompt
        prompt3.style.display = "none";
        
        //change to the scribe sheet
        clay.style.backgroundImage =
            'url("assets/clay/scribe.png")';
        
        clay.style.backgroundSize = "61000px 500px";
        
        playScribe();
    }
});

// PLAY SCRIBE ANIMATION

function playScribe() {
    
    //show the current grame
    clay.style.backgroundPosition = 
        `-${scribeFrame * scribeFrameWidth}px 0`;
    
    scribeFrame++;
    
    //stop on the last frame
    if (scribeFrame >= scribeFrameCount) {
        scribeFrame = scribeFrameCount - 1;
        
        return;
    }
    
    setTimeout(playScribe, scribeFrameSpeed);
}

// ============= INFO SECTION ======================== //

const infoOverlay = document.getElementById("info-overlay");
const infoButtons = document.querySelectorAll(".info-button");
const closeInfo = document.getElementById("close-info");

const infoTitle = document.getElementById("info-title");
const infoText = document.getElementById("info-text");

//INFORMATION

const info = {
    cuneiform: {
        title: "Cuneiform",
        text: "The earliest writing that we know of comes from cuneiform tablets. Cuneiform tablets were used to record down information, such as business, stock-taking, and trade. It was also used for leisure, to write down stories, myths and personal letters. As societies became more complex, the need for visual marking systems for storing information became prevalent. Human memory was no longer adequate when the amount of information increased. Cuneiform allowed people to move outside of the human mind and store information physically."
    },
    
    stylus: {
        title: "Reed Stylus",
        text: "Cuneiform means 'wedge-shaped.' This name comes from the nature of the markings. They were done using a reed stylus, when impressed into the soft wet clay it left wedge-like marks, giving it its distinct look. It’s suggested that a species of reed called the Giant Reed was what was used as the stylus tool. Once split, it makes for a perfect stylus thanks to its solid stalk and waterproof skin."
    },
    
    tools: {
        title: "Today's Tools",
        text: "Today we use notebooks, databases, spreadsheets, computers, phones and a whole array of other technologies to store information. All these things serve a very similar function to the cuneiform tablets of ancient Mesopotamia. The technology itself has changed, a computer is not the same as a clay tablet, but the design problem remains the same. How do we record information, organise it and retrieve it later when human memory fails?"
    }
    
};

//OPEN INFO POPUP //

infoButtons.forEach(function(button) {
    
    button.addEventListener("click", function() {
        
        const selectedInfo = info[button.dataset.info];
        
        infoTitle.textContent = selectedInfo.title;
        infoText.textContent = selectedInfo.text;
        
        infoOverlay.style.display = "flex";
    });
});

// CLOSE INFO POPUP //
closeInfo.addEventListener("click", function() {
    infoOverlay.style.display = "none";
});


