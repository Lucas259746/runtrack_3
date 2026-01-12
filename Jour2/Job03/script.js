let compteur = 0;

function addone() {
    compteur++;
    document.getElementById("compteur").textContent = compteur;
}

const button = document.getElementById("button");

        button.addEventListener("click", addone);



