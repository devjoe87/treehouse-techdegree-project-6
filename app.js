const letters = document.querySelectorAll(".letter");
const livesLi = document.querySelectorAll("#scoreboard ol li");
const overlay = document.getElementById('overlay');
const phrase = document.getElementById('phrase'); //Get the element with the ID of phrase
const phraseDisplay = document.querySelector('#phrase ul');
const qwerty = document.getElementById('qwerty'); //Get the element with the ID of qwerty
const startButton = document.querySelector('.btn__reset'); //Get the element with a class of btn__reset
const title = document.querySelector('#overlay .title');
const triesImg = document.querySelectorAll(".tries img");

let missed = 0; //Create a missed variable, initialized to 0


const phrases = [  //Create a phrases array that contains at least 5 different phrases as strings.
'may the force be with you',
'houston we have a problem',
'heres johnny',
'to infinity and beyond',
'for sparta',
'why so serious',
'you talking to me',
'show me the money',
'bond  james bond',
'say hello to my little friend',
'hasta la vista baby'
];

//Create a getRandomPhraseAsArray function.
function getRandomPhraseAsArray(array) {
   const randomPhrase = phrases[Math.floor(Math.random() * array.length)];  //choose random phrase from array
   const newCharArray = Array.from(randomPhrase);   //split randomphrase into characters
   return newCharArray;
}

// listen for the start game button to be pressed
startButton.addEventListener('click', () => {
	overlay.style.display = 'none';
	restartGame();
  	const newPhrase = getRandomPhraseAsArray(phrases);
  	addPhraseToDisplay(newPhrase);
});

//add the letters of a string to the display
function addPhraseToDisplay(array) {
	for (let i = 0; i < array.length; i += 1) {
		let li = document.createElement('li');
		li.textContent = array[i];
		phraseDisplay.appendChild(li);    
	if (array[i] != " ") {
      li.className = "letter";
    } else {
      li.className = "space";
    }
  }
}



//listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', (e) => {
	const btnClick = e.target;
	const correctLetter = checkLetter(btnClick.textContent);
	if (btnClick.tagName === 'BUTTON') {
		btnClick.className = ('button correct');
		btnClick.disabled = true;
		if (correctLetter === null) {
			const triesLi = document.querySelectorAll(".tries");
			const loseHeart = document.querySelectorAll(".tries img");
			btnClick.className = ('button wrong');			
			missed += 1;
			loseHeart[0].src = "images/lostHeart.png";
			triesLi[0].className = "";
		}
			checkWin();
		}
});

//check if a letter is in the phrase
function checkLetter(btnClick) {
  const letters = document.querySelectorAll(".letter");
  let matchingLetter = null;
  for (i = 0; i < letters.length; i++) {
    if (btnClick == letters[i].textContent) {
      letters[i].className = "letter show";
      matchingLetter = letters[i].textContent;
    }
  }
  return matchingLetter;
}


//check if the game has been won or lost
function checkWin() {
	const numOfCorrectLetters = document.getElementsByClassName('show');
	const phraseLetters = document.getElementsByClassName('letter');
	if (phraseLetters.length == numOfCorrectLetters.length) {
		phrase.style.display = 'none';
		qwerty.style.display = 'none';
		overlay.style.display = 'flex';
		overlay.className = 'win';
		title.textContent = "Well done!";
		startButton.textContent = "Just one more go?";
	} else if (missed >= 5) {
		phrase.style.display = 'none';
		qwerty.style.display = 'none';
		overlay.style.display = 'flex';
		overlay.className ='lose';
		title.textContent = "Bad Luck!";
		startButton.textContent = "Have another go?";
	}
}

function restartGame() {
	const button = document.querySelectorAll("button");
	missed = 0;
	phrase.style.display = 'block';
	qwerty.style.display = 'block';
	phraseDisplay.textContent = '';
  for (let i = 0; i < button.length; i++) {
    button[i].className = ("");
    button[i].disabled = false;
  }
  for (let i = 0; i < livesLi.length; i++) {
    livesLi[i].className = "tries";
    triesImg[i].src = "images/liveHeart.png";
  }
}