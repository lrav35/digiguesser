import { event } from "jquery";

declare global {
    interface Window {
        $: any;
        jQuery: any;
    }
}

const randNum = Math.floor(Math.random() * 100);
const guesses: number[] = [];


const validateInput = (input: string): number => {
    const parsedInput = Number(input);
    console.log(`parsedInput: ${typeof parsedInput}`);
    if (!Number.isInteger(parsedInput)) {
        alert("that is not a discrete number in the range. TRY AGAIN!")
        $("#name").val("");
    } else { guesses.push(parsedInput); }
    return parsedInput;
}


$("#form").on("submit", function(event) {
    console.log(`randNum: ${randNum}`);
    event.preventDefault();
    const input = $("#name").val() as string;
    $("#name").text("");
    const parsedInput = validateInput(input);

    if (parsedInput === randNum) {
        $("#result").text(`You guessed the number!`);
    } else if (parsedInput > randNum) {
        $("#result").text(`The number is lower than ${parsedInput}`);
    } else {
        $("#result").text(`The number is higher than ${parsedInput}`);
    }
    if (guesses.length > 0) {
        $("#guesses").text(`Your guesses: [${guesses.join(", ")}]`);
    }
});

export {};