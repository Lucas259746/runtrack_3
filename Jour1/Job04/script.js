// Fonction qui détermine si une année est bissextile
function bisextile(annee) {
    // Une année est bissextile si :
    // - elle est divisible par 4 ET non divisible par 100
    // - ou elle est divisible par 400
    if ((annee % 4 === 0 && annee % 100 !== 0) || (annee % 400 === 0)) {
        return true;
    } else {
        return false;
    }
}

// === Tests dans la console ===
console.log("2024 →", bisextile(2024)); // true (bissextile)
console.log("1900 →", bisextile(1900)); // false (non bissextile)
console.log("2000 →", bisextile(2000)); // true (bissextile)
console.log("2023 →", bisextile(2023)); // false (non bissextile)
