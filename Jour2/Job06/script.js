const konamiCode = [
    "ArrowUp","ArrowUp",
    "ArrowDown","ArrowDown",
    "ArrowLeft","ArrowRight",
    "ArrowLeft","ArrowRight",
    "b","a"
];

let position = 0;

window.addEventListener("keydown", (e) => {
    if (e.key === konamiCode[position] || e.key.toLowerCase() === konamiCode[position]) {
        position++;
    } else {
        position = 0;
    }

    if (position === konamiCode.length) {
        activatePlateforme();
        position = 0;
    }
});

function activatePlateforme() {
    document.body.classList.add("activated");
    initScrollFooter();
}

function initScrollFooter() {
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? scrollTop / docHeight : 0;

        const r = Math.floor(255 * (1 - percent));
        const g = Math.floor(255 * (1 - percent));

        document.getElementById("footer").style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    });
}
