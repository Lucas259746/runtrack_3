const container = document.getElementById("container");
const shuffleBtn = document.getElementById("shuffleBtn");
const message = document.getElementById("message");

let dragged = null;

container.addEventListener("dragstart", e => {
    if (e.target.tagName === "IMG") {
        dragged = e.target;
    }
});

container.addEventListener("dragover", e => {
    e.preventDefault();
});

container.addEventListener("drop", e => {
    if (e.target.tagName === "IMG" && dragged) {
        container.insertBefore(dragged, e.target);
        checkOrder();
    }
});

shuffleBtn.addEventListener("click", () => {
    const images = Array.from(container.children);
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
    }
    images.forEach(img => container.appendChild(img));
    message.textContent = "";
});

function checkOrder() {
    const images = container.querySelectorAll("img");
    let correct = true;

    images.forEach((img, index) => {
        if (parseInt(img.dataset.order) !== index + 1) {
            correct = false;
        }
    });

    if (correct) {
        message.textContent = "Vous avez gagné";
        message.style.color = "green";
    } else {
        message.textContent = "Vous avez perdu";
        message.style.color = "red";
    }
}
