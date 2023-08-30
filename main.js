// Letters 
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get array from the letters 
let lettersArray = Array.from(letters);

// select letters container 
let lettersContainer = document.querySelector(".letters");

// Generate letters
lettersArray.forEach((letter) => {
    let span = document.createElement("span");
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = "letter-box";
    lettersContainer.appendChild(span);
})

// Object of categories and words 
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python", "css", "html", "flutter"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up", "World War Z", "Fault In Our Stars"],
    people: ["Albert Einstein", "Hithchcock", "Alexander", "Messi", "Cleopatra", "Ghandi"],
    countries: ["Egypt", "England", "France", "Palestine", "Syria", "Germany", "Russia", "Qatar", "iceland", "finland", "america", "brasil", "argentina", "soudan", "turkey", "poland", "netherlands", "algeria"],
}

// Get Random Property From The Object
let allKeys = Object.keys(words); // Gets all the keys in the words object 

// Random Number Depends On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length) // get random number 
// Math.floor(Math.random() * number + 1);

// Category
let randomPropName = allKeys[randomPropNumber];

// Array of random Key  => category Words
let randomPropValue = words[randomPropName]

// Random Number Depends On the Key Value
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length)

// Last Value
let randomValueValue = randomPropValue[randomValueNumber]


// set category info 
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// select letters guess element 
let lettersGuessContianer = document.querySelector(".letters-guess");

// convert chosen word to array 
let lettersAndSpace = Array.from(randomValueValue);

// create Spans depend on word

lettersAndSpace.forEach(letter => {
    // create Empty span 
    let emptySpan = document.createElement("span");
    // if the current letter is space 
    if (letter === " ") {
        // add class to the span 
        emptySpan.className = "with-space";   // span with space
    }

    // Append the span to the letters guess container 
    lettersGuessContianer.appendChild(emptySpan);

})

// select guess Spans to add the correct letters in it 
let guessSpans = document.querySelectorAll(".letters-guess span");

// set wrong atttempts 
let wrongAttempts = 0;

// Select the draw element
let theDraw = document.querySelector(".hangman-draw");

let suc = true;


// Handle clicking on the letters 
document.addEventListener('click', (e) => {
    // set the choose status
    let theStatus = false;
    if (e.target.className === "letter-box") {
        e.target.classList.add("clicked")

        // get clicked letter
        let clickedLetter = e.target.innerHTML.toLowerCase();
        // lettersAndSpace 
        let chosenWord = Array.from(randomValueValue.toLowerCase());
        chosenWord.forEach((wordLetter, wordIndex) => {
            // if the clicked letter === one of the chosen word letters 
            if (clickedLetter == wordLetter) {
                // set status to correct 
                theStatus = true;
                //loop on all guess spans to put the correct letter in the correct index 
                guessSpans.forEach((span, spanIndex) => {
                    if (wordIndex === spanIndex) {
                        span.innerHTML = clickedLetter;
                    }
                })
            }
        })
        // If letter is wrong 
        if (theStatus === false) {
            // Increase the wrong attempts 
            wrongAttempts++;

            // Add wrong class on the draw element 
            theDraw.classList.add(`wrong-${wrongAttempts}`);

            // play the fail sound
            document.getElementById("fail").play();

            if (wrongAttempts === 8) {
                lettersContainer.classList.add("finished");
                endGame();
            }

        } else {
            // play the success sound 
            document.getElementById("success").play();

            // show the success menu 
            for (let i = 0; i < guessSpans.length; i++) {
                if (guessSpans[i].innerHTML === "" && guessSpans[i].className !== "with-space") {
                    suc = false;
                    break;
                } else {
                    suc = true;
                }
            }
            if (suc === true) {
                document.getElementById("win").style.display = "block";
            }
        }
    }
})

function endGame() {
    // let div = document.createElement("div");
    // let divText = document.createTextNode(`Game Over, the word is ${randomValueValue}`);
    // div.appendChild(divText);
    // div.className = "pop-up";
    // document.body.appendChild(div);
    document.getElementById("tudo").style.display = "block";
}

let yesBtn = document.querySelector(".yes");
let noBtn = document.querySelector(".no");

let yesWinBtn = document.querySelector(".yes.win");
let noWinBtn = document.querySelector(".no.win");

yesBtn.onclick = function () {
    window.location.reload();
}

yesWinBtn.onclick = function () {
    window.location.reload();
}

noBtn.onclick = function () {
    document.getElementById("tudo").style.display = "none";

}

noWinBtn.onclick = function () {
    document.getElementById("win").style.display = "none";
}