// import { speed } from "jquery";

import e from "express";

declare global {
    interface Window {
        $: any;
        jQuery: any;
    }
}

interface pixels {
    x: number;
    y: number;
}

const randNum = Math.floor(Math.random() * 100);
const guesses: Number[] = [];
const $result = $("<p>>").attr("id", "result");
const $guessList = $("<p>").attr("id", "guesses");
const $score = $("<p>").attr("id", "score");
let gameON: boolean = false;
let speed: number = 250;

// initial card position
const card: JQuery<HTMLElement> = $(".card");
const initialTop = card.position().top;
const initialLeft = card.position().left;

const validateInput = (input: number, guesses: Number[]): boolean => {
    if (!Number.isInteger(input) || (input < 1 || input > 100)) {
        alert("that is not a discrete number in the range. TRY AGAIN!")
        $(".input").val("");
        return false;
    } else if (guesses.includes(input)) {
        alert("You've already guessed that number. TRY AGAIN!")
        $(".input").val("");
        return false;
    }
    else {
        return true;
    }
}

const updateGuesses = (input: Number[]): string => {
    const maxLength = 4;
    if (input.length <= maxLength) {
        return `Your guesses: [${input.join(", ")}]`;
    } else {
        const truncatedGuesses = input.slice(0, maxLength);
        return `Your guesses: [${truncatedGuesses.join(", ")}...${input[input.length - 1]}]`;
    }
}

const updateResult = (winner: boolean, randNum: Number, parsedInput: Number): string => {
    if (winner) {
        return 'Congratulations! You guessed the number.';
    } else if (parsedInput > randNum) {
        return `The number is lower than ${parsedInput}`;
    } else {
        return `The number is higher than ${parsedInput}`;
    }
}

const updateScore = (winner: boolean, guesses: Number[]): string => {
    if (winner) {
        return `Score: ${guesses.length} guesses.`;
    }
    return `Number of guesses: ${guesses.length}`;
}

const coordChange = (dx: number, dy: number) => {
    const card: JQuery<HTMLElement> = $(".card");
    const cardHeight: number = card.height() as number;
    const cardWidth: number = card.width() as number;
    const windowWidth: number = $(window).width() as number;
    const windowHeight: number = $(window).height() as number
    const left: number = card.position().left;
    const top: number = card.position().top;

    const new_dx = left < 0 || left + cardWidth > windowWidth ? -dx : dx;
    const new_dy = top < 0 || top + cardHeight > windowHeight ? -dy : dy;

    const new_left = left + new_dx;
    const new_top = top + new_dy;

    return { new_left, new_top, new_dx, new_dy }
};

const animateCard = (rateOfChange: pixels, refreshRate: number) => {
    const card: JQuery<HTMLElement> = $(".card");

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

$("#form").on("submit", function(event) {
    console.log(`randNum: ${randNum}`);
    event.preventDefault();
    const input = $(".input").val() as string;
    $(".input").val("");
    Array.from(document.querySelectorAll("#form input")).forEach(input => (input as HTMLElement).blur());    
    const parsedInput = Number(input)

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
    const rateOfChange: pixels = { x: 1, y: 1 };
    // refresh rate decreases exponentially with the number of guesses. reaches ~ 0 at 10 guesses.
    speed = 150 * Math.E ** (-0.75 * guesses.length);
    console.log(`guesses: ${guesses.length}`);
    console.log(`speed: ${speed}`);
    animateCard(rateOfChange, speed);
});

export {};