/*
 * Create a list that holds all of your cards
 */

let cards = document.getElementsByClassName('card');
let cardsArray = [...cards];
//The deck that contains the cards. 
const deck = document.querySelector('.deck');

//list of open cards
let openCards = [];

//list of matched cards
let matchedCards = [];

//Number of moves
let countMoves = 0;
let timerStarted = false;
let time = 0;
const moves = document.querySelector('.moves');
const stars = document.querySelector('.stars');
const star = document.querySelector('li');
const starIcon = document.getElementsByClassName('fa-star');
const result = document.querySelector('.results');
const para = document.createElement('p');
const winner = document.getElementById('winnerModal');
const restart = document.querySelector('.restart');
const close = document.querySelector('.close');
const firstStar = stars.firstElementChild;
const lastStar = stars.lastElementChild;



/* Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//When the page loads, cards shuffle and the game begins.
document.onload = gameStart();

function gameStart() {
    cardsArray = shuffle(cardsArray);

    for (let i = 0; i < cardsArray.length; i++) {
        deck.innerHTML = '';
    [].forEach.call(cardsArray, function (addCards) {
            deck.appendChild(addCards);
        });
        for (let j = 0; j < cardsArray.length; j++) {
            cardsArray[j].classList.remove('open', 'show', 'match');
        }
    };
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


//When the card is clicked loop through the cards array
deck.addEventListener('click', function (event) {
    if (event.target.nodeName === 'LI') {
        event.target.classList.add('open', 'show', 'preventClick');
        openCards.push(event.target);
        if (timerStarted === false) {
            startTimer()
        }

        if (openCards.length === 2) {
            countingMoves()
        }

        if ((openCards.length === 2) && (openCards[0].innerHTML !== openCards[1].innerHTML)) {
            notMatch()

        } else if ((openCards.length === 2) && (openCards[0].innerHTML == openCards[1].innerHTML)) {

            match()
        }
    }
});

// Counting moves, when two cards are open
function countingMoves() {
    countMoves += 1;
    moves.textContent = countMoves;
    starRating()
}

let starsNumber = 3;

function starRating() {
    if (countMoves === 15) {
        firstStar.style.display = 'none';
        starsNumber = 2;
    }

    if (countMoves === 25) {
        lastStar.style.display = 'none';
        starsNumber = 1;
    }
}

//Counts the number of stars and ads this number to the winner module in the end of the game
function countResults() {
    para.textContent = "Your star rating is " + starsNumber + " ! ";
    para.textContent += "You spent " + time + " seconds to finish the game.";
    result.appendChild(para);
}

//When two cards match
function match() {
    openCards[0].classList.add('match');
    openCards[1].classList.add('match');
    matchedCards.push(openCards);
    openCards = [];
    win()
}

//When two cards don't match
function notMatch() {
    setTimeout(function () {
        openCards[0].classList.remove('open', 'show', 'preventClick');
        openCards[1].classList.remove('open', 'show', 'preventClick');
        openCards = [];
    }, 500);
}

//Checks if all the cards are matched
function win() {
    if (matchedCards.length === 8) {
        countResults()
        clearInterval(timer);
        winner.style.display = 'block';
    }
}

//Start the game over after restart icon is clicked
restart.addEventListener('click', restartGame);

function restartGame() {
    lastStar.style.display = 'inline-block';
    firstStar.style.display = 'inline-block';
    winner.style.display = 'none';
    for (let i = 0; i < cardsArray.length; i++) {
        cardsArray[i].classList.remove('open', 'show', 'preventClick', 'match');
    }
    timerStarted = false;
    clearInterval(timer);
    countMoves = 0;
    moves.textContent = 0;
    newSpan.textContent = '0s';
    time = 0;
    matchedCards.length = 0;
    openCards = [];
    gameStart()
}

const newSpan = document.createElement('span');
newSpan.classList.add('timer');
const scorePanel = document.querySelector('.score-panel');
scorePanel.appendChild(newSpan);
newSpan.textContent = '0s';
let timer;

//starts timer when the first card is clicked
function startTimer() {
    timerStarted = true;
    timer = setInterval(timeCount, 1000);

    function timeCount() {
        time = time + 1;
        newSpan.textContent = time + 's';
    }
}

//closes the modal, when the x is clicked
close.addEventListener('click', function () {
    winner.style.display = 'none';
})
