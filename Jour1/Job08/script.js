// Fonction pour vérifier si un nombre est premier
function estPremier(n) {
    if (n <= 1) return false; // 0, 1 et les nombres négatifs ne sont pas premiers
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

// Fonction qui retourne la somme si les deux nombres sont premiers
function sommenombrespremiers(a, b) {
    if (estPremier(a) && estPremier(b)) {
        return a + b;
    } else {
        return false;
    }
}

// === Tests ===
console.log(sommenombrespremiers(3, 5));   
console.log(sommenombrespremiers(2, 11));  
console.log(sommenombrespremiers(4, 7));   
console.log(sommenombrespremiers(9, 9));   



