let min = 0,
  max = 100,
  winningNumber = getRandomNumber(max, min),
  guessLeft = 7,
  prevGuess = [];

const minDisplay = document.querySelector(".min-num"),
  maxDisplay = document.querySelector(".max-num"),
  guessLeftDisplay = document.querySelector(".guess-left"),
  guessInput = document.getElementById("guess-input"),
  guessButton = document.getElementById("guess-btn"),
  messageDisplay = document.querySelector(".message"),
  gameWrapper = document.getElementById("game"),
  prevGuessDisplay = document.querySelector(".previous-guess"),
  prevGuessDisplayParagraph = document.querySelector(".prev-guess-display");

minDisplay.innerHTML = min;
maxDisplay.innerHTML = max;
guessLeftDisplay.innerHTML = guessLeft;

gameWrapper.addEventListener("mousedown", function (e) {
  if (e.target.id === "refresh") {
    window.location.reload();
  }
});

guessButton.addEventListener("click", function (e) {
  let guess = parseInt(guessInput.value);
  //validation
  //-------------
  if (isNaN(guess) === true) {
    setMessage("You didn't even guess yet", "😒", "red");
  } else if (guess < min || guess > max) {
    setMessage("Your guess is out of range!", "😱", "red");
  } else if (guess === winningNumber) {
    //actual gameplay
    //===================
    //if win
    //--------------------
    prevGuessDisplayParagraph.style.display = "block";
    previousGuess();
    gameOver(`${winningNumber} is correct!. YOU WIN!`, "🥳😎🥳", "green");
  } else {
    guessLeft -= 1;
    prevGuessDisplayParagraph.style.display = "block";
    //if lose
    if (guessLeft === 0) {
      guessLeftDisplay.innerHTML = "No more";
      previousGuess();
      gameOver(`You Lose, the answer is ${winningNumber}`, "😓", "red");
    } else {
      guessLeftDisplay.innerHTML = `${guessLeft} more`;
      //if still has attempt
      if (guess < winningNumber) {
        previousGuess();
        setMessage("Your guess is lower, Go Higher!", "🤭", "red");
      } else if (guess > winningNumber) {
        previousGuess();
        setMessage("Your guess is higher, Go Lower!", "🤭", "red");
      }
    }
  }

  e.preventDefault();
});

function getRandomNumber(max, min) {
  return Math.floor(Math.random() * (max - min + 1) - min);
}

function previousGuess() {
  prevGuess.push(guessInput.value);
  let output = "";
  prevGuess.forEach(function (prev) {
    output += `${prev}, `;
    prevGuessDisplay.innerHTML = output;
    console.log(output);
  });
  console.log(prevGuess);
}

function setMessage(message, emo, color) {
  const emoji = document.createElement("span");
  emoji.className = "emo";
  emoji.appendChild(document.createTextNode(emo));

  messageDisplay.innerHTML = message;
  messageDisplay.appendChild(emoji);
  messageDisplay.style.color = color;
  guessInput.style.borderColor = color;
  guessInput.value = "";
}

function gameOver(message, emo, color) {
  setMessage(message, emo, color);
  guessButton.value = "Try Again?";
  guessButton.id = "refresh";
  guessButton.style.borderColor = color;
  guessInput.disabled = true;
}
