texte1 = "La vie a beaucoup plus d’imagination que nous.";
texte2 = "L'important n'est pas la chute, mais l'atterrissage.";
const bouton = document.getElementById("monBouton");

function showHideText() {
    const texte = document.getElementById("monTexte");
    if (texte.textContent === texte1) {
        texte.textContent = texte2;
    } else {
        texte.textContent = texte1;
    }

}

bouton.addEventListener("click", showHideText);
