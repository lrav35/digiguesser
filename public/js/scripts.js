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
const randNum = Math.floor(Math.random() * 100);
const guesses = [];
const $result = $("<p>>").attr("id", "result");
const $guesses = $("<p>").attr("id", "guesses");
const validateInput = (input, guesses) => {
    console.log(`parsedInput: ${input}`);
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
const updateResult = (randNum, parsedInput) => {
    if (parsedInput === randNum) {
        return `You guessed the number!`;
    }
    else if (parsedInput > randNum) {
        return `The number is lower than ${parsedInput}`;
    }
    else {
        return `The number is higher than ${parsedInput}`;
    }
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
        guesses.push(parsedInput);
        $('#output').append($guesses, $result);
        $("#result").text(updateResult(randNum, parsedInput));
        $("#guesses").text(updateGuesses(guesses));
        if (parsedInput === randNum) {
            $("#form :input").prop("disabled", true);
        }
    }
});


/******/ })()
;