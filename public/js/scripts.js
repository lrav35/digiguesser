/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
// import { speed } from "jquery";
const randNum = Math.floor(Math.random() * 100);
const guesses = [];
const $result = $("<p>>").attr("id", "result");
const $guessList = $("<p>").attr("id", "guesses");
const $score = $("<p>").attr("id", "score");
let gameON = false;
let speed = 250;
// initial card position
const card = $(".card");
const initialTop = card.position().top;
const initialLeft = card.position().left;
const validateInput = (input, guesses) => {
    if (!Number.isInteger(input) || (input < 1 || input > 100)) {
        alert("that is not a discrete number in the range. TRY AGAIN!");
        $(".input").val("");
        return false;
    }
    else if (guesses.includes(input)) {
        alert("You've already guessed that number. TRY AGAIN!");
        $(".input").val("");
        return false;
    }
    else {
        return true;
    }
};
const updateGuesses = (input) => {
    const maxLength = 4;
    if (input.length <= maxLength) {
        return `Your guesses: [${input.join(", ")}]`;
    }
    else {
        const truncatedGuesses = input.slice(0, maxLength);
        return `Your guesses: [${truncatedGuesses.join(", ")}...${input[input.length - 1]}]`;
    }
};
const updateResult = (winner, randNum, parsedInput) => {
    if (winner) {
        return 'Congratulations! You guessed the number.';
    }
    else if (parsedInput > randNum) {
        return `The number is lower than ${parsedInput}`;
    }
    else {
        return `The number is higher than ${parsedInput}`;
    }
};
const updateScore = (winner, guesses) => {
    if (winner) {
        return `Score: ${guesses.length} guesses.`;
    }
    return `Number of guesses: ${guesses.length}`;
};
const coordChange = (dx, dy) => {
    const card = $(".card");
    const cardHeight = card.height();
    const cardWidth = card.width();
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();
    const left = card.position().left;
    const top = card.position().top;
    const new_dx = left < 0 || left + cardWidth > windowWidth ? -dx : dx;
    const new_dy = top < 0 || top + cardHeight > windowHeight ? -dy : dy;
    const new_left = left + new_dx;
    const new_top = top + new_dy;
    return { new_left, new_top, new_dx, new_dy };
};
const animateCard = (rateOfChange, refreshRate) => {
    const card = $(".card");
    while (!gameON) {
        // Reset the card's position
        card.css({
            top: initialTop,
            left: initialLeft,
        });
        return;
    }
    const x_rate = rateOfChange.x;
    const y_rate = rateOfChange.y;
    const { new_left, new_top, new_dx, new_dy } = coordChange(x_rate, y_rate);
    card.css({
        top: new_top,
        left: new_left,
    });
    setTimeout(() => animateCard({ x: new_dx, y: new_dy }, refreshRate), refreshRate);
};
$(".restart").on("click", () => {
    location.reload();
});
$("#form").on("submit", function (event) {
    console.log(`randNum: ${randNum}`);
    event.preventDefault();
    const input = $(".input").val();
    $(".input").val("");
    const parsedInput = Number(input);
    if (validateInput(parsedInput, guesses)) {
        gameON = true;
        guesses.push(parsedInput);
        const winner = parsedInput === randNum;
        $('#output').append($guessList, $result, $score);
        $("#result").text(updateResult(winner, randNum, parsedInput));
        $("#score").text(updateScore(winner, guesses));
        $("#guesses").text(updateGuesses(guesses));
        if (parsedInput === randNum) {
            // stop the game, you win!
            gameON = false;
            $("#form :input").prop("disabled", true);
        }
    }
});
$(".card").on("submit", () => {
    const rateOfChange = { x: 2, y: 2 };
    // refresh rate increases logarithmically with the number of guesses, but stops at 0
    // speed = Math.round(Math.max(0, speed - Math.log(guesses.length + 1) * 30));
    speed = 250 - (30 * guesses.length);
    console.log(`guesses: ${guesses.length}`);
    console.log(`speed: ${speed}`);
    animateCard(rateOfChange, speed);
});


/******/ })()
;