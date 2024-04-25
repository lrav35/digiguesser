import { event } from "jquery";

declare global {
    interface Window {
        $: any;
        jQuery: any;
    }
}


$("#form").on("submit", function(event) {
    event.preventDefault();
    const inputName = $("#name").val();

    $("#display-text").hide();

    $("#display-text").text(`Hello, ${inputName}! from a jQuery function ;)`)
    
    $("#display-text").fadeIn("slow");
});

export {};