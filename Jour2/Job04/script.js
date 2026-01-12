document.addEventListener("keydown", function (event) {

    const textarea = document.getElementById("keylogger");

    if (event.key.length === 1 && event.key.match(/[a-z]/i)) {

        let letter = event.key;


        if (document.activeElement === textarea) {
            textarea.value += letter + letter;
        } 

        else {
            textarea.value += letter;
        }
    }
});
