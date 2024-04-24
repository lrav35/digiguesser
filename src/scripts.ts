declare global {
    interface Window {
        $: any;
        jQuery: any;
    }
}

$(() => {
    $("#display-name").html("Hello, world! from jQuery!");
});

console.log("Hello, world!");

export {};