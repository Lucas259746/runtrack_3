window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

    const r = Math.floor(255 * (1 - scrollPercent));
    const g = Math.floor(255 * scrollPercent);
    const b = 0;

    document.getElementById("footer").style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
});
