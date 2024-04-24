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

    $("#display-name").text(`Hello, ${inputName}! from a jQuery function ;)`);
});

export {};