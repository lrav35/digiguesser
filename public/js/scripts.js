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
const validateInput = (input) => {
    const parsedInput = Number(input);
    console.log(`parsedInput: ${typeof parsedInput}`);
    if (!Number.isInteger(parsedInput)) {
        alert("that is not a discrete number in the range. TRY AGAIN!");
        $("#name").val("");
    }
    else {
        guesses.push(parsedInput);
    }
    return parsedInput;
};
$("#form").on("submit", function (event) {
    console.log(`randNum: ${randNum}`);
    event.preventDefault();
    const input = $("#name").val();
    $("#name").text("");
    const parsedInput = validateInput(input);
    if (parsedInput === randNum) {
        $("#result").text(`You guessed the number!`);
    }
    else if (parsedInput > randNum) {
        $("#result").text(`The number is lower than ${parsedInput}`);
    }
    else {
        $("#result").text(`The number is higher than ${parsedInput}`);
    }
    if (guesses.length > 0) {
        $("#guesses").text(`Your guesses: [${guesses.join(", ")}]`);
    }
});


/******/ })()
;