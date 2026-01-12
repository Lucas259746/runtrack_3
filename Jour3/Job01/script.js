const showBtn = document.getElementById("showBtn");
const hideBtn = document.getElementById("hideBtn");
const text = document.getElementById("text");

showBtn.addEventListener("click", () => {
    text.style.display = "block";
});

hideBtn.addEventListener("click", () => {
    text.style.display = "none";
});
