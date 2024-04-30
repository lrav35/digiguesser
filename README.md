<!-- ABOUT THE PROJECT -->
## DigiGuesser

Here is a trivial game I created in an effort to re-familiarize myself with HTML/CSS and Node. I wanted to stick to vanilla TS and jQuery because who needs frameworks, right? The goal of the game is to guess the random number between 1 and 100, but after guessing once, the card will begin to move around the screen. With each subsequent guess, the card will move exponentially faster by reducing the refresh rate to zero with an exponential decay function. The key is to use binary search for your guessing strategy, or else you will likely use too many guesses and the game will become nearly impossible. But hey, maybe you'll get lucky.

<video src="https://github.com/lrav35/website/assets/49992169/185c6cb0-07c2-4e98-a05a-42e8b5aebda8
" controls="controls" style="max-width: 700px;">
</video>

<!-- GETTING STARTED -->
## Getting Started

This project was built with node v21.6.1 and run locally using chrome.

### Usage

1. Clone the repository 
2. install the few dependencies
    ```
    npm i
    ```
3. run the server or dev server
    ```
    npm run start
    ```
    or 
    ```
    npm run dev
    ```

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.